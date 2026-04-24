const { useState, useEffect } = React;

function TickerBar() {
  const items = [
    { l: '$ALIENDOGE', v: 'ALIENDOGE', c: 'ERC-20', up: null },
    { l: 'NETWORK', v: 'Ethereum', c: 'mainnet', up: true },
    { l: 'DEX', v: 'Uniswap V2', c: 'pair tax', up: null },
    { l: 'LP', v: 'Locked', c: '', up: true },
    { l: 'SUPPLY', v: '1B ALIENDOGE', c: 'fixed', up: null },
    { l: 'WALLET', v: 'Connect', c: 'below', up: true },
    { l: 'VERIFY', v: 'Etherscan', c: 'contracts', up: null },
  ];

  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'rgba(10, 11, 20, 0.4)',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        gap: 60,
        padding: '14px 0',
        animation: 'ticker-scroll 40s linear infinite',
        width: 'max-content',
      }}>
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: 'var(--ink-2)', letterSpacing: '0.1em' }}>{it.l}</span>
            <span style={{ color: 'var(--ink-0)' }}>{it.v}</span>
            <span style={{ color: it.up === true ? 'var(--success)' : it.up === false ? '#FF6B6B' : 'var(--ink-2)' }}>
              {it.c}
            </span>
            <span style={{ color: 'var(--gold)', opacity: 0.4 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveStats() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(i);
  }, []);

  const stats = [
    {
      label: 'Total supply',
      value: '1,000,000,000',
      sub: 'OAM minted at deploy — no inflation mint',
      icon: '◉',
      chart: [0.3, 0.4, 0.35, 0.5, 0.6, 0.55, 0.7, 0.8, 0.75, 0.9, 0.85, 1.0],
    },
    {
      label: 'Staking tiers',
      value: '4',
      sub: '7d / 14d / 30d / 60d locks · APR set per tier',
      icon: '◈',
      chart: [0.5, 0.55, 0.6, 0.58, 0.65, 0.7, 0.72, 0.78, 0.82, 0.85, 0.88, 0.92],
    },
    {
      label: 'APR snapshot',
      value: '60%–600%',
      sub: 'Simple APR at default tiers (see contract)',
      icon: '✦',
      chart: [0.7, 0.65, 0.72, 0.8, 0.75, 0.82, 0.88, 0.85, 0.9, 0.95, 0.92, 1.0],
    },
    {
      label: 'Telemetry',
      value: `tick ${tick % 100}`,
      sub: 'Live staking stats load in the dapp panel',
      icon: '◎',
      chart: [0.2, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.82],
    },
  ];

  return (
    <section style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>
              ∇ LIVE TELEMETRY · 01
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em', maxWidth: 720 }}>
              Protocol facts, <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>then live</span> staking data.
            </h2>
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.1em' }}>
            UPDATED · {new Date().toISOString().slice(11, 19)} UTC
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 16,
        }}>
          {stats.map((s, i) => (
            <StatCard key={i} chartId={i} {...s} />
          ))}
        </div>

        {/* Wide chart */}
        <PriceChart />
      </div>
    </section>
  );
}

function StatCard({ label, value, sub, icon, chart, chartId }) {
  return (
    <div style={{
      padding: 28,
      background: 'rgba(18, 19, 31, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--line)',
      borderRadius: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 20, right: 20, color: 'var(--gold)', opacity: 0.4, fontSize: 20 }}>{icon}</div>
      <div className="font-mono" style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '0.12em', marginBottom: 12 }}>
        {label.toUpperCase()}
      </div>
      <div className="font-display" style={{ fontSize: 34, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 18 }}>{sub}</div>

      {/* Mini chart */}
      <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`g-stat-${chartId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 190, 110, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 190, 110, 0)" />
          </linearGradient>
        </defs>
        <polyline
          points={chart.map((v, i) => `${i * (100 / (chart.length - 1))},${40 - v * 32 - 4}`).join(' ')}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points={`0,40 ${chart.map((v, i) => `${i * (100 / (chart.length - 1))},${40 - v * 32 - 4}`).join(' ')} 100,40`}
          fill={`url(#g-stat-${chartId})`}
        />
      </svg>
    </div>
  );
}

function PriceChart() {
  // Generate a pretend price curve
  const points = [];
  for (let i = 0; i < 100; i++) {
    const t = i / 100;
    const v = 0.3 + Math.sin(i * 0.15) * 0.15 + Math.sin(i * 0.05) * 0.25 + t * 0.35 + (Math.random() * 0.05);
    points.push(Math.min(Math.max(v, 0.1), 0.95));
  }

  return (
    <div style={{
      padding: 32,
      background: 'rgba(18, 19, 31, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--line)',
      borderRadius: 20,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '0.12em', marginBottom: 8 }}>
            $ALIENDOGE · illustrative chart
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <div className="font-display" style={{ fontSize: 42, fontWeight: 500, letterSpacing: '-0.02em' }}>—</div>
            <div style={{ color: 'var(--ink-2)', fontSize: 15, fontFamily: 'JetBrains Mono, monospace' }}>not a price oracle</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, padding: 4, background: 'rgba(5, 6, 10, 0.5)', border: '1px solid var(--line)', borderRadius: 10, fontFamily: 'JetBrains Mono, monospace' }}>
          {['1H', '24H', '7D', '30D', '90D', 'ALL'].map(t => (
            <button key={t} style={{
              background: t === '7D' ? 'rgba(255, 190, 110, 0.15)' : 'transparent',
              color: t === '7D' ? 'var(--gold)' : 'var(--ink-2)',
              border: 'none',
              padding: '8px 12px',
              fontSize: 11,
              letterSpacing: '0.06em',
              borderRadius: 6,
              cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <svg width="100%" height="240" viewBox="0 0 1000 240" preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 190, 110, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 190, 110, 0)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(y => (
          <line key={y} x1="0" y1={y * 240} x2="1000" y2={y * 240} stroke="rgba(255, 204, 120, 0.06)" strokeDasharray="2 4" />
        ))}

        <polygon
          points={`0,240 ${points.map((v, i) => `${i * (1000 / (points.length - 1))},${240 - v * 220}`).join(' ')} 1000,240`}
          fill="url(#chartFill)"
        />
        <polyline
          points={points.map((v, i) => `${i * (1000 / (points.length - 1))},${240 - v * 220}`).join(' ')}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End dot */}
        <circle cx={1000 * (points.length - 1) / (points.length - 1) - 2} cy={240 - points[points.length - 1] * 220} r="4" fill="var(--gold)" />
        <circle cx={1000 * (points.length - 1) / (points.length - 1) - 2} cy={240 - points[points.length - 1] * 220} r="10" fill="var(--gold)" opacity="0.2">
          <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 12,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em',
      }}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

Object.assign(window, { TickerBar, LiveStats });
