import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen flex items-center bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold mb-6"
          >
            Discover The Beauty of African Woods
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8"
          >
            Bringing the finest Zambian and African wood products to the world with sustainable practices and exquisite craftsmanship.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#products" 
              className="text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
              style={{ backgroundColor: '#8B4513', '--tw-hover-bg-opacity': 1, '--tw-hover-bg-color': '#5D2906' } as React.CSSProperties}
            >
              Explore Our Collection
            </a>
            <a 
              href="#contact" 
              className="bg-transparent hover:bg-white hover:text-woodbrown text-black font-semibold py-3 px-6 border-2 border-white rounded-lg transition duration-300 text-center"
              style={{ '--tw-hover-text-color': '#8B4513' } as React.CSSProperties}
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
