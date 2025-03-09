import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Update year automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const year = new Date().getFullYear();
      if (year !== currentYear) {
        setCurrentYear(year);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [currentYear]);
  
  return (
    <footer className="bg-darkbrown text-white pt-16 pb-8" style={{ backgroundColor: '#3E2723' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="mr-2">
                <i className="fas fa-tree text-2xl" style={{ color: '#D2B48C' }}></i>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold">WOODCON</h3>
            </div>
            <p className="mb-6">Bringing the finest African woods to the world while supporting sustainable forestry and local communities.</p>
            <p style={{ color: '#E6C9A0' }}>
              <i className="fas fa-envelope mr-2"></i> info@woodcon.co.zm
            </p>
            <p style={{ color: '#E6C9A0' }}>
              <i className="fas fa-phone mr-2"></i> +260 123 456 789
            </p>
          </div>
          
          <div>
            <h4 className="font-['Ubuntu'] text-lg font-bold mb-6 border-b pb-2" style={{ borderColor: '#BEA078' }}>Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/#hero" className="hover:text-ochre transition duration-300">Home</a></li>
              <li><a href="/#about" className="hover:text-ochre transition duration-300">About Us</a></li>
              <li><a href="/#products" className="hover:text-ochre transition duration-300">Products</a></li>
              <li><a href="/#gallery" className="hover:text-ochre transition duration-300">Gallery</a></li>
              <li><a href="/#contact" className="hover:text-ochre transition duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-['Ubuntu'] text-lg font-bold mb-6 border-b pb-2" style={{ borderColor: '#BEA078' }}>Wood Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="hover:text-ochre transition duration-300">Hardwoods</Link></li>
              <li><Link href="/shop" className="hover:text-ochre transition duration-300">Softwoods</Link></li>
              <li><Link href="/shop" className="hover:text-ochre transition duration-300">Zambian Woods</Link></li>
              <li><Link href="/shop" className="hover:text-ochre transition duration-300">African Woods</Link></li>
              <li><Link href="/shop" className="hover:text-ochre transition duration-300">Sustainable Options</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm" style={{ borderColor: '#BEA078' }}>
          <p>&copy; {currentYear} WOODCON. All Rights Reserved. Designed by Ori-Studio.</p>
        </div>
      </div>
    </footer>
  );
}
