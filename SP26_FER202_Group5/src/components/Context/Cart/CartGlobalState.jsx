import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext(null);

const API = 'http://localhost:5000/carts';

// Lấy user hiện tại từ localStorage
const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartRecord, setCartRecord] = useState(null); // record trong db.json
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  // Khi user thay đổi → load giỏ hàng từ db.json
  useEffect(() => {
    if (currentUser) {
      fetchCart(currentUser.id);
    } else {
      setCartItems([]);
      setCartRecord(null);
    }
  }, [currentUser]);

  // Load giỏ hàng của user từ db.json
  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`${API}?userId=${userId}`);
      if (res.data.length > 0) {
        setCartRecord(res.data[0]);
        setCartItems(res.data[0].items || []);
      } else {
        setCartRecord(null);
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    }
  };

  // Lưu giỏ hàng lên db.json (POST nếu chưa có, PUT nếu đã có)
  const saveCart = async (userId, items, record) => {
    try {
      if (record) {
        await axios.put(`${API}/${record.id}`, { userId, items });
      } else {
        const res = await axios.post(API, { userId, items });
        setCartRecord(res.data);
      }
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  };

  // Hàm gọi sau mỗi thay đổi cartItems
  const updateCartState = (newItems) => {
    setCartItems(newItems);
    if (currentUser) {
      saveCart(currentUser.id, newItems, cartRecord);
    }
  };

  // Hàm để Login gọi sau khi đăng nhập
  const syncUser = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
  };

  // Thêm sách vào giỏ - chỉ cho phép khi đã đăng nhập
  const addToCart = (book, quantity = 1) => {
    if (!currentUser) return false;

    const existing = cartItems.find((item) => item.id === book.id);
    let newItems;
    if (existing) {
      newItems = cartItems.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      newItems = [...cartItems, { ...book, quantity }];
    }
    updateCartState(newItems);
    return true;
  };

  // Cập nhật số lượng
  const updateQuantity = (bookId, newQty) => {
    if (newQty <= 0) {
      removeItem(bookId);
      return;
    }
    const newItems = cartItems.map((item) => (item.id === bookId ? { ...item, quantity: newQty } : item));
    updateCartState(newItems);
  };

  // Xóa 1 item
  const removeItem = (bookId) => {
    const newItems = cartItems.filter((item) => item.id !== bookId);
    updateCartState(newItems);
  };

  // Xóa toàn bộ giỏ
  const clearCart = () => {
    updateCartState([]);
  };

  // Tổng số lượng (dùng cho badge ở Header)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Tổng tiền
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        currentUser,
        syncUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
