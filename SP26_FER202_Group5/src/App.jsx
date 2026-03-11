import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Context/Cart/CartGlobalState';
import Layout from './components/Layout';
 HEAD
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetailPage from './pages/BookDetailPage';
import AboutPage from './pages/AboutPage';
import NewPage from './pages/NewPage';
import CartPage from './components/Cart/CartPage';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';

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
>>>>>>> e4a9603d748d486f9f8c84dacf9c39bd91f656e8

function App() {
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
          <Route path="/user" element={<UserPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
