import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetailPage from './pages/BookDetailPage';
import AboutPage from './pages/AboutPage';
import NewPage from './pages/NewPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route  path="/news" element={<NewPage/>}/>
          <Route path="/books/:id"element={<BookDetailPage/>}/>
        </Route>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
