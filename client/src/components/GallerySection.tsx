import { motion } from "framer-motion";

export default function GallerySection() {
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1601389450886-2c77799aaa8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", alt: "African wood furniture", className: "" },
    { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", alt: "Wooden bowls", className: "" },
    { src: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", alt: "Wood flooring", className: "" },
    { src: "https://images.unsplash.com/photo-1602067440243-e9dbbc8f5bee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", alt: "Wood processing", className: "" },
    { src: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", alt: "Showcase furniture piece", className: "md:col-span-2 row-span-2" },
    { src: "https://images.unsplash.com/photo-1579462501775-e349e59836a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", alt: "Wooden sculpture", className: "" },
    { src: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", alt: "Wooden table", className: "" }
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6" style={{ color: '#8B4513' }}>
            Our Gallery
          </h2>
          <div className="w-20 h-1 bg-ochre mx-auto mb-6" style={{ backgroundColor: '#D2B48C' }}></div>
          <p className="text-gray-700">
            Explore the beauty and versatility of our African woods through finished projects and raw materials.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index}
              className={`gallery-item overflow-hidden rounded-lg shadow-md cursor-pointer group ${image.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition duration-500 transform group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
