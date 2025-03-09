import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import WoodCard from "./WoodCard";
import { woodProducts } from "../data/woodProducts";

type Category = "all" | "hardwood" | "softwood" | "zambian" | "african";

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Woods" },
    { id: "hardwood", label: "Hardwoods" },
    { id: "softwood", label: "Softwoods" },
    { id: "zambian", label: "Zambian" },
    { id: "african", label: "Other African" }
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
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6" style={{ color: '#8B4513' }}>
            Our Premium Wood Collection
          </h2>
          <div className="w-20 h-1 bg-ochre mx-auto mb-6" style={{ backgroundColor: '#D2B48C' }}></div>
          <p className="text-gray-700">
            Discover our extensive selection of carefully curated African woods, perfect for furniture, flooring, construction, and artisan crafts.
          </p>
        </motion.div>
        
        {/* Wood Categories Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
        
        {/* Wood Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <WoodCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/shop">
            <span 
              className="inline-block text-white font-semibold py-3 px-8 rounded-lg transition duration-300 cursor-pointer"
              style={{ 
                backgroundColor: '#2F4F4F',
                '--tw-hover-bg-opacity': 1,
                '--tw-hover-bg-color': '#1F3333'
              } as React.CSSProperties}
            >
              View All Products <i className="fas fa-arrow-right ml-2"></i>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
