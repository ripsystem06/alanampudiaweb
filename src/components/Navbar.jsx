import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Inicio', to: '/', num: '01' },
  { label: 'En Pista', to: '/en-pista', num: '02' },
  { label: 'Fuera de Pista', to: '/fuera-de-pista', num: '03' },
  { label: 'Calendario', to: '/calendario', num: '04' },
  { label: 'Equipo', to: '/equipo', num: '05' },
  { label: 'Tienda', to: '/tienda', num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        height: '28px',
        background: 'var(--magenta)',
        color: 'var(--white)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid var(--black)',
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'ticker 40s linear infinite',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              <span style={{ padding: '0 1.5rem' }}>● CAMPEÓN MUNDIAL 2024</span>
              <span style={{ padding: '0 1.5rem' }}>● TROPHY TRUCK #1</span>
              <span style={{ padding: '0 1.5rem' }}>● TRIPLE CORONA BAJA</span>
              <span style={{ padding: '0 1.5rem' }}>● PRÓXIMA: BAJA 1000 NOV 2025</span>
              <span style={{ padding: '0 1.5rem' }}>● RECORD SF250: 70.71 MPH</span>
              <span style={{ padding: '0 1.5rem' }}>● TEAM PAPAS</span>
            </div>
          ))}
        </div>
      </div>

      <nav style={{
        position: 'fixed', top: '28px', left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem', height: '70px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(5,5,5,0.4)',
        borderBottom: scrolled ? '1px solid rgba(233,30,99,0.25)' : '1px solid transparent',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.3s ease',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'var(--magenta)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'skewX(-12deg)',
          }}>
            <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: 'var(--white)', transform: 'skewX(12deg)' }}>A</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.15rem', letterSpacing: '0.04em', color: 'var(--white)' }}>AMPUDIA</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)', marginTop: '2px' }}>OFFROAD #1</span>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <Link key={link.label} to={link.to} style={{
                position: 'relative',
                display: 'flex', alignItems: 'baseline', gap: '0.4rem',
                textDecoration: 'none', padding: '0.5rem 0',
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  color: isActive ? 'var(--magenta-bright)' : 'rgba(255,255,255,0.3)',
                  transition: 'color 0.2s',
                }}>{link.num}</span>
                <span style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '0.9rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: isActive ? 'var(--white)' : 'var(--white-dim)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--magenta-bright)'}
                onMouseLeave={e => e.target.style.color = isActive ? 'var(--white)' : 'var(--white-dim)'}
                >{link.label}</span>
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '2px', background: 'var(--magenta)',
                    boxShadow: '0 0 10px var(--magenta)',
                  }} />
                )}
              </Link>
            );
          })}
        </div>

        <a href="mailto:contacto@alanampudia.com" style={{
          padding: '0.7rem 1.4rem',
          background: 'var(--magenta)', color: 'var(--white)',
          fontFamily: 'Anton, sans-serif', fontSize: '0.85rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          transform: 'skewX(-8deg)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
        >
          <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Contacto</span>
        </a>
      </nav>
    </>
  );
}
