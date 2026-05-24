import Hero from '../components/Hero';
import PerfilReveal from '../components/PerfilReveal';
import ProximaCarrera from '../components/ProximaCarrera';
import MensajePersonal from '../components/MensajePersonal';
import GaleriaNarrativa from '../components/GaleriaNarrativa';
import PistaSection from '../components/PistaSection';
import HallOfTrucks from '../components/HallOfTrucks';
import Logros from '../components/Logros';
import ElEquipo from '../components/ElEquipo';
import ProductosDestacados from '../components/ProductosDestacados';
import Patrocinadores from '../components/Patrocinadores';
import SocialFeed from '../components/SocialFeed';

export default function Home() {
  return (
    <>
      <Hero />
      <PerfilReveal />
      <ProximaCarrera />
      <MensajePersonal />
      <GaleriaNarrativa />
      <PistaSection />
      <HallOfTrucks />
      <Logros />
      <ElEquipo />
      <ProductosDestacados />
      <Patrocinadores />
      <SocialFeed />
    </>
  );
}
