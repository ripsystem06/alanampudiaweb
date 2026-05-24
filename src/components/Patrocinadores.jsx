import { useEffect, useRef, useState } from 'react';

const sponsors = [
  { name: 'Monster Energy', category: 'PATROCINADOR PRINCIPAL', tier: 'principal', code: 'P.01' },
  { name: 'Papas and Beer', category: 'ESCUDERÍA / FAMILIA', tier: 'principal', code: 'P.02' },
  { name: 'Toyo Tires', category: 'NEUMÁTICOS OFICIALES', tier: 'principal', code: 'P.03' },
  { name: 'KMC Wheels', category: 'RINES OFICIALES', tier: 'aliado', code: 'A.01' },
  { name: 'King Shocks', category: 'SUSPENSIÓN OFF-ROAD', tier: 'aliado', code: 'A.02' },
  { name: 'Baja Designs', category: 'ILUMINACIÓN LED & LÁSER', tier: 'aliado', code: 'A.03' },
  { name: 'Mason', category: 'CONSTRUCCIÓN / TROPHY TRUCK', tier: 'aliado', code: 'A.04' },
  { name: 'Bell Helmets', category: 'CASCO OFICIAL', tier: 'aliado', code: 'A.05' },
];

export default function Patrocinadores() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="patrocinadores" ref={ref} style={{
      padding: '8rem 4rem', background: 'var(--black)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '4rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s',
        }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: 'var(--magenta)', marginBottom: '0.8rem' }}>
              11 / PARTNERS
            </div>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', lineHeight: 1.05, color: 'var(--white)' }}>
              MARCAS QUE<br /><span style={{ color: 'var(--magenta)' }}>RESPALDAN</span> EL #1.
            </h2>
          </div>
          <a href="mailto:contacto@alanampudia.com" style={{
            padding: '1rem 1.8rem', background: 'var(--magenta)', color: 'var(--white)',
            fontFamily: 'Anton, sans-serif', fontSize: '0.9rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', transform: 'skewX(-8deg)',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(233,30,99,0.3)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Ser Patrocinador</span>
          </a>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
            letterSpacing: '0.3em', color: 'var(--magenta-bright)',
            marginBottom: '1.2rem',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--magenta)' }} />
            TIER 01 / PRINCIPALES
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'rgba(233,30,99,0.2)',
            border: '1px solid rgba(233,30,99,0.2)',
          }}>
            {sponsors.filter(s => s.tier === 'principal').map((sp, i) => (
              <div key={sp.name} style={{
                background: 'var(--black-card)', padding: '2.5rem 2rem',
                position: 'relative', overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                  letterSpacing: '0.25em', color: 'var(--magenta-bright)',
                  marginBottom: '1.5rem',
                }}>[{sp.code}]</div>
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '2rem',
                  color: 'var(--white)', marginBottom: '0.5rem', lineHeight: 1.1,
                }}>{sp.name.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                  letterSpacing: '0.2em', color: 'var(--white-dim)',
                }}>{sp.category}</div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '4px', background: 'var(--magenta)',
                  boxShadow: '0 0 15px var(--magenta-glow)',
                }} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
            letterSpacing: '0.3em', color: 'var(--white-dim)',
            marginBottom: '1.2rem',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--white-dim)' }} />
            TIER 02 / ALIADOS TÉCNICOS
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            {sponsors.filter(s => s.tier === 'aliado').map((sp, i) => (
              <div key={sp.name} style={{
                background: 'var(--black-mid)', padding: '1.8rem 1.2rem',
                textAlign: 'center', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--black-card)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--black-mid)'}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.25em', color: 'var(--magenta-bright)',
                  marginBottom: '0.8rem',
                }}>[{sp.code}]</div>
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '1.1rem',
                  color: 'var(--white)', marginBottom: '0.4rem', lineHeight: 1.1,
                }}>{sp.name.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
                  letterSpacing: '0.2em', color: 'var(--white-dim)',
                }}>{sp.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
