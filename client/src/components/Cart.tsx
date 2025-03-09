import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Link } from 'wouter';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <>
      {/* Cart Button */}
      <div className="relative z-50">
        <button
          onClick={toggleCart}
          className="relative flex items-center justify-center p-2 rounded-full text-white bg-woodbrown hover:bg-opacity-80 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold font-['Playfair_Display']" style={{ color: '#8B4513' }}>Your Cart</h2>
              <button 
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <ShoppingCart size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some beautiful wood products to your cart</p>
                <Button 
                  onClick={toggleCart}
                  style={{ backgroundColor: '#8B4513' }}
                  className="hover:opacity-90"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex border rounded-lg p-4">
                      <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-semibold" style={{ color: '#8B4513' }}>{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">${formatPrice(item.price)} / {item.priceUnit}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 py-1 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-semibold" style={{ color: '#2F4F4F' }}>
                            ${formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total</span>
                    <span style={{ color: '#8B4513' }}>${formatPrice(cartTotal)}</span>
                  </div>
                  <div className="space-y-3">
                    <Link href="/checkout">
                      <Button 
                        className="w-full py-6" 
                        style={{ backgroundColor: '#8B4513' }}
                        onClick={toggleCart}
                      >
                        Checkout
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full text-black"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}