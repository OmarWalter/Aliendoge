function Roadmap() {
  const missions = [
    {
      phase: 'Phase 0',
      title: 'Contracts',
      status: 'complete',
      items: [
        'ERC-20 token contract and Fixed total supply defined',
        'Ownership and permissions configured',
        'Contract tested and verified locally',
      ],
    },
    {
      phase: 'Phase 1',
      title: 'SECURITY',
      status: 'active',
      items: [
        'Optional third-party audit',
        'Contract verified on Etherscan',
        'Ownership renounced or secured',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'LAUNCH',
      status: 'active',
      items: [
        'Deploy token to Ethereum mainnet',
        'Create liquidity pool (Uniswap V2) and Add initial liquidity',
        'Lock liquidity and public announcement of launch',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'LISTINGS',
      status: 'upcoming',
      items: [
        'Submit to CoinGecko & CoinMarketCap',
        'Integrate with wallets and apply for additional DEX listings',
        'Track price & volume analytics',
      ],
    },
    {
      phase: 'Beyond',
      title: 'Community',
      status: 'upcoming',
      items: [
        'Build Telegram / Twitter & X ChatGroup',
        'Marketing campaigns & awareness',
        'Community-driven growth and long-term brand development',
      ],
    },
  ];

  const statusMap = {
    complete: { label: 'COMPLETE', color: 'var(--success)' },
    active: { label: 'IN ORBIT', color: 'var(--gold)' },
    upcoming: { label: 'AWAITING LAUNCH', color: 'var(--ink-3)' },
  };

  return (
    <section id="dao" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <div className="font-mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>
            ∇ FLIGHT PLAN · 04
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>
            A sober <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>flight plan</span> for $ALIENDOGE.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-1)', marginTop: 16, maxWidth: 560, lineHeight: 1.5 }}>
            No fictional TVL milestones — just deployment, liquidity, and tooling you can ship with the contracts in this repo.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: 0, right: 0,
            top: 86,
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, var(--line-strong) 10%, var(--line-strong) 90%, transparent 100%)',
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 20,
            position: 'relative',
          }}
          className="oam-roadmap-grid"
          >
            <style>{`
              @media (max-width: 1200px) {
                .oam-roadmap-grid { grid-template-columns: 1fr 1fr !important; }
              }
              @media (max-width: 640px) {
                .oam-roadmap-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {missions.map((m, i) => {
              const st = statusMap[m.status];
              return (
                <div key={i}>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.12em', marginBottom: 10 }}>
                    {m.phase}
                  </div>

                  <div style={{ position: 'relative', marginBottom: 20 }}>
                    <div style={{
                      width: 20, height: 20,
                      borderRadius: '50%',
                      background: m.status === 'upcoming' ? 'var(--bg-1)' : st.color,
                      border: `2px solid ${m.status === 'upcoming' ? 'var(--line-strong)' : st.color}`,
                      boxShadow: m.status === 'active' ? `0 0 20px ${st.color}` : 'none',
                      position: 'relative',
                      zIndex: 2,
                    }}>
                      {m.status === 'active' && (
                        <div style={{
                          position: 'absolute',
                          inset: -6,
                          borderRadius: '50%',
                          border: `2px solid ${st.color}`,
                          opacity: 0.4,
                          animation: 'pulse-glow 2s ease-in-out infinite',
                        }}></div>
                      )}
                    </div>
                  </div>

                  <div style={{
                    padding: 24,
                    background: m.status === 'active' ? 'linear-gradient(180deg, rgba(255, 190, 110, 0.08) 0%, rgba(18, 19, 31, 0.6) 100%)' : 'rgba(18, 19, 31, 0.6)',
                    border: m.status === 'active' ? '1px solid var(--line-strong)' : '1px solid var(--line)',
                    borderRadius: 16,
                    backdropFilter: 'blur(20px)',
                    minHeight: 280,
                  }}>
                    <div className="font-mono" style={{ fontSize: 9, color: st.color, letterSpacing: '0.12em', marginBottom: 8 }}>
                      ● {st.label}
                    </div>
                    <h3 className="font-display" style={{ fontSize: 22, fontWeight: 500, marginBottom: 18, letterSpacing: '-0.01em' }}>
                      {m.title}
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {m.items.map((it, j) => (
                        <li key={j} style={{
                          fontSize: 12.5,
                          color: m.status === 'upcoming' ? 'var(--ink-2)' : 'var(--ink-1)',
                          lineHeight: 1.5,
                          paddingLeft: 14,
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0, top: 8,
                            width: 4, height: 4,
                            borderRadius: '50%',
                            background: m.status === 'complete' ? 'var(--success)' : m.status === 'active' ? 'var(--gold)' : 'var(--ink-3)',
                          }}></span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Roadmap });
