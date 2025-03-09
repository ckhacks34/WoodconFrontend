import { motion } from "framer-motion";

export default function AboutSection() {
  const features = [
    { icon: "fa-leaf", text: "Sustainable Sourcing" },
    { icon: "fa-certificate", text: "Premium Quality" },
    { icon: "fa-handshake", text: "Fair Trade" },
    { icon: "fa-shipping-fast", text: "Global Shipping" }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-cream" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1567071023244-4b8e4aa4a517?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="African Wood Craftsman" 
              className="rounded-lg shadow-xl object-cover w-full h-96"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-lg">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6" style={{ color: '#8B4513' }}>
                About <span style={{ color: '#2F4F4F' }}>WOODCON</span>
              </h2>
              <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#D2B48C' }}></div>
              
              <p className="mb-4">WOODCON is a premier African wood supplier, specializing in sustainably sourced hardwoods and softwoods from Zambia and across the African continent.</p>
              <p className="mb-4">Our mission is to showcase the exceptional quality and unique character of African timber while supporting local communities and ensuring responsible forestry practices.</p>
              <p className="mb-8">With generations of experience in timber selection and processing, we provide only the finest wood products that capture the authentic spirit and natural beauty of Africa.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <i className={`fas ${feature.icon} mr-3 text-xl`} style={{ color: '#2F4F4F' }}></i>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
