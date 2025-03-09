import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import PatternDivider from "@/components/PatternDivider";
import WoodTypeShowcase from "@/components/WoodTypeShowcase";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  // Add smooth scrolling behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId!);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <PatternDivider pattern="primary" />
      <ProductsSection />
      <WoodTypeShowcase />

      <motion.div 
        className="py-12 md:py-20"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2B48C' fill-opacity='0.15'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20zM0 40h20v20H0V40zm40-40h20v20H40V0zm0 40h20v20H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-white rounded-lg p-8 md:p-12 shadow-xl max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ backgroundColor: 'rgba(139, 69, 19, 0.9)' }}
          >
            <div className="text-center">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6">The Spirit of African Craftsmanship</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">Each piece of wood we offer carries with it the rich heritage and distinctive character of the African landscape. Our commitment to quality and sustainability ensures that this legacy continues for generations to come.</p>
              <a 
                href="#contact" 
                className="inline-block font-semibold py-3 px-8 rounded-lg transition duration-300"
                style={{ 
                  backgroundColor: '#D2B48C',
                  color: '#8B4513',
                  '--tw-hover-bg-opacity': 1,
                  '--tw-hover-bg-color': '#BEA078'
                } as React.CSSProperties}
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <GallerySection />
      <PatternDivider pattern="primary" />
      <ContactSection />
    </>
  );
}
