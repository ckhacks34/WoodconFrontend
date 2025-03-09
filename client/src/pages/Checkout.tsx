import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Redirect to home if cart is empty
    if (cartItems.length === 0) {
      setLocation('/');
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
        variant: "destructive",
      });
    }
  }, [cartItems, setLocation, toast]);

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your order! We'll process it shortly.",
      });
      clearCart();
      setLocation('/');
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-8 text-center" 
        style={{ color: '#8B4513' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Checkout Form */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="john.doe@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required placeholder="+1 (123) 456-7890" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" required placeholder="123 Main St" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" required placeholder="New York" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" required placeholder="NY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Zip/Postal Code</Label>
                <Input id="zip" required placeholder="10001" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea id="notes" placeholder="Special instructions for delivery" />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isProcessing || cartItems.length === 0}
              style={{ backgroundColor: '#8B4513' }}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md h-fit"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="py-4 flex">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium" style={{ color: '#8B4513' }}>
                      {item.name}
                    </h4>
                    <p className="text-sm font-medium text-gray-900">
                      ${formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.quantity} x ${formatPrice(item.price)} / {item.priceUnit}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm font-medium">${formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="text-sm text-gray-600">Calculated at next step</span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="text-base font-semibold">Total</span>
              <span className="text-base font-semibold" style={{ color: '#8B4513' }}>
                ${formatPrice(cartTotal)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}