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
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', color: '#fff', background: '#0a0a0a', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#e91e63' }}>Error: {this.state.error.message}</h2>
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
            <Route path="/" element={<ErrorBoundary key="home"><Home /></ErrorBoundary>} />
            <Route path="/en-pista" element={<ErrorBoundary key="enpista"><EnPista /></ErrorBoundary>} />
            <Route path="/fuera-de-pista" element={<ErrorBoundary key="fuera"><FueraDePista /></ErrorBoundary>} />
            <Route path="/calendario" element={<ErrorBoundary key="cal"><Calendario /></ErrorBoundary>} />
            <Route path="/equipo" element={<ErrorBoundary key="equipo"><Equipo /></ErrorBoundary>} />
            <Route path="/tienda" element={<ErrorBoundary key="tienda"><Tienda /></ErrorBoundary>} />
            <Route path="/legal" element={<ErrorBoundary key="legal"><Legal /></ErrorBoundary>} />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
