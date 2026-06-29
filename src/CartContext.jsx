import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "6949269c5f3f77a44004b77f";

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    await axios.post(`http://localhost:5001/api/cart/${userId}`, {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    fetchCart(); // This re-fetches the data after adding, syncing the UI!
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};