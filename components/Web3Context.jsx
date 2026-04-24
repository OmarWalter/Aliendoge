const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useContext,
} = React;

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

const OAM_EXTRA_ABI = [
  "function buyTaxBps() view returns (uint256)",
  "function sellTaxBps() view returns (uint256)",
  "function owner() view returns (address)",
  "function setBuySellTaxRates(uint256 newBuyBps, uint256 newSellBps)",
];

const STAKING_ABI = [
  "function token() view returns (address)",
  "function tiers(uint256) view returns (uint32 durationSeconds, uint32 aprBps, bool active)",
  "function tiersCount() view returns (uint256)",
  "function stake(uint8 tierIndex, uint256 amount)",
  "function exit(uint256 posId)",
  "function positionsOf(address user) view returns (tuple(uint128 amount, uint64 stakedAt, uint64 unlockAt, uint32 aprBps, uint8 tier, bool closed)[])",
  "function pendingReward(address user, uint256 posId) view returns (uint256)",
  "function rewardReserve() view returns (uint256)",
  "function totalLocked() view returns (uint256)",
  "function fundRewards(uint256 amount)",
];

const MAINNET_RPC =
  typeof window !== "undefined" && window.OAM_PUBLIC_RPC
    ? window.OAM_PUBLIC_RPC
    : "https://ethereum.publicnode.com";

const Web3Context = createContext(null);

function useWeb3Internal() {
  const ctx = useContext(Web3Context);
  if (!ctx) {
    throw new Error("useWeb3 must be used inside <Web3Provider>");
  }
  return ctx;
}

function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState("");
  const addrs = useMemo(
    () => (typeof window !== "undefined" ? window.getOamAddresses() : { token: "", staking: "" }),
    []
  );

  const readProvider = useMemo(() => {
    if (typeof window === "undefined" || !window.ethers) return null;
    return new window.ethers.JsonRpcProvider(MAINNET_RPC);
  }, []);

  const connect = useCallback(async () => {
    setError("");
    if (!window.ethereum) {
      setError("Install a wallet (e.g. MetaMask) to use the dapp.");
      return;
    }
    if (!window.ethers) {
      setError("Ethers library failed to load.");
      return;
    }
    try {
      const br = new window.ethers.BrowserProvider(window.ethereum);
      const net = await br.getNetwork();
      setChainId(Number(net.chainId));
      const accs = await br.send("eth_requestAccounts", []);
      const addr = accs[0] || "";
      const sig = await br.getSigner();
      setProvider(br);
      setSigner(sig);
      setAddress(addr);
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
    }
  }, []);

  const disconnect = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAddress("");
    setChainId(null);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    const onAccounts = (accs) => {
      if (!accs || !accs.length) disconnect();
      else setAddress(accs[0]);
    };
    const onChain = () => {
      window.location.reload();
    };
    window.ethereum.on?.("accountsChanged", onAccounts);
    window.ethereum.on?.("chainChanged", onChain);
    return () => {
      window.ethereum.removeListener?.("accountsChanged", onAccounts);
      window.ethereum.removeListener?.("chainChanged", onChain);
    };
  }, [disconnect]);

  const switchToMainnet = useCallback(async () => {
    if (!window.ethereum) return;
    const hex = "0x" + Number(1).toString(16);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hex }],
      });
    } catch (e) {
      if (e && e.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: hex,
              chainName: "Ethereum Mainnet",
              nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
              rpcUrls: [MAINNET_RPC],
            },
          ],
        });
      } else setError(e && e.message ? e.message : String(e));
    }
  }, []);

  const value = useMemo(
    () => ({
      provider,
      signer,
      address,
      chainId,
      error,
      setError,
      connect,
      disconnect,
      switchToMainnet,
      readProvider,
      addrs,
      MAINNET_RPC,
    }),
    [provider, signer, address, chainId, error, connect, disconnect, switchToMainnet, readProvider, addrs]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

Object.assign(window, {
  Web3Provider,
  useWeb3: useWeb3Internal,
  ERC20_ABI,
  OAM_EXTRA_ABI,
  STAKING_ABI,
});
