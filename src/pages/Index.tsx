import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RecomendacaoPlanoSection from "@/components/RecomendacaoPlanoSection";
import PlanosSection from "@/components/PlanosSection";
import BeneficiosSection from "@/components/BeneficiosSection";
import ContatoSection from "@/components/ContatoSection";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <RecomendacaoPlanoSection />
      <PlanosSection />
      <BeneficiosSection />
      <ContatoSection />
      <Footer />
    </div>
  );
};

export default Index;
