function FloatingDogs() {
  return (
    <>
      <style>{`
        @keyframes oam-float1-lr {
          0% {
            transform: translate(-28vw, 0) rotate(-10deg);
            opacity: 0.3;
          }
          10% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translate(125vw, 0) rotate(6deg);
            opacity: 0.25;
          }
        }
        @keyframes oam-float1-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-20px); }
        }
        @keyframes oam-float2-br-tl {
          0% {
            transform: translate(0, 0) rotate(10deg);
            opacity: 0.35;
          }
          8% {
            opacity: 0.95;
          }
          92% {
            opacity: 0.95;
          }
          100% {
            transform: translate(calc(-100vw - 40px), calc(-100vh - 40px)) rotate(-8deg);
            opacity: 0.25;
          }
        }
        @keyframes oam-float2-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-18px); }
        }
      `}</style>

      {/* dog-float-1 — left → right, mid screen */}
      <div
        style={{
          position: 'fixed',
          top: 'clamp(14%, 22vh, 38%)',
          left: 0,
          width: 'clamp(130px, 20vw, 200px)',
          height: 'clamp(130px, 20vw, 200px)',
          zIndex: 2,
          pointerEvents: 'none',
          animation: 'oam-float1-lr 52s linear infinite',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            animation: 'oam-float1-bob 5.5s ease-in-out infinite',
          }}
        >
          <img
            src="assets/dog-float-1.png"
            alt="Olympus Asteroid"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.6)) drop-shadow(0 0 24px rgba(255, 190, 110, 0.14))',
              opacity: 0.94,
            }}
          />
        </div>
      </div>

      {/* dog-float-2 — bottom-right → top-left */}
      <div
        style={{
          position: 'fixed',
          right: 'max(-2vw, -12px)',
          bottom: 'max(-2vh, -12px)',
          width: 'clamp(140px, 22vw, 220px)',
          height: 'clamp(140px, 22vw, 220px)',
          zIndex: 2,
          pointerEvents: 'none',
          animation: 'oam-float2-br-tl 48s linear infinite',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            animation: 'oam-float2-bob 6s ease-in-out infinite',
          }}
        >
          <img
            src="assets/dog-float-2.png"
            alt="Olympus Asteroid"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 14px 32px rgba(0,0,0,0.55)) drop-shadow(0 0 28px rgba(255, 190, 110, 0.12))',
            }}
          />
        </div>
      </div>
    </>
  );
}

Object.assign(window, { FloatingDogs });
