import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogoIntro from './components/LogoIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnPista from './pages/EnPista';
import FueraDePista from './pages/FueraDePista';
import Calendario from './pages/Calendario';
import Equipo from './pages/Equipo';
import Tienda from './pages/Tienda';

function App() {
  return (
    <BrowserRouter>
      <LogoIntro />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en-pista" element={<EnPista />} />
        <Route path="/fuera-de-pista" element={<FueraDePista />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/tienda" element={<Tienda />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
