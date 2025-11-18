import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [saveForLater, setSaveForLater] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedSaved = JSON.parse(localStorage.getItem("saveForLater") || "[]");
    setCart(storedCart);
    setSaveForLater(storedSaved);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("saveForLater", JSON.stringify(saveForLater));
  }, [cart, saveForLater]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // 👇 NEW: Move to Save For Later
  const moveToSaveForLater = (id) => {
    const item = cart.find((p) => p._id === id);
    if (item) {
      setSaveForLater([...saveForLater, item]);
      setCart(cart.filter((p) => p._id !== id));
    }
  };

  // 👇 NEW: Move back to Cart
  const moveToCart = (id) => {
    const item = saveForLater.find((p) => p._id === id);
    if (item) {
      setCart([...cart, item]);
      setSaveForLater(saveForLater.filter((p) => p._id !== id));
    }
  };

  // ✅ Add this function
  const removeFromSaveForLater = (id) => {
    setSaveForLater(saveForLater.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        saveForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        moveToSaveForLater,
        moveToCart,
        removeFromSaveForLater
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
