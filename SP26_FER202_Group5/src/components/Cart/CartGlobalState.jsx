import { createContext, useContext, useState } from 'react';

const CartGlobalState = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm sách vào giỏ - nếu đã có thì cộng thêm số lượng
  const addToCart = (book, quantity = 1) => {
    const existing = cartItems.find((item) => item.id === book.id);
    if (existing) {
      setCartItems(cartItems.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item)));
    } else {
      setCartItems([...cartItems, { ...book, quantity }]);
    }
  };

  // Cập nhật số lượng
  const updateQuantity = (bookId, newQty) => {
    if (newQty <= 0) {
      removeItem(bookId);
      return;
    }
    setCartItems(cartItems.map((item) => (item.id === bookId ? { ...item, quantity: newQty } : item)));
  };

  // Xóa 1 item
  const removeItem = (bookId) => {
    setCartItems(cartItems.filter((item) => item.id !== bookId));
  };

  // Xóa toàn bộ giỏ
  const clearCart = () => setCartItems([]);

  // Tổng số lượng (dùng cho badge ở Header)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Tổng tiền
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  return <CartGlobalState.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, totalItems, totalPrice }}>{children}</CartGlobalState.Provider>;
};

export const useCart = () => useContext(CartGlobalState);
