import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--black)', borderTop: '1px solid var(--magenta)',
      padding: '5rem 4rem 2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: '-3rem', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(8rem, 22vw, 24rem)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(233,30,99,0.08)',
        lineHeight: 0.85, userSelect: 'none', whiteSpace: 'nowrap',
      }}>AMPUDIA</div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          marginBottom: '3.5rem', paddingBottom: '3rem',
          borderBottom: '1px solid rgba(233,30,99,0.2)',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '1.5rem',
          }}>// SIEMPRE AL FRENTE</div>
          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05,
            color: 'var(--white)',
          }}>
            EL DESIERTO ESPERA.<br />
            <span style={{
              background: 'var(--magenta)', color: 'var(--white)',
              padding: '0 0.3em', display: 'inline-block', transform: 'skewX(-6deg)',
            }}>VAMOS POR MÁS.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '38px', height: '38px', background: 'var(--magenta)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: 'skewX(-12deg)',
              }}>
                <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: 'var(--white)', transform: 'skewX(12deg)' }}>A</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: 'var(--white)' }}>ALAN AMPUDIA</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginTop: '3px' }}>
                  SCORE TROPHY TRUCK / #1
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.95rem',
              color: 'var(--white-soft)', lineHeight: 1.6, marginBottom: '1.5rem',
              maxWidth: '320px',
            }}>
              El Rey Mexicano del Off-Road. Campeón Mundial SCORE Trophy Truck 2024. Ensenada, Baja California.
            </p>
            <a href="mailto:contacto@alanampudia.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--magenta-bright)', textDecoration: 'none',
              borderBottom: '1px solid var(--magenta)', paddingBottom: '4px',
              fontWeight: 700,
            }}>→ contacto@alanampudia.com</a>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--magenta-bright)', marginBottom: '1.2rem' }}>
              [01] SITEMAP
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { label: 'Inicio', to: '/' },
                { label: 'En Pista', to: '/en-pista' },
                { label: 'Fuera de Pista', to: '/fuera-de-pista' },
                { label: 'Calendario', to: '/calendario' },
                { label: 'El Equipo', to: '/equipo' },
                { label: 'Tienda', to: '/tienda' },
              ].map(p => (
                <Link key={p.label} to={p.to} style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '0.95rem',
                  color: 'var(--white-soft)', textDecoration: 'none',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--magenta-bright)'}
                onMouseLeave={e => e.target.style.color = 'var(--white-soft)'}
                >→ {p.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--magenta-bright)', marginBottom: '1.2rem' }}>
              [02] SOCIAL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['Instagram', 'YouTube', 'TikTok', 'Facebook'].map(s => (
                <a key={s} href="#" style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '0.95rem',
                  color: 'var(--white-soft)', textDecoration: 'none',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--magenta-bright)'}
                onMouseLeave={e => e.target.style.color = 'var(--white-soft)'}
                >→ {s}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--magenta-bright)', marginBottom: '1.2rem' }}>
              [03] PARTNERS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Monster Energy', 'Papas and Beer', 'Toyo Tires', 'KMC Wheels', 'King Shocks', 'Baja Designs'].map(sp => (
                <div key={sp} style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>{sp}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(233,30,99,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em',
          }}>
            © 2025 ALAN AMPUDIA / ALL RIGHTS RESERVED
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['PRIVACIDAD', 'TÉRMINOS', 'COOKIES'].map(l => (
              <a key={l} href="#" style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--magenta-bright)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
