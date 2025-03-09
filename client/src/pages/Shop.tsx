import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { woodProducts } from "../data/woodProducts";
import WoodCard from "../components/WoodCard";
import { useCart } from "../context/CartContext";

type Category = "all" | "hardwood" | "softwood" | "zambian" | "african";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Woods" },
    { id: "hardwood", label: "Hardwoods" },
    { id: "softwood", label: "Softwoods" },
    { id: "zambian", label: "Zambian" },
    { id: "african", label: "Other African" }
  ];

  const woodTypeImages = [
    {
      type: "hardwood",
      title: "Hardwoods",
      description: "Dense, durable woods known for their strength and beauty. Perfect for furniture, flooring, and high-end applications.",
      image: "https://images.unsplash.com/photo-1548988007-b5315c7d7d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "softwood",
      title: "Softwoods",
      description: "Lightweight woods typically from coniferous trees, ideal for construction, paper products, and general carpentry.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredProducts = woodProducts.filter(product => {
    if (activeCategory === "all") return true;
    if (activeCategory === "hardwood") return product.type === "hardwood";
    if (activeCategory === "softwood") return product.type === "softwood";
    if (activeCategory === "zambian") return product.category === "zambian";
    if (activeCategory === "african") return product.category === "african";
    return true;
  });

  return (
    <div className="py-24 bg-cream" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <span className="inline-flex items-center text-woodbrown hover:underline mb-4 cursor-pointer" style={{ color: '#8B4513' }}>
              <i className="fas fa-arrow-left mr-2"></i> Back to Home
            </span>
          </Link>
          
          <motion.h1 
            className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: '#8B4513' }}
          >
            Shop Our Collection
          </motion.h1>
          
          <motion.div 
            className="w-32 h-1 mb-6"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 128 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ backgroundColor: '#D2B48C' }}
          ></motion.div>
          
          <motion.p 
            className="text-lg max-w-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our premium selection of African hardwoods and softwoods. Each piece is carefully selected for quality and sustainability.
          </motion.p>
        </div>

        {/* Wood Type Showcase */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {woodTypeImages.map((type, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg relative group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveCategory(type.type as Category)}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
              <img
                src={type.image}
                alt={type.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">{type.title}</h3>
                <p className="text-sm md:text-base">{type.description}</p>
                <button 
                  className="mt-4 py-2 px-6 rounded-full bg-white text-woodbrown font-semibold transition duration-300 hover:bg-opacity-90"
                  style={{ color: '#8B4513' }}
                >
                  View {type.title}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Filtering Options */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Filter By Category</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`py-2 px-6 rounded-full border-2 font-semibold transition duration-300 ${
                  activeCategory === category.id 
                    ? "text-white" 
                    : "text-woodbrown hover:bg-woodbrown hover:text-white"
                }`}
                style={{ 
                  borderColor: '#8B4513',
                  backgroundColor: activeCategory === category.id ? '#8B4513' : 'transparent',
                  color: activeCategory === category.id ? 'white' : '#8B4513'
                }}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <WoodCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <i className="fas fa-search text-4xl mb-4 text-gray-400"></i>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any products matching your selected filters.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="py-2 px-6 rounded font-semibold transition duration-300 text-white"
              style={{ backgroundColor: '#8B4513' }}
            >
              View All Products
            </button>
          </div>
        )}
        
        {/* Call to Action Section */}
        <motion.div 
          className="mt-16 bg-woodbrown text-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: '#8B4513' }}
        >
          <div className="text-center">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-4">Need Custom Wood Products?</h2>
            <p className="mb-6">Contact our team for custom orders, bulk purchasing, or specific wood requirements.</p>
            <Link href="/#contact">
              <span className="inline-block bg-white text-woodbrown font-semibold py-3 px-8 rounded-lg transition duration-300 cursor-pointer" style={{ color: '#8B4513' }}>
                Contact Us
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
