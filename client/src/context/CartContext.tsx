import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WoodProduct } from '../types';
import { useToast } from '@/hooks/use-toast';

// Define the cart item type which extends WoodProduct and adds quantity
export interface CartItem extends WoodProduct {
  quantity: number;
}

// Define the cart context interface
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: WoodProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

// Create the cart context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider props
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Update localStorage and calculate totals whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate cart count and total
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (product: WoodProduct, quantity: number = 1) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated to ${updatedCart[existingItemIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Item doesn't exist, add it
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const updatedCart = prev.filter(item => item.id !== productId);
      const removedItem = prev.find(item => item.id === productId);
      
      if (removedItem) {
        toast({
          title: "Removed from cart",
          description: `${removedItem.name} removed from your cart`,
        });
      }
      
      return updatedCart;
    });
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => {
      const updatedCart = prev.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      );
      
      const updatedItem = updatedCart.find(item => item.id === productId);
      
      if (updatedItem) {
        toast({
          title: "Cart updated",
          description: `${updatedItem.name} quantity updated to ${quantity}`,
        });
      }
      
      return updatedCart;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items removed from your cart",
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};