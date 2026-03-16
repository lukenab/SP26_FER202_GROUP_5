import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from "./pages/CategoryPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/categories/:id" element={<CategoryPage />} />

          <Route path="/admin/categories" element={<AdminCategoryPage />} />
        </Route>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
