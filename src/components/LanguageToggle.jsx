import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        background: 'var(--black)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '3px',
        cursor: 'pointer',
        padding: '0.3rem 0.55rem',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.08em',
        color: 'var(--white-dim)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--magenta-bright)';
        e.currentTarget.style.color = 'var(--white)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.color = 'var(--white-dim)';
      }}
    >
      <span style={{
        fontWeight: lang === 'es' ? 700 : 400,
        color: lang === 'es' ? 'var(--magenta-bright)' : 'var(--white-dim)',
        transition: 'all 0.2s',
      }}>MX</span>
      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem' }}>|</span>
      <span style={{
        fontWeight: lang === 'en' ? 700 : 400,
        color: lang === 'en' ? 'var(--magenta-bright)' : 'var(--white-dim)',
        transition: 'all 0.2s',
      }}>US</span>
    </button>
  );
}
