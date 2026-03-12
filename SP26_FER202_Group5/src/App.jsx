import './App.css';
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

          {/* <Route path="/books" element={<BookListPage />} /> */}
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