const { useState, useEffect, useCallback, useMemo } = React;

function fmtAddr(a) {
  if (!a || a.length < 10) return a || "—";
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

function formatOam(amountWei, decimals, sym) {
  if (amountWei == null) return "—";
  const d = Number(decimals) || 18;
  const s = window.ethers?.formatUnits(amountWei, d) || "0";
  const n = Number(s);
  const body = n >= 1e9 ? n.toExponential(2) : n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  return `${body} ${sym || "OAM"}`;
}

function StakingDapp() {
  const w3 = useWeb3();
  const {
    signer,
    address,
    chainId,
    error: w3Error,
    setError,
    connect,
    switchToMainnet,
    readProvider,
    addrs,
  } = w3;

  const [decimals, setDecimals] = useState(18);
  const [symbol, setSymbol] = useState("OAM");
  const [tiers, setTiers] = useState([]);
  const [tierPick, setTierPick] = useState(0);
  const [amountHuman, setAmountHuman] = useState("");
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [positions, setPositions] = useState([]);
  const [reserve, setReserve] = useState(null);
  const [locked, setLocked] = useState(null);
  const [bal, setBal] = useState(null);
  const [owner, setOwner] = useState("");
  const [buyBps, setBuyBps] = useState(null);
  const [sellBps, setSellBps] = useState(null);
  const [taxBuyIn, setTaxBuyIn] = useState("");
  const [taxSellIn, setTaxSellIn] = useState("");

  useEffect(() => {
    if (buyBps != null && sellBps != null) {
      setTaxBuyIn(String(buyBps));
      setTaxSellIn(String(sellBps));
    }
  }, [buyBps, sellBps]);

  const ZERO = "0x0000000000000000000000000000000000000000";
  const tokenAddr = (addrs.token || "").trim();
  const stakingAddr = (addrs.staking || "").trim();
  const validAddrs =
    tokenAddr.startsWith("0x") &&
    tokenAddr.length === 42 &&
    stakingAddr.startsWith("0x") &&
    stakingAddr.length === 42 &&
    tokenAddr.toLowerCase() !== ZERO &&
    stakingAddr.toLowerCase() !== ZERO;

  const readToken = useMemo(() => {
    if (!readProvider || !validAddrs || !window.ethers) return null;
    return new window.ethers.Contract(tokenAddr, [...window.ERC20_ABI, ...window.OAM_EXTRA_ABI], readProvider);
  }, [readProvider, tokenAddr, stakingAddr, validAddrs]);

  const readStaking = useMemo(() => {
    if (!readProvider || !validAddrs || !window.ethers) return null;
    return new window.ethers.Contract(stakingAddr, window.STAKING_ABI, readProvider);
  }, [readProvider, stakingAddr, validAddrs]);

  const loadPublic = useCallback(async () => {
    if (!readToken || !readStaking) {
      setTiers([]);
      setReserve(null);
      setLocked(null);
      return;
    }
    try {
      const [dec, sym, tc, rr, tl, own, bb, sb] = await Promise.all([
        readToken.decimals(),
        readToken.symbol(),
        readStaking.tiersCount(),
        readStaking.rewardReserve(),
        readStaking.totalLocked(),
        readToken.owner(),
        readToken.buyTaxBps(),
        readToken.sellTaxBps(),
      ]);
      setDecimals(Number(dec));
      setSymbol(sym);
      setReserve(rr);
      setLocked(tl);
      setOwner(String(own).toLowerCase());
      setBuyBps(bb);
      setSellBps(sb);
      const n = Number(tc);
      const arr = [];
      for (let i = 0; i < n; i++) {
        const t = await readStaking.tiers(i);
        arr.push({
          durationSeconds: Number(t.durationSeconds),
          aprBps: Number(t.aprBps),
          active: t.active,
        });
      }
      setTiers(arr);
      setMsg("");
    } catch (e) {
      setMsg(e.shortMessage || e.message || String(e));
    }
  }, [readToken, readStaking]);

  useEffect(() => {
    loadPublic();
    const id = setInterval(loadPublic, 15000);
    return () => clearInterval(id);
  }, [loadPublic]);

  const loadUser = useCallback(async () => {
    if (!readToken || !readStaking || !address) {
      setBal(null);
      setPositions([]);
      return;
    }
    try {
      const b = await readToken.balanceOf(address);
      setBal(b);
      const pos = await readStaking.positionsOf(address);
      setPositions(pos.map((p, i) => ({ ...p, id: i })));
    } catch (e) {
      setMsg(e.shortMessage || e.message || String(e));
    }
  }, [readToken, readStaking, address]);

  useEffect(() => {
    loadUser();
  }, [loadUser, chainId]);

  const needsMainnet = chainId != null && chainId !== window.OAM_CHAIN_ID;
  const etherscan = (a) => `https://etherscan.io/address/${a}`;

  const runTx = async (label, fn) => {
    setBusy(label);
    setMsg("");
    setError("");
    try {
      const tx = await fn();
      setMsg(`Submitted: ${tx.hash}`);
      await tx.wait();
      setMsg(`Confirmed: ${tx.hash}`);
      await loadPublic();
      await loadUser();
    } catch (e) {
      setMsg(e.shortMessage || e.reason || e.message || String(e));
    } finally {
      setBusy("");
    }
  };

  const onApprove = () => {
    if (!signer || !validAddrs) return;
    const token = new window.ethers.Contract(tokenAddr, window.ERC20_ABI, signer);
    const amt = window.ethers.MaxUint256;
    runTx("approve", () => token.approve(stakingAddr, amt));
  };

  const onStake = () => {
    if (!signer || !validAddrs) return;
    const human = (amountHuman || "").replace(/,/g, "").trim();
    if (!human) return setMsg("Enter an amount.");
    const wei = window.ethers.parseUnits(human, decimals);
    const staking = new window.ethers.Contract(stakingAddr, window.STAKING_ABI, signer);
    runTx("stake", () => staking.stake(tierPick, wei));
  };

  const onExit = (posId) => {
    if (!signer || !validAddrs) return;
    const staking = new window.ethers.Contract(stakingAddr, window.STAKING_ABI, signer);
    runTx("exit", () => staking.exit(posId));
  };

  const onFund = () => {
    if (!signer || !validAddrs) return;
    const human = (amountHuman || "").replace(/,/g, "").trim();
    if (!human) return setMsg("Enter an amount to fund rewards.");
    const wei = window.ethers.parseUnits(human, decimals);
    const token = new window.ethers.Contract(tokenAddr, window.ERC20_ABI, signer);
    const staking = new window.ethers.Contract(stakingAddr, window.STAKING_ABI, signer);
    runTx("fund", async () => {
      const cur = await token.allowance(address, stakingAddr);
      if (cur < wei) {
        const ap = await token.approve(stakingAddr, window.ethers.MaxUint256);
        await ap.wait();
      }
      return staking.fundRewards(wei);
    });
  };

  const onSetTax = () => {
    if (!signer || !validAddrs) return;
    const b = BigInt(taxBuyIn || "0");
    const s = BigInt(taxSellIn || "0");
    const token = new window.ethers.Contract(tokenAddr, [...window.ERC20_ABI, ...window.OAM_EXTRA_ABI], signer);
    runTx("setTax", () => token.setBuySellTaxRates(b, s));
  };

  const isOwner =
    address && owner && address.toLowerCase() === owner.toLowerCase();

  return (
    <section id="staking" style={{ padding: "120px 0", position: "relative" }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="font-mono" style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.15em", marginBottom: 16 }}>
            ∇ OAM DAPP · MAINNET
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(36px, 4.5vw, 52px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 16,
              maxWidth: 800,
            }}
          >
            Stake <span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 400 }}>$ALIENDOGE</span> on-chain
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--ink-1)", lineHeight: 1.55, maxWidth: 720 }}>
            Alien Doge (<strong>ALIENDOGE</strong>) is an ERC-20 on Ethereum with transparent buy and sell fees on the Uniswap V2 pair, A regular Doge, with a bright green hue just like 1337 Doge, except it has the Antennae hat.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
            gap: 28,
            alignItems: "start",
          }}
          className="oam-dapp-grid"
        >
          <style>{`
            @media (max-width: 1024px) {
              .oam-dapp-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                padding: 22,
                background: "rgba(10, 11, 20, 0.85)",
                border: "1px solid var(--line-strong)",
                borderRadius: 16,
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-2)", letterSpacing: "0.12em", marginBottom: 10 }}>
                DEPLOYED CONTRACTS
              </div>
              <p style={{ fontSize: 12, color: "var(--ink-2)", marginBottom: 14, lineHeight: 1.5 }}>
                Addresses are set in <span className="font-mono">frontend/config.js</span> (<code>OAM_TOKEN_ADDRESS</code>,{" "}
                <code>OAM_STAKING_ADDRESS</code>).
              </p>
              <div style={{ fontSize: 12, color: "var(--ink-1)", marginBottom: 8 }}>
                <span className="text-dimmer" style={{ display: "block", marginBottom: 4 }}>
                  OlimpusAsteroidToken
                </span>
                <span className="font-mono" style={{ wordBreak: "break-all" }}>{tokenAddr || "—"}</span>
                {validAddrs && (
                  <a
                    href={etherscan(tokenAddr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", marginTop: 6, color: "var(--gold)", fontSize: 12 }}
                  >
                    Etherscan →
                  </a>
                )}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-1)", marginTop: 14 }}>
                <span className="text-dimmer" style={{ display: "block", marginBottom: 4 }}>
                  OamStakingLocked
                </span>
                <span className="font-mono" style={{ wordBreak: "break-all" }}>{stakingAddr || "—"}</span>
                {validAddrs && (
                  <a
                    href={etherscan(stakingAddr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", marginTop: 6, color: "var(--gold)", fontSize: 12 }}
                  >
                    Etherscan →
                  </a>
                )}
              </div>
            </div>

            <div
              style={{
                padding: 22,
                background: "rgba(18, 19, 31, 0.6)",
                border: "1px solid var(--line)",
                borderRadius: 16,
              }}
            >
              <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-2)", letterSpacing: "0.12em", marginBottom: 12 }}>
                ON-CHAIN TELEMETRY
              </div>
              <div style={{ display: "grid", gap: 10, fontSize: 13, color: "var(--ink-1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-dimmer">Reward reserve</span>
                  <span className="font-mono">{reserve != null ? formatOam(reserve, decimals, symbol) : "—"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-dimmer">Total locked</span>
                  <span className="font-mono">{locked != null ? formatOam(locked, decimals, symbol) : "—"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-dimmer">Buy / sell tax (bps)</span>
                  <span className="font-mono">
                    {buyBps != null && sellBps != null ? `${buyBps} / ${sellBps}` : "—"}
                  </span>
                </div>
              </div>
            </div>

            {isOwner && (
              <div
                style={{
                  padding: 22,
                  background: "linear-gradient(180deg, rgba(255,190,110,0.08) 0%, rgba(10,11,20,0.9) 100%)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: 16,
                }}
              >
                <div className="font-mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.12em", marginBottom: 10 }}>
                  OWNER · TAX RATES
                </div>
                <p style={{ fontSize: 12, color: "var(--ink-2)", marginBottom: 12, lineHeight: 1.5 }}>
                  10_000 = 100%. Contract caps each side at 25% (2500 bps).
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  <input
                    value={taxBuyIn}
                    onChange={(e) => setTaxBuyIn(e.target.value)}
                    placeholder="Buy bps"
                    style={inputMono}
                  />
                  <input
                    value={taxSellIn}
                    onChange={(e) => setTaxSellIn(e.target.value)}
                    placeholder="Sell bps"
                    style={inputMono}
                  />
                </div>
                <button type="button" onClick={onSetTax} disabled={!!busy || !signer} style={btnSecondary}>
                  {busy === "setTax" ? "…" : "setBuySellTaxRates"}
                </button>
              </div>
            )}
          </div>

          <div
            style={{
              background: "rgba(10, 11, 20, 0.9)",
              border: "1px solid var(--line-strong)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(255,190,110,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: "1px solid var(--line)",
                background: "rgba(5,6,10,0.6)",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6B6B" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFCB5E" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#5EFF8C" }} />
              </div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "var(--ink-2)" }}>
                Olympus Asteroid · $ALIENDOGE
              </div>
              {!address ? (
                <button type="button" onClick={connect} style={btnPrimary}>
                  Connect wallet
                </button>
              ) : needsMainnet ? (
                <button type="button" onClick={switchToMainnet} style={btnPrimary}>
                  Switch to Ethereum
                </button>
              ) : (
                <span className="font-mono" style={{ fontSize: 12, color: "var(--gold)" }}>
                  {fmtAddr(address)}
                </span>
              )}
            </div>

            <div style={{ padding: 24 }}>
              {(w3Error || msg) && (
                <div
                  style={{
                    marginBottom: 14,
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: "rgba(255,107,107,0.08)",
                    border: "1px solid rgba(255,107,107,0.25)",
                    fontSize: 13,
                    color: "var(--ink-1)",
                  }}
                >
                  {w3Error || msg}
                </div>
              )}

              {!validAddrs && (
                <p style={{ color: "var(--ink-2)", fontSize: 14, marginBottom: 16 }}>
                  Set non-zero <strong>OAM_TOKEN_ADDRESS</strong> and <strong>OAM_STAKING_ADDRESS</strong> in{" "}
                  <span className="font-mono">config.js</span> after deployment, then reload this page.
                </p>
              )}

              <div style={{ marginBottom: 18 }}>
                <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-2)", letterSpacing: "0.12em", marginBottom: 8 }}>
                  LOCK TIERS (APR · DURATION)
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {tiers.length === 0 && <span style={{ color: "var(--ink-2)", fontSize: 13 }}>No tiers loaded yet.</span>}
                  {tiers.map((t, i) => {
                    const days = Math.round(t.durationSeconds / 86400);
                    const apr = (t.aprBps / 100).toFixed(0);
                    const sel = tierPick === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTierPick(i)}
                        disabled={!t.active}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: sel ? "1px solid var(--gold)" : "1px solid var(--line)",
                          background: sel ? "rgba(255,190,110,0.12)" : "rgba(5,6,10,0.5)",
                          color: t.active ? "var(--ink-0)" : "var(--ink-3)",
                          cursor: t.active ? "pointer" : "not-allowed",
                          fontSize: 12,
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        Tier {i}: {apr}% · {days}d {t.active ? "" : "(off)"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-2)", letterSpacing: "0.12em", marginBottom: 6 }}>
                    AMOUNT ({symbol})
                  </div>
                  <input
                    value={amountHuman}
                    onChange={(e) => setAmountHuman(e.target.value)}
                    placeholder="0.0"
                    style={{ ...inputMono, width: "100%", fontSize: 18 }}
                  />
                  <div style={{ fontSize: 11, color: "var(--ink-2)", marginTop: 6 }}>
                    Wallet: {bal != null ? formatOam(bal, decimals, symbol) : address ? "…" : "—"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                <button type="button" disabled={!!busy || !signer || needsMainnet || !validAddrs} onClick={onApprove} style={btnGhost}>
                  {busy === "approve" ? "…" : "Approve staking"}
                </button>
                <button type="button" disabled={!!busy || !signer || needsMainnet || !validAddrs} onClick={onStake} style={btnPrimary}>
                  {busy === "stake" ? "…" : "Stake OAM"}
                </button>
                <button type="button" disabled={!!busy || !signer || needsMainnet || !validAddrs} onClick={onFund} style={btnGhost}>
                  {busy === "fund" ? "…" : "Fund reward pool"}
                </button>
              </div>

              <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-2)", letterSpacing: "0.12em", marginBottom: 10 }}>
                YOUR POSITIONS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 320, overflowY: "auto" }}>
                {positions.length === 0 && (
                  <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{address ? "No positions yet." : "Connect to load positions."}</div>
                )}
                {positions.map((p) => {
                  const now = Math.floor(Date.now() / 1000);
                  const unlock = Number(p.unlockAt);
                  const open = !p.closed && Number(p.amount) > 0;
                  const canExit = open && now >= unlock;
                  const principal = p.amount;
                  return (
                    <div
                      key={p.id}
                      style={{
                        padding: 14,
                        borderRadius: 12,
                        border: "1px solid var(--line)",
                        background: "rgba(5,6,10,0.45)",
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-1)" }}>
                          #{p.id} · tier {String(p.tier)} ·{" "}
                          {open ? (canExit ? "unlocked" : "locked") : "closed"}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--ink-0)", marginTop: 4 }}>
                          {formatOam(principal, decimals, symbol)}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--ink-2)", marginTop: 4 }}>
                          Unlock: {new Date(unlock * 1000).toLocaleString()}
                        </div>
                      </div>
                      {canExit && (
                        <button type="button" disabled={!!busy} onClick={() => onExit(p.id)} style={btnPrimarySm}>
                          {busy === "exit" ? "…" : "Exit"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputMono = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--line)",
  background: "rgba(5,6,10,0.6)",
  color: "var(--ink-0)",
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 13,
};

const btnPrimary = {
  background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-deep) 100%)",
  color: "#0A0B14",
  border: "none",
  padding: "10px 18px",
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const btnPrimarySm = { ...btnPrimary, padding: "8px 14px", fontSize: 12 };

const btnGhost = {
  background: "transparent",
  color: "var(--gold)",
  border: "1px solid var(--line-strong)",
  padding: "10px 16px",
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

const btnSecondary = {
  ...btnGhost,
  width: "100%",
};

function DashboardPreview() {
  return <StakingDapp />;
}

Object.assign(window, { DashboardPreview, StakingDapp });
