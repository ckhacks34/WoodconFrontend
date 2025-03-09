import { motion } from "framer-motion";

interface WoodType {
  name: string;
  description: string;
  image: string;
  type: "hardwood" | "softwood";
}

export default function WoodTypeShowcase() {
  const woodTypes: WoodType[] = [
    {
      name: "African Teak",
      description: "A premium hardwood known for its exceptional durability and rich golden-brown color. Perfect for outdoor furniture and decking.",
      image: "https://images.unsplash.com/photo-1566895291219-ea363c06efec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "hardwood"
    },
    {
      name: "African Blackwood",
      description: "One of the hardest and most valuable woods in the world. Ideal for fine furniture, musical instruments, and decorative items.",
      image: "https://images.unsplash.com/photo-1579465220777-69f97228a1fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "hardwood"
    },
    {
      name: "Mukwa",
      description: "Also known as Kiaat, this reddish-brown hardwood is prized for its grain pattern and workability. Excellent for furniture and cabinetry.",
      image: "https://images.unsplash.com/photo-1580743324934-70b59f467b37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "hardwood"
    },
    {
      name: "African Pine",
      description: "Versatile softwood with a straight grain and medium texture. Commonly used for construction, furniture, and general carpentry.",
      image: "https://images.unsplash.com/photo-1578986129985-ae656fd0ce19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "softwood"
    },
    {
      name: "Zambian Cedar",
      description: "Aromatic softwood with natural pest resistance. Ideal for closet linings, chests, outdoor structures, and decorative elements.",
      image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "softwood"
    },
    {
      name: "African Mahogany",
      description: "Reddish-brown hardwood with interlocking grain. Excellent for high-end furniture, cabinetry, boat building, and decorative veneers.",
      image: "https://images.unsplash.com/photo-1549175801-c7deb87cb264?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      type: "hardwood"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-cream" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6" style={{ color: '#8B4513' }}>
            Explore Our Wood Types
          </h2>
          <div className="w-20 h-1 bg-ochre mx-auto mb-6" style={{ backgroundColor: '#D2B48C' }}></div>
          <p className="text-gray-700">
            Discover the unique characteristics and uses of our premium African woods.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {woodTypes.map((wood, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-52">
                <img 
                  src={wood.image} 
                  alt={wood.name} 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 py-2 px-4 text-white text-sm font-semibold"
                  style={{ 
                    backgroundColor: wood.type === "hardwood" ? 'rgba(139, 69, 19, 0.85)' : 'rgba(47, 79, 79, 0.85)' 
                  }}
                >
                  {wood.type === "hardwood" ? "Hardwood" : "Softwood"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-bold mb-3" style={{ color: '#8B4513' }}>
                  {wood.name}
                </h3>
                <p className="text-gray-700">
                  {wood.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}