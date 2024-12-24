import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await response.json();
      console.log("Fetched cart data:", data);
      setCart(data.cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
