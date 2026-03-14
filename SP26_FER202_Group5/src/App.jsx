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

import CartPage from './components/Context/Cart/CartPage';
import AdminRoute from './pages/Routes/AdminRoute';
import ProtectedRoute from './pages/Routes/ProtectedRoute';
import AdminPage from './pages/Admin/AdminPage';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './components/Layout/AdminLayout/AdminLayout';

function App() {

  // Ham kiem tra session khi app load
  function checkSession() {
    const expireTime = localStorage.getItem('expireTime');

    if (expireTime && Date.now() > expireTime) {
      localStorage.removeItem('user');
      localStorage.removeItem('expireTime');

      alert('Session expired. Please login again.');
      window.location.href = '/login';
    }
  }
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

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
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
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
