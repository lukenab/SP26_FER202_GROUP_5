import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartGlobalState';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './components/Cart/CartPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
