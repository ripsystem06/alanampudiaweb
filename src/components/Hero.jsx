import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(new Date());
  const [revealed, setRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  const onMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const px = (mousePos.x - 0.5) * 20;
  const py = (mousePos.y - 0.5) * 12;

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      style={{
        position: 'relative', height: '100vh', minHeight: '720px',
        paddingTop: '98px', overflow: 'hidden',
        background: 'var(--black)', cursor: 'none',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 30% 30%, rgba(233,30,99,0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(164,210,51,0.06) 0%, transparent 45%),
          linear-gradient(135deg, #0d0307 0%, #050505 50%, #0a0510 100%)
        `,
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, opacity: 0.5,
        background: `repeating-linear-gradient(135deg, transparent 0, transparent 90px, rgba(233,30,99,0.03) 90px, rgba(233,30,99,0.03) 91px)`,
      }} />

      <div style={{
        position: 'absolute', top: '50%', right: '4%',
        transform: `translateY(-50%) translate(${px * 0.5}px, ${py * 0.5}px)`,
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(15rem, 32vw, 38rem)',
        color: 'transparent',
        WebkitTextStroke: '2px rgba(233,30,99,0.12)',
        lineHeight: 0.85, userSelect: 'none', pointerEvents: 'none', zIndex: 2,
      }}>1</div>

      <div style={{
        position: 'absolute', bottom: '32px', right: '6%',
        height: '88%', maxHeight: '880px', zIndex: 4,
        pointerEvents: 'none',
        transform: `translate(${px * 0.3}px, ${py * 0.3}px)`,
        transition: 'transform 0.15s ease-out',
        opacity: loaded ? 1 : 0,
      }}>
        <div style={{
          position: 'absolute', inset: '-10% -20%',
          background: 'radial-gradient(ellipse at center, rgba(233,30,99,0.25), transparent 65%)',
          filter: 'blur(40px)', zIndex: -1,
        }} />

        <img src="/images/hero-helmet.png" alt="Alan con casco" style={{
          height: '100%', width: 'auto', objectFit: 'contain',
          opacity: revealed ? 0 : 1,
          transform: revealed ? 'scale(0.96)' : 'scale(1)',
          transition: 'opacity 0.6s, transform 0.8s',
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
        }} />

        <img src="/images/hero-person.png" alt="Alan Ampudia" style={{
          position: 'absolute', top: 0, left: 0,
          height: '100%', width: 'auto', objectFit: 'contain',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1)' : 'scale(1.04)',
          transition: 'opacity 0.6s, transform 0.8s',
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
        }} />
      </div>

      <div style={{
        position: 'absolute',
        left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
        width: revealed ? '60px' : '40px',
        height: revealed ? '60px' : '40px',
        border: '1px solid var(--magenta)', borderRadius: '50%',
        transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 50,
        transition: 'width 0.3s, height 0.3s',
        boxShadow: '0 0 20px rgba(233,30,99,0.5)',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '4px', height: '4px', background: 'var(--magenta)',
          borderRadius: '50%', transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px var(--magenta)',
        }} />
      </div>

      <div style={{
        position: 'absolute', top: '120px', left: '4rem', right: '4rem',
        display: 'flex', justifyContent: 'space-between', zIndex: 10,
        opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
      }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--magenta-bright)', borderRadius: '50%', animation: 'blink 1.5s infinite', boxShadow: '0 0 12px var(--magenta-bright)' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--white-dim)' }}>LIVE</span>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--white-dim)' }}>
            {time.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--magenta-bright)' }}>
            32°N 116°W · ENSENADA
          </div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--white-dim)' }}>
          [001/004] BAJA SERIES 2025
        </div>
      </div>

      <div style={{
        position: 'absolute', left: '2rem', top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'left center',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.7rem', letterSpacing: '0.4em',
        color: 'var(--magenta)', zIndex: 5, whiteSpace: 'nowrap',
        opacity: loaded ? 0.9 : 0, transition: 'opacity 1s ease 1s',
      }}>
        SCORE TROPHY TRUCK · #1 · CAMPEÓN MUNDIAL 2024
      </div>

      <div style={{
        position: 'absolute', bottom: '5rem', left: '4rem', right: '50%', zIndex: 10,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
          marginBottom: '2rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.7s ease 0.4s',
        }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--magenta)', boxShadow: '0 0 8px var(--magenta-glow)' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.4em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', fontWeight: 700,
          }}>El Rey Mexicano del Off-Road</span>
        </div>

        <h1 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(4.5rem, 12vw, 13rem)',
          lineHeight: 0.88, letterSpacing: '-0.02em',
          textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          <div style={{
            color: 'var(--white)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}>ALAN</div>
          <div style={{
            color: 'var(--magenta)',
            textShadow: '0 0 60px rgba(233,30,99,0.5)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
            marginTop: '-0.05em',
          }}>AMPUDIA</div>
        </h1>

        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '2rem',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.9s',
        }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
            letterSpacing: '0.3em', color: 'var(--white-dim)',
            textTransform: 'uppercase',
          }}>Ensenada · Baja California · México</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              width: '6px', height: '6px', background: 'var(--magenta)',
              borderRadius: '50%', animation: 'pulse-dot 2s infinite',
              boxShadow: '0 0 10px var(--magenta-glow)',
            }} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
              letterSpacing: '0.4em', color: 'var(--white-dim)',
              textTransform: 'uppercase',
            }}>Pasa el cursor para revelar</span>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '50px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 1.2s',
      }}>
        <div style={{
          width: '1px', height: '40px', background: 'var(--magenta)',
          opacity: 0.5, animation: 'scroll-line 2.2s ease-in-out infinite',
          transformOrigin: 'top',
        }} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
          letterSpacing: '0.5em', color: 'var(--white-dim)', textTransform: 'uppercase',
        }}>Scroll</span>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '32px', borderTop: '1px solid rgba(233,30,99,0.3)',
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', zIndex: 11,
      }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'ticker 60s linear infinite', color: 'var(--white-dim)' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
              <span style={{ padding: '0 1.5rem' }}>FORD RAPTOR AWD</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
              <span style={{ padding: '0 1.5rem' }}>MASON BUILT</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
              <span style={{ padding: '0 1.5rem' }}>TOYO TIRES</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
              <span style={{ padding: '0 1.5rem' }}>BAJA DESIGNS</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
              <span style={{ padding: '0 1.5rem' }}>MONSTER ENERGY</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
              <span style={{ padding: '0 1.5rem' }}>KMC WHEELS</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
              <span style={{ padding: '0 1.5rem' }}>PAPAS & BEER</span>
              <span style={{ padding: '0 1.5rem', color: 'var(--magenta)' }}>★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
