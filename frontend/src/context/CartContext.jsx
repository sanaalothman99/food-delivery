import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);

  const addToCart = (item, restId) => {
    if (restaurantId && restaurantId !== restId) {
      if (!window.confirm('Adding items from a new restaurant will clear your cart. Continue?')) return;
      setCartItems([]);
    }
    setRestaurantId(restId);
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i._id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) return removeFromCart(itemId);
    setCartItems((prev) => prev.map((i) => i._id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, restaurantId, addToCart,
      removeFromCart, updateQuantity, clearCart,
      totalPrice, totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);