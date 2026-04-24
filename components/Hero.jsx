const { useState, useEffect, useRef } = React;

function fmtAddrNav(a) {
  if (!a || a.length < 10) return "";
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { address, chainId, connect, disconnect, switchToMainnet } = useWeb3();
  const needsMainnet = chainId != null && chainId !== window.OAM_CHAIN_ID;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: scrolled ? '12px 0' : '24px 0',
      background: scrolled ? 'rgba(5, 6, 10, 0.75)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="assets/favicon.png"
            alt="Olympus Asteroid"
            width={40}
            height={40}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              objectFit: 'cover',
              boxShadow: '0 0 20px rgba(255, 190, 110, 0.35)',
              border: '1px solid var(--line-strong)',
            }}
          />
          <div className="font-display" style={{ fontSize: 18, fontWeight: 300, letterSpacing: '0.02em' }}>
            Alien<span className="text-gold"> Doge</span>
          </div>
        </div>



        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
            {needsMainnet ? 'Ethereum mainnet' : 'Buy Now →'}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section ref={heroRef} style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: 120,
      paddingBottom: 80,
      display: 'flex',
      alignItems: 'center',
      overflow: 'visible',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 60,
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Left: copy — room for italic + gradient text (avoids clipping last letters) */}
        <div style={{ minWidth: 0, paddingRight: 'clamp(8px, 2vw, 32px)', overflow: 'visible' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 14px',
            border: '1px solid var(--line-strong)',
            borderRadius: 100,
            background: 'rgba(255, 190, 110, 0.05)',
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.08em',
            marginBottom: 28,
            color: 'var(--gold)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--gold)',
              boxShadow: '0 0 10px var(--gold)',
              animation: 'twinkle 2s ease-in-out infinite',
            }}></span>
            $ALIENDOGE · ETHEREUM MAINNET
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: 32,
            textWrap: 'balance',
            overflow: 'visible',
          }}>
            Alien<br/>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(120deg, #FFE4A8 0%, var(--gold) 40%, #FF8C42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
              fontWeight: 400,
              paddingRight: '0.2em',
              paddingLeft: '0.02em',
              lineHeight: 1.15,
            }}>Doge</span>
          </h1>

          <p style={{
            fontSize: 19,
            lineHeight: 1.55,
            color: 'var(--ink-1)',
            maxWidth: 540,
            marginBottom: 40,
            textWrap: 'pretty',
          }}>
            <strong>Alien Doge ($ALIENDOGE)</strong> is an ERC-20 on Ethereum with transparent buy and sell fees on the
            Uniswap V2 pair, A regular Doge, with a bright green hue just like 1337 Doge, except it has the Antennae hat.
          </p>

          <div style={{ display: 'flex', gap: 14, marginBottom: 56, flexWrap: 'wrap' }}>
            <button type="button" style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-deep) 100%)',
              color: '#0A0B14',
              border: 'none',
              padding: '18px 32px',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 0 40px rgba(255, 190, 110, 0.3)',
              transition: 'transform 0.2s',
            }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
               onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
               onClick={() => document.getElementById('staking')?.scrollIntoView({ behavior: 'smooth' })}>
              Buy Now →
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--ink-0)',
              border: '1px solid var(--line-strong)',
              padding: '18px 28px',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              backdropFilter: 'blur(10px)',
            }}
            type="button"
            onClick={() => document.getElementById('protocol')?.scrollIntoView({ behavior: 'smooth' })}>
              How to buy
            </button>
          </div>

          {/* Mini quick stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            overflow: 'hidden',
            maxWidth: 620,
          }}>
            {[
              { l: 'Chain', v: 'Ethereum' },
              { l: 'Ticker', v: '$ALIENDOGE' },
              { l: 'LP', v: 'Locked' },
              { l: 'Tax', v: '0/0' },
            ].map(s => (
              <div key={s.l} style={{
                padding: '18px 20px',
                background: 'rgba(10, 11, 20, 0.8)',
                backdropFilter: 'blur(20px)',
              }}>
                <div className="font-mono" style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '0.12em', marginBottom: 6 }}>
                  {s.l.toUpperCase()}
                </div>
                <div className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink-0)' }}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Astronaut dog + orbit */}
        <div style={{
          position: 'relative',
          height: 560,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Orbit rings */}
          <div style={{
            position: 'absolute',
            width: 480, height: 480,
            border: '1px dashed rgba(255, 190, 110, 0.2)',
            borderRadius: '50%',
            animation: 'orbit 60s linear infinite',
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          }}>
            <div style={{
              position: 'absolute', top: -6, left: '50%',
              width: 12, height: 12, borderRadius: '50%',
              background: 'var(--gold)',
              boxShadow: '0 0 20px var(--gold)',
              transform: 'translateX(-50%)',
            }}></div>
          </div>
          <div style={{
            position: 'absolute',
            width: 360, height: 360,
            border: '1px solid rgba(255, 190, 110, 0.12)',
            borderRadius: '50%',
            animation: 'orbit 40s linear infinite reverse',
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
          }}>
            <div style={{
              position: 'absolute', bottom: 20, right: 40,
              width: 8, height: 8, borderRadius: '50%',
              background: '#FF8C42',
              boxShadow: '0 0 15px #FF8C42',
            }}></div>
          </div>
          <div style={{
            position: 'absolute',
            width: 600, height: 600,
            border: '1px solid rgba(255, 190, 110, 0.05)',
            borderRadius: '50%',
            transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
          }}></div>

          {/* Glow behind dog */}
          <div style={{
            position: 'absolute',
            width: 360, height: 360,
            background: 'radial-gradient(circle, rgba(255, 190, 110, 0.3) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}></div>

          {/* The Dog */}
          <div style={{
            position: 'relative',
            width: 380, height: 380,
            borderRadius: '50%',
            overflow: 'hidden',
            animation: 'float 6s ease-in-out infinite',
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            transition: 'transform 0.3s ease-out',
            boxShadow: '0 0 80px rgba(255, 190, 110, 0.2), inset 0 0 60px rgba(255, 190, 110, 0.1)',
            border: '1px solid rgba(255, 190, 110, 0.2)',
          }}>
            <img src="assets/dog-sit.png" alt="Olympus Asteroid" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center 20%',
            }} />
          </div>

          {/* Floating info tags */}
          {/* <div style={{
            position: 'absolute',
            top: 40, right: 20,
            padding: '10px 14px',
            background: 'rgba(10, 11, 20, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--line-strong)',
            borderRadius: 12,
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
            transition: 'transform 0.3s',
          }}>
            <div style={{ color: 'var(--ink-2)', fontSize: 10, letterSpacing: '0.08em', marginBottom: 4 }}>MISSION STATUS</div>
            <div style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></span>
              ORBITING
            </div>
          </div> */}

          <div style={{
            position: 'absolute',
            bottom: 60, left: 10,
            padding: '12px 16px',
            background: 'rgba(10, 11, 20, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--line-strong)',
            borderRadius: 12,
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
            transition: 'transform 0.3s',
          }}>
            <div style={{ color: 'var(--ink-2)', fontSize: 10, letterSpacing: '0.08em', marginBottom: 4 }}>$ALIENDOGE</div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 30, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        color: 'var(--ink-2)',
        fontSize: 10,
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.15em',
      }}>
        SCROLL TO LAUNCH
        <div style={{
          width: 1, height: 40,
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
        }}></div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero });
