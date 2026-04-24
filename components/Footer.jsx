function CTAFooter() {
  const tw =
    typeof window !== "undefined" && window.OAM_SOCIAL && window.OAM_SOCIAL.twitter
      ? window.OAM_SOCIAL.twitter
      : "#";
  const tg =
    typeof window !== "undefined" && window.OAM_SOCIAL && window.OAM_SOCIAL.telegram
      ? window.OAM_SOCIAL.telegram
      : "#";

  const linkStyle = {
    color: "var(--gold)",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "JetBrains Mono, monospace",
    letterSpacing: "0.06em",
    border: "1px solid var(--line-strong)",
    padding: "10px 20px",
    borderRadius: 10,
    transition: "background 0.2s, border-color 0.2s",
  };

  return (
    <>
      <section style={{ padding: "140px 0 80px", position: "relative" }}>
        <div className="container">
          <div
            style={{
              textAlign: "center",
              position: "relative",
              padding: "80px 40px",
              border: "1px solid var(--line-strong)",
              borderRadius: 32,
              background: "radial-gradient(ellipse at center, rgba(255, 190, 110, 0.08) 0%, transparent 60%)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 900,
                height: 900,
                border: "1px dashed rgba(255, 190, 110, 0.08)",
                borderRadius: "50%",
                animation: "orbit 80s linear infinite",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 600,
                border: "1px solid rgba(255, 190, 110, 0.06)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                className="font-mono"
                style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.18em", marginBottom: 20 }}
              >
                ∇ READY FOR LAUNCH
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  gap: 40,
                  marginBottom: 28,
                }}
                className="oam-cta-grid"
              >
                <style>{`
                  @media (max-width: 900px) {
                    .oam-cta-grid { grid-template-columns: 1fr !important; text-align: center !important; }
                    .oam-cta-grid > div { text-align: center !important; }
                  }
                `}</style>
                <div style={{ textAlign: "right" }}>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "clamp(40px, 5.5vw, 76px)",
                      fontWeight: 500,
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      textWrap: "balance",
                    }}
                  >
                    Alien
                    <br />
                    Doge
                  </h2>
                </div>

                <div
                  style={{
                    position: "relative",
                    width: 260,
                    height: 260,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle, rgba(255, 190, 110, 0.35) 0%, transparent 65%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: 240,
                      height: 240,
                      border: "1px dashed rgba(255, 190, 110, 0.25)",
                      borderRadius: "50%",
                      animation: "orbit 30s linear infinite",
                    }}
                  />
                  <img
                    src="assets/dog-wave.png"
                    alt="Olympus Asteroid"
                    style={{
                      position: "relative",
                      width: 260,
                      animation: "float 5s ease-in-out infinite",
                      filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
                    }}
                  />
                </div>

                <div style={{ textAlign: "left" }}>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "clamp(40px, 5.5vw, 76px)",
                      fontWeight: 500,
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      textWrap: "balance",
                    }}
                  >
                    <span
                      style={{
                        background: "linear-gradient(120deg, #FFE4A8 0%, var(--gold) 40%, #FF8C42 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontStyle: "italic",
                        fontWeight: 400,
                      }}
                    >
                      Are you
                      <br />
                      ready?
                    </span>
                  </h2>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => window.location.href = 'https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0xComingSoon'}
                  style={{
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-deep) 100%)',
                    color: '#0A0B14',
                    border: 'none',
                    padding: '11px 20px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.02em',
                    boxShadow: '0 0 20px rgba(255, 190, 110, 0.25)',
                  }}
                >
                  Buy Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "48px 0 32px",
          background: "rgba(5, 6, 10, 0.85)",
          backdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
              marginBottom: 32,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
              <img
                src="assets/favicon.png"
                alt="Olympus Asteroid"
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  flexShrink: 0,
                  objectFit: "cover",
                  border: "1px solid var(--line-strong)",
                  boxShadow: "0 0 16px rgba(255, 190, 110, 0.2)",
                }}
              />
              <div>
                <div className="font-display" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.02em" }}>
                  ALIEN<span className="text-gold"> DOGE</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, marginTop: 6, maxWidth: 420 }}>
                  $ALIENDOGE · Ethereum
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a href={tw} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Twitter / X
              </a>
              <a href={tg} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Telegram
              </a>
            </div>
          </div>

          <div
            style={{
              paddingTop: 24,
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em" }}>
              © 2026 ALIENDOGE · NOT FINANCIAL ADVICE
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: "var(--success)", letterSpacing: "0.1em" }}>
              ● MAINNET
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

Object.assign(window, { CTAFooter });
