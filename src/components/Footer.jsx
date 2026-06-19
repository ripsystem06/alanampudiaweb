import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CASCO = '/footerleements/casctofront.webp';

const pages = [
  { key: 'nav.en_pista', to: '/en-pista' },
  { key: 'nav.fuera_de_pista', to: '/fuera-de-pista' },
  { key: 'nav.calendario', to: '/calendario' },
  { key: 'nav.equipo', to: '/equipo' },
];

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/ampudia10' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@alan_amp' },
  { name: 'YouTube', href: 'https://www.youtube.com/@alanamp' },
  { name: 'Instagram', href: 'https://www.instagram.com/alan_amp/' },
];

export default function Footer() {
  const { t } = useLanguage();
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} style={{
      position: 'relative',
      background: '#000',
      border: '2px solid #E91E8C',
      borderRadius: '12px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* Watermark logo */}
      <style>{`
        footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/logo2calavera.svg');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        }
        footer > * {
          position: relative;
          z-index: 1;
        }
      `}</style>

      {/* Main section: CASCO left, links right on desktop */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem) 0',
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(2rem, 4vw, 4rem)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        {/* CASCO image — left on desktop, below on mobile */}
        <div style={{
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <img
            src={CASCO}
            alt="Alan Ampudia"
            style={{
              width: window.innerWidth < 768 ? '100%' : '350px',
              maxWidth: '500px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, #000 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Links — right on desktop, top on mobile */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(3rem, 8vw, 8rem)',
          flexWrap: 'wrap',
        }}>
          {/* Column 1 — Páginas + Tienda */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.4rem, 0.9vw, 0.8rem)',
          }}>
            <h4 style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(0.55rem, 1vw, 0.85rem)',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 0.4rem 0',
              textTransform: 'uppercase',
            }}>{t('footer.paginas')}</h4>
            {pages.map(p => (
              <Link key={p.key} to={p.to} style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)',
                color: '#FFFFFF',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
              onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
              >{t(p.key).toUpperCase()}</Link>
            ))}
            <a
              href="https://www.alanampudia.store"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)',
                color: 'var(--magenta-bright)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                marginTop: '0.3rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
            >{t('footer.tienda')}</a>
          </div>

          {/* Column 2 — Redes Sociales */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.4rem, 0.9vw, 0.8rem)',
          }}>
            <h4 style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(0.55rem, 1vw, 0.85rem)',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 0.4rem 0',
              textTransform: 'uppercase',
            }}>{t('footer.redes')}</h4>
            {socials.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)',
                color: '#FFFFFF',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
              onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
              >{s.name.toUpperCase()}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderTop: '1px solid rgba(233,30,99,0.2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.15em',
        }}>
          © 2025 ALAN AMPUDIA / {t('footer.all_rights')}
        </div>

        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.15em',
        }}>
          <a href="https://www.xant.online" target="_blank" rel="noopener noreferrer" style={{
            color: 'inherit', textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
          >{t('footer.desarrollado')}</a>
        </div>

        <Link to="/legal" style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: '0.85rem',
          color: 'var(--white)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          fontWeight: 700,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--white)'}
      >{t('footer.terminos')}</Link>
      </div>
    </footer>
  );
}
