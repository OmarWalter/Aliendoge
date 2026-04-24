function Crew() {
  const crew = [
    {
      name: 'Asteroid',
      role: 'Captain',
      img: 'assets/dog-sit.png',
      bio: 'Mission lead. First to complete a full OAM stake cycle on testnet without touching emergency exits — because there are none.',
      stats: [
        { l: 'MISSIONS', v: '247' },
        { l: 'REBASES', v: '2.9K' },
      ],
    },
    {
      name: 'Comet',
      role: 'Navigator',
      img: 'assets/dog-wave.png',
      bio: 'DeFi trajectories specialist. Never missed a contract event — even when the mempool looked like a black hole.',
      stats: [
        { l: 'MISSIONS', v: '184' },
        { l: 'REBASES', v: '2.1K' },
      ],
    },
    {
      name: 'Nebula',
      role: 'Sleep Specialist',
      img: 'assets/dog-sleep.png',
      bio: 'Long-haul veteran. Keeps the ship steady through lock windows. Earns rewards while sleeping — after unlock, of course.',
      stats: [
        { l: 'MISSIONS', v: '312' },
        { l: 'REBASES', v: '3.7K' },
      ],
    },
  ];

  return (
    <section style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ marginBottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="font-mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>
              ∇ CREW MANIFEST · 06
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>
              Meet <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>Alien Doge</span>.
            </h2>
            <p style={{ fontSize: 16.5, color: 'var(--ink-1)', lineHeight: 1.55, marginTop: 20, maxWidth: 560 }}>
              Meet the alien doge. Three alien doges who chose the cosmos over couches.
            </p>
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.12em' }}>
            CLASSIFIED · CLEARANCE LEVEL 3
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {crew.map((c, i) => (
            <div key={i} style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid var(--line-strong)',
              background: 'linear-gradient(180deg, rgba(18, 19, 31, 0.8) 0%, rgba(10, 11, 20, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              transition: 'transform 0.3s ease, border-color 0.3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(255, 190, 110, 0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 204, 120, 0.18)';
            }}>
              {/* Image area */}
              <div style={{
                position: 'relative',
                height: 320,
                background: 'radial-gradient(ellipse at center, rgba(255, 190, 110, 0.15) 0%, transparent 70%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
                {/* Decorative orbit ring */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 260, height: 260,
                  border: '1px dashed rgba(255, 190, 110, 0.15)',
                  borderRadius: '50%',
                  animation: `orbit ${30 + i * 10}s linear infinite${i % 2 ? ' reverse' : ''}`,
                }}></div>
                {/* Grid backdrop */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(255,204,120,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,120,0.04) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                }}></div>

                <img src={c.img} alt={c.name} style={{
                  position: 'relative',
                  maxHeight: '95%',
                  maxWidth: '85%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                  animation: `float ${6 + i}s ease-in-out infinite`,
                }} />

                {/* Corner tag */}
                <div style={{
                  position: 'absolute',
                  top: 16, left: 16,
                  padding: '5px 10px',
                  background: 'rgba(5, 6, 10, 0.8)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 6,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: 'var(--gold)',
                  letterSpacing: '0.12em',
                }}>
                  #{String(i + 1).padStart(3, '0')}
                </div>
                <div style={{
                  position: 'absolute',
                  top: 16, right: 16,
                  padding: '5px 10px',
                  background: 'rgba(5, 6, 10, 0.8)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 6,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: 'var(--ink-1)',
                  letterSpacing: '0.12em',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 6px var(--success)' }}></span>
                  ACTIVE
                </div>
              </div>

              {/* Info area */}
              {/* <div style={{ padding: 28, borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <h3 className="font-display" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em' }}>
                    {c.name}
                  </h3>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                    {c.role.toUpperCase()}
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-1)', lineHeight: 1.55, marginBottom: 20, minHeight: 62 }}>
                  {c.bio}
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                  background: 'var(--line)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                  {c.stats.map(s => (
                    <div key={s.l} style={{ padding: '12px 14px', background: 'rgba(5, 6, 10, 0.6)' }}>
                      <div className="font-mono" style={{ fontSize: 9, color: 'var(--ink-2)', letterSpacing: '0.12em', marginBottom: 4 }}>
                        {s.l}
                      </div>
                      <div className="font-display" style={{ fontSize: 18, fontWeight: 500, color: 'var(--gold)' }}>
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Crew });
