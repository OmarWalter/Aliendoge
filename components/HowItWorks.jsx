function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Create a wallet',
      body: 'Download MetaMask or another Ethereum wallet of your choice from the App Store or Google Play Store for free. Desktop users can also install the MetaMask Chrome extension.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="4" fill="currentColor" />
          <path d="M20 4 L20 10 M20 30 L20 36 M4 20 L10 20 M30 20 L36 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      n: '02',
      title: 'Get some $ETH',
      body: 'Have ETH in your wallet to swap into $SOCK. If you don’t already have ETH, you can buy it from an exchange and transfer it to your wallet.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 6 L24 16 L34 18 L26 24 L28 34 L20 28 L12 34 L14 24 L6 18 L16 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      n: '03',
      title: 'Go to Uniswap',
      body: 'Go to Uniswap (via the web app or mobile browser) and connect your wallet. Make sure your ETH is visible in the wallet.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M10 20 A10 10 0 0 1 30 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M30 20 A10 10 0 0 1 10 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          <path d="M6 16 L10 20 L6 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M34 24 L30 20 L34 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      n: '04',
      title: 'Swap $ALIENDOGE',
      body: 'Swap ETH for $ALIENDOGE and confirm the transaction. The tokens will appear in your wallet once the transaction is complete.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="30" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 17 L12 23 M23 17 L28 23 M13 26 L27 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="protocol" style={{ padding: '140px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <div className="font-mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>
            ∇ MISSION PROTOCOL · 02
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>
            Four steps to <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>orbit</span>.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ink-1)', marginTop: 20, maxWidth: 640, lineHeight: 1.5 }}>
            ALIENDOGE is a standard ERC-20 with 0% taxes and a renounced Contract. No rug, on Ethereum Chain
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--line)',
          border: '1px solid var(--line-strong)',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
        }}
        className="oam-how-grid"
        >
          <style>{`
            @media (max-width: 1100px) {
              .oam-how-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 640px) {
              .oam-how-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '36px 28px 40px',
              background: 'rgba(10, 11, 20, 0.85)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background 0.3s',
              cursor: 'default',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(26, 27, 42, 0.9)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(10, 11, 20, 0.85)'}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 32 }}>
                  <div style={{ color: 'var(--gold)' }}>{s.icon}</div>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
                    STEP / {s.n}
                  </div>
                </div>
                <h3 className="font-display" style={{ fontSize: 24, fontWeight: 500, marginBottom: 14, letterSpacing: '-0.01em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-1)', lineHeight: 1.55 }}>
                  {s.body}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: -12, top: '50%',
                  width: 24, height: 24,
                  background: 'var(--bg-1)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)',
                  fontSize: 12,
                  zIndex: 2,
                  transform: 'translateY(-50%)',
                }} className="oam-how-arrow">→</div>
              )}
            </div>
          ))}
        </div>

        <style>{`@media (max-width: 1100px) { .oam-how-arrow { display: none !important; } }`}</style>

        <div style={{
          marginTop: 48,
          padding: '32px 40px',
          border: '1px solid var(--line-strong)',
          borderRadius: 20,
          background: 'linear-gradient(90deg, rgba(255, 190, 110, 0.06) 0%, transparent 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 500, marginBottom: 6 }}>
              Read the contracts
            </div>
            <div style={{ fontSize: 14, color: 'var(--ink-1)' }}>
              ALIENDOGE in the repo — verify bytecode on Etherscan after deployment.
            </div>
          </div>
          <button
            type="button"
            onClick={() =>  window.open('https://etherscan.io/token/0xComingSoon', '_blank')}
            style={{
              background: 'transparent',
              color: 'var(--gold)',
              border: '1px solid var(--line-strong)',
              padding: '14px 24px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.06em',
            }}
          >
            Etherscan →
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks });
