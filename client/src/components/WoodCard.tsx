import { motion } from "framer-motion";
import { Link } from "wouter";
import { WoodProduct } from "../types";

interface WoodCardProps {
  product: WoodProduct;
  index: number;
}

export default function WoodCard({ product, index }: WoodCardProps) {
  const {
    name,
    origin,
    description,
    price,
    priceUnit,
    type,
    image
  } = product;

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 bg-white group"
      data-category={`${type} ${product.category}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-64">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div 
          className="absolute top-4 right-4 text-white py-1 px-3 rounded-full text-sm font-semibold"
          style={{ 
            backgroundColor: type === "hardwood" ? '#8B4513' : '#2F4F4F'
          }}
        >
          {type === "hardwood" ? "Hardwood" : "Softwood"}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-['Playfair_Display'] text-xl font-bold mb-2" style={{ color: '#8B4513' }}>{name}</h3>
        <p className="text-sm text-gray-600 mb-2"><i className="fas fa-map-marker-alt mr-1"></i> {origin}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-semibold" style={{ color: '#2F4F4F' }}>${price.toFixed(2)} / {priceUnit}</span>
          <Link href="/shop">
            <span 
              className="text-white py-2 px-4 rounded transition duration-300 cursor-pointer inline-block"
              style={{ 
                backgroundColor: '#8B4513',
                '--tw-hover-bg-opacity': 1,
                '--tw-hover-bg-color': '#5D2906'
              } as React.CSSProperties}
            >
              Purchase
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
