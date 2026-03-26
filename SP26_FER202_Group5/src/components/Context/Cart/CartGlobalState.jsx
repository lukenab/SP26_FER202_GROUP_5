import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext(null);

const API = 'http://localhost:5000/carts';

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

// Guest cart dùng localStorage
const GUEST_CART_KEY = 'guest_cart';

const getGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartRecord, setCartRecord] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  // Khi user thay đổi → load giỏ hàng phù hợp
  useEffect(() => {
    if (currentUser) {
      fetchCart(currentUser.id);
    } else {
      // Guest: load từ localStorage
      setCartItems(getGuestCart());
      setCartRecord(null);
    }
  }, [currentUser]);

  // Load giỏ hàng của user đã đăng nhập từ db.json
  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`${API}?userId=${userId}`);
      if (res.data.length > 0) {
        setCartRecord(res.data[0]);

        // Merge guest cart vào user cart nếu có
        const guestItems = getGuestCart();
        let mergedItems = res.data[0].items || [];

        if (guestItems.length > 0) {
          guestItems.forEach((guestItem) => {
            const existing = mergedItems.find((i) => i.id === guestItem.id);
            if (existing) {
              mergedItems = mergedItems.map((i) => (i.id === guestItem.id ? { ...i, quantity: i.quantity + guestItem.quantity } : i));
            } else {
              mergedItems = [...mergedItems, guestItem];
            }
          });
          // Xóa guest cart sau khi merge
          localStorage.removeItem(GUEST_CART_KEY);
          saveCart(userId, mergedItems, res.data[0]);
        }

        setCartItems(mergedItems);
      } else {
        // User chưa có cart trong db → merge guest cart nếu có
        const guestItems = getGuestCart();
        setCartRecord(null);
        setCartItems(guestItems);
        if (guestItems.length > 0) {
          localStorage.removeItem(GUEST_CART_KEY);
          saveCart(userId, guestItems, null);
        }
      }
    } catch {
      setCartItems(getGuestCart());
    }
  };

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

  const updateCartState = (newItems) => {
    setCartItems(newItems);
    if (currentUser) {
      saveCart(currentUser.id, newItems, cartRecord);
    } else {
      // Guest: lưu vào localStorage
      saveGuestCart(newItems);
    }
  };

  const syncUser = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
  };

  // Thêm sách vào giỏ - KHÔNG cần đăng nhập
  const addToCart = (book, quantity = 1) => {
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

  const updateQuantity = (bookId, newQty) => {
    if (newQty <= 0) {
      removeItem(bookId);
      return;
    }
    const newItems = cartItems.map((item) => (item.id === bookId ? { ...item, quantity: newQty } : item));
    updateCartState(newItems);
  };

  const removeItem = (bookId) => {
    const newItems = cartItems.filter((item) => item.id !== bookId);
    updateCartState(newItems);
  };

  const clearCart = () => {
    updateCartState([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
