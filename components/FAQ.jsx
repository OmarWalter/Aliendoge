const { useState } = React;

function FAQ() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: 'What is Alien Doge ($ALIENDOGE)?',
      a: 'Alien Doge ($ALIENDOGE) is an ERC-20 on Ethereum with transparent buy and sell fees on the Uniswap V2 pair, A regular Doge, with a bright green hue just like 1337 Doge, except it has the Antennae hat.',
    },
    {
      q: 'How do I buy $ALIENDOGE?',
      a: 'Create a wallet and get some ETH, go to app.uniswap.org and swap ETH for $ALIENDOGE',
    },
    {
      q: 'Is $ALIENDOGE safe?',
      a: 'The smart contract is deployed on Ethereum and can be verified on Etherscan. However, all crypto investments carry risk, including price volatility and liquidity risks. Always do your own research and only invest what you can afford to lose.',
    },
    {
      q: 'What fees or taxes does $ALIENDOGE have?',
      a: 'Buy and sell fees (if enabled) are fully transparent and executed on-chain through the Uniswap pair. You can review all fee logic directly in the verified smart contract on Etherscan.',
    },
    {
      q: 'Does $ALIENDOGE have staking, DAO, or utility?',
      a: '$ALIENDOGE is a simple ERC-20 meme token with no staking, rebasing, or built-in DAO. Its value is driven by community, liquidity, and market demand.',
    },
  ];

  return (
    <section id="docs" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: 80 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>
              ∇ TRANSMISSIONS · 05
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 24 }}>
              Signals <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>from</span> mission control.
            </h2>
            <div style={{
              padding: 24,
              background: 'rgba(18, 19, 31, 0.6)',
              border: '1px solid var(--line)',
              borderRadius: 16,
            }}>
              <div style={{ fontSize: 13, color: 'var(--ink-1)', marginBottom: 14, lineHeight: 1.5 }}>
                Question not listed? Reach the team on your usual channels after launch.
              </div>
              <a
                href={typeof window !== 'undefined' && window.OAM_SOCIAL && window.OAM_SOCIAL.telegram ? window.OAM_SOCIAL.telegram : '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: 'var(--gold)',
                  border: '1px solid var(--line-strong)',
                  padding: '12px 20px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                }}
              >
                JOIN TELEGRAM →
              </a>
            </div>
          </div>

          <div style={{
            background: 'rgba(10, 11, 20, 0.6)',
            border: '1px solid var(--line)',
            borderRadius: 20,
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
          }}>
            {faqs.map((f, i) => (
              <div key={i} style={{
                borderBottom: i < faqs.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--ink-0)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <span className="font-display" style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>
                    {f.q}
                  </span>
                  <span style={{
                    color: 'var(--gold)',
                    fontSize: 20,
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                    flexShrink: 0,
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: open === i ? 400 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                  <div style={{
                    padding: '0 28px 24px',
                    fontSize: 14.5,
                    color: 'var(--ink-1)',
                    lineHeight: 1.6,
                    maxWidth: 620,
                  }}>
                    {f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FAQ });
