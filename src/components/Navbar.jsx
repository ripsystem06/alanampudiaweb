import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Inicio', to: '/', num: '01' },
  { label: 'En Pista', to: '/en-pista', num: '02' },
  { label: 'Fuera de Pista', to: '/fuera-de-pista', num: '03' },
  { label: 'Calendario', to: '/calendario', num: '04' },
  { label: 'Equipo', to: '/equipo', num: '05' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inHero, setInHero] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      // Hero is 100vh, after that we're in dark sections
      setInHero(window.scrollY < window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // In hero (white bg): dark text/icons. After hero (dark bg): light text/icons.
  const textColor = inHero ? '#111' : '#fff'
  const hoverColor = 'var(--magenta-bright)'
  const barBg = menuOpen ? '#111' : textColor

  return (
    <>
      <nav style={{
        position: 'fixed', top: '15px', left: 0, right: 0, zIndex: 1001,
        padding: '0 2rem', height: '80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'transparent',
        borderBottom: '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Left — Name */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          onMouseEnter={e => {
            e.currentTarget.children[0].style.color = hoverColor
            e.currentTarget.children[0].style.textShadow = inHero ? 'none' : '0 0 20px var(--magenta-glow)'
            e.currentTarget.children[1].style.color = hoverColor
          }}
          onMouseLeave={e => {
            e.currentTarget.children[0].style.color = textColor
            e.currentTarget.children[0].style.textShadow = 'none'
            e.currentTarget.children[1].style.color = textColor
          }}
        >
          <span style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: '1.68rem',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: textColor,
            transition: 'color 0.4s ease, text-shadow 0.2s',
          }}>ALAN</span>
          <span style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: '1.68rem',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: textColor,
            textShadow: inHero ? 'none' : '0 0 12px var(--magenta-glow)',
            transition: 'color 0.4s ease, text-shadow 0.4s ease',
          }}>AMPUDIA</span>
        </Link>

        {/* Center — Logo */}
        <Link to="/" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center',
          opacity: 1,
          pointerEvents: 'auto',
          transition: 'opacity 0.4s ease',
          filter: inHero ? 'invert(1)' : 'none',
        }}>
          <img
            src="/logo2calavera.svg"
            alt="Logo"
            style={{ height: '86px', width: 'auto', transition: 'filter 0.4s ease' }}
          />
        </Link>

        {/* Right — Store + Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <a
            href="https://alanampudia.store"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.77rem 1.68rem',
              background: 'var(--magenta)',
              color: 'var(--white)',
              fontFamily: 'Anton, sans-serif',
              fontSize: '1.15rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transform: 'skewX(-8deg)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>TIENDA</span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              width: '44px',
              height: '44px',
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '28px', height: '2px',
                background: textColor,
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: i === 0 && menuOpen ? 'rotate(45deg) translate(6px, 6px)'
                  : i === 2 && menuOpen ? 'rotate(-45deg) translate(6px, -6px)'
                  : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Fullscreen menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          padding: '0 4rem',
          animation: 'menuFadeIn 0.3s ease-out',
        }}>
          <style>{`
            @keyframes menuFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes menuLinkIn {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>

          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: '1.2rem',
                  textDecoration: 'none', marginBottom: '1.8rem',
                  animation: `menuLinkIn 0.3s ease-out ${0.05 + i * 0.06}s both`,
                }}
              >
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '1.05rem',
                  color: 'var(--magenta-bright)', letterSpacing: '0.1em',
                }}>{link.num}</span>
                <span style={{
                  fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.8rem, 7vw, 4.9rem)',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: isActive ? 'var(--white)' : 'var(--white-dim)',
                  transition: 'color 0.2s',
                  lineHeight: 1.05,
                }}
                onMouseEnter={e => e.target.style.color = 'var(--magenta-bright)'}
                onMouseLeave={e => e.target.style.color = isActive ? 'var(--white)' : 'var(--white-dim)'}
                >{link.label}</span>
                {isActive && (
                  <span style={{
                    width: '3px', height: '2.8rem',
                    background: 'var(--magenta)',
                    boxShadow: '0 0 10px var(--magenta)',
                    marginLeft: '0.5rem',
                  }} />
                )}
              </Link>
            );
          })}

          <a
            href="https://alanampudia.store"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '2rem',
              padding: '1.12rem 2.8rem',
              background: 'var(--magenta)',
              color: 'var(--white)',
              fontFamily: 'Anton, sans-serif',
              fontSize: '1.4rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transform: 'skewX(-8deg)',
              animation: `menuLinkIn 0.3s ease-out ${0.05 + navLinks.length * 0.06}s both`,
            }}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>IR A LA TIENDA ↗</span>
          </a>
        </div>
      )}
    </>
  );
}