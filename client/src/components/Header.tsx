import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/#hero", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/#products", label: "Our Woods" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#contact", label: "Contact" },
    { href: "/shop", label: "Shop" }
  ];

  return (
    <header className={`sticky top-0 z-50 bg-woodbrown text-white shadow-md transition-all duration-300 ${
      isScrolled ? "py-2" : "py-4"
    }`} style={{ backgroundColor: '#8B4513' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <i className="fas fa-tree text-2xl" style={{ color: '#E6C9A0' }}></i>
            </div>
            <Link href="/">
              <a className="font-['Playfair_Display'] text-xl md:text-2xl font-bold">WOODCON</a>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
          
          {/* Desktop Navigation - now always visible on desktop */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.href.startsWith("/shop") ? (
                <Link key={item.label} href={item.href}>
                  <a 
                    className="hover:text-ochre transition duration-300"
                    style={{ '--tw-hover-text-opacity': 1, '--tw-hover-text-color': '#D2B48C' } as React.CSSProperties}
                  >
                    {item.label}
                  </a>
                </Link>
              ) : (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="hover:text-ochre transition duration-300"
                  style={{ '--tw-hover-text-opacity': 1, '--tw-hover-text-color': '#D2B48C' } as React.CSSProperties}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <nav className="flex flex-col space-y-3 mt-4">
                {navItems.map((item) => (
                  item.href.startsWith("/shop") ? (
                    <Link key={item.label} href={item.href}>
                      <a 
                        className="hover:text-ochre transition duration-300"
                        style={{ '--tw-hover-text-opacity': 1, '--tw-hover-text-color': '#D2B48C' } as React.CSSProperties}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ) : (
                    <a 
                      key={item.label}
                      href={item.href} 
                      className="hover:text-ochre transition duration-300"
                      style={{ '--tw-hover-text-opacity': 1, '--tw-hover-text-color': '#D2B48C' } as React.CSSProperties}
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
