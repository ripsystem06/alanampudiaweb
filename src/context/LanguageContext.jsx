import { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);

const LANGS = ['en', 'es'];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('alan-lang') || 'en'; }
    catch { return 'en'; }
  });

  const t = useCallback((key, fallback) => {
    return translations[lang]?.[key] ?? fallback ?? key;
  }, [lang]);

  const setLanguage = useCallback((l) => {
    if (!LANGS.includes(l)) return;
    setLang(l);
    try { localStorage.setItem('alan-lang', l); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLanguage(lang === 'es' ? 'en' : 'es');
  }, [lang, setLanguage]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
