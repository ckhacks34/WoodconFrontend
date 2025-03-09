import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally send the data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We will get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    { icon: "fa-map-marker-alt", title: "Our Location", content: "15 Timber Avenue, Lusaka, Zambia" },
    { icon: "fa-phone-alt", title: "Phone", content: "+260 123 456 789" },
    { icon: "fa-envelope", title: "Email", content: "info@woodcon.co.zm" },
    { icon: "fa-clock", title: "Hours", content: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM" }
  ];

  const socialLinks = [
    { icon: "fa-facebook-f", href: "#" },
    { icon: "fa-instagram", href: "#" },
    { icon: "fa-twitter", href: "#" },
    { icon: "fa-linkedin-in", href: "#" }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-6" style={{ color: '#8B4513' }}>
              Get In Touch
            </h2>
            <div className="w-20 h-1 mb-6" style={{ backgroundColor: '#D2B48C' }}></div>
            <p className="text-gray-700 mb-8">
              Whether you're interested in our wood products, require a custom order, or simply want to learn more about African woods, we're here to assist you.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="rounded-full p-3 mr-4 text-white" style={{ backgroundColor: '#8B4513' }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-white p-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  style={{ backgroundColor: '#8B4513' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5D2906'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8B4513'}
                >
                  <i className={`fab ${link.icon}`}></i>
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-cream p-8 rounded-lg shadow-md" style={{ backgroundColor: '#F5F5DC' }}>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-6" style={{ color: '#8B4513' }}>
                Send Us a Message
              </h3>
              
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-woodbrown" 
                    placeholder="John Doe" 
                    required
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-woodbrown" 
                    placeholder="john@example.com" 
                    required
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-woodbrown" 
                    placeholder="Inquiry about product"
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-woodbrown" 
                    placeholder="How can we help you?" 
                    required
                    style={{ '--tw-ring-color': '#8B4513' } as React.CSSProperties}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 flex justify-center items-center hover:shadow-lg hover:scale-[1.01]"
                  style={{ backgroundColor: '#8B4513' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5D2906'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8B4513'}
                >
                  Send Message <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
