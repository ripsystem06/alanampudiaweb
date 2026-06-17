import React, { useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LogoIntro from './components/LogoIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnPista from './pages/EnPista';
import FueraDePista from './pages/FueraDePista';
import Calendario from './pages/Calendario';
import Equipo from './pages/Equipo';
import Tienda from './pages/Tienda';
import Legal from './pages/Legal';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#111', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ color: '#e91e63' }}>⚠ Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#ccc' }}>
            {this.state.error?.message}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function scrollToTop() {
  // scrollTop directo → elude CSS scroll-behavior: smooth
  // (behavior: 'instant' no es estándar y falla en algunos browsers)
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();

    // RAF: después del primer paint (absorbe layout shifts tempranos)
    const raf = requestAnimationFrame(scrollToTop);

    // Timers progresivos para contenido que carga tarde (imágenes, GSAP)
    const t100 = setTimeout(scrollToTop, 100);
    const t300 = setTimeout(scrollToTop, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t100);
      clearTimeout(t300);
    };
  }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <LogoIntro />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/en-pista" element={<EnPista />} />
            <Route path="/fuera-de-pista" element={<FueraDePista />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
