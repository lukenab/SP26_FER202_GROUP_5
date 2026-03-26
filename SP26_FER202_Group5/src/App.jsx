import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Context/Cart/CartGlobalState';
import Layout from './components/Layout';

import HomePage from './pages/Home/HomePage';
import BookListPage from './pages/Books/BookListPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BookDetailPage from './pages/Books/BookDetailPage';
import AboutPage from './pages/Home/AboutPage';
import NewPage from './pages/Home/NewPage';
import BookByCategory from './components/UI/BookByCategory';

import CartPage from './components/Context/Cart/CartPage';
import AdminRoute from './pages/Routes/AdminRoute';
import ProtectedRoute from './pages/Routes/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './components/Layout/AdminLayout/AdminLayout';
import BookManagement from './pages/Admin/BookManagement';
import CheckoutPage from './pages/CheckoutPage';
import OrderManagement from './pages/Admin/OrderManagement';
import UserManagement from './pages/Admin/UserManagement';
import AdminCategoryPage from './pages/Admin/AdminCategoryPage';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Fix #3: ép kiểu Number để so sánh đúng (localStorage trả về string)
function checkSession() {
  const expireTime = localStorage.getItem('expireTime');

  if (expireTime && Date.now() > Number(expireTime)) {
    localStorage.removeItem('user');
    localStorage.removeItem('expireTime');

    alert('Session expired. Please login again.');
    window.location.href = '/login';
  }
}

function App() {
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/category/:id" element={<BookByCategory />} />

            {/* Fix #1: /cart không cần đăng nhập - guest được vào xem giỏ hàng */}
            <Route path="/cart" element={<CartPage />} />

            {/* /orders vẫn cần đăng nhập */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="books" element={<BookManagement />} />
            <Route path="categories" element={<AdminCategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
