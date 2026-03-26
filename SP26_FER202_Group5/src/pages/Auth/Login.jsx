import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useCart } from '../../components/Context/Cart/CartGlobalState';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { syncUser } = useCart();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.get('http://localhost:5000/users');
    const users = res.data;

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));

      // Fix #4: set expireTime đúng cách (24 giờ)
      const expireTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('expireTime', String(expireTime));

      // Đồng bộ lại user trong CartGlobalState → tự động load giỏ hàng đã lưu
      syncUser();

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/books');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SECTION */}
      <div className="login-left">
        <div className="brand">
          📚 <span>OBSM Books</span>
        </div>

        <img src="\images\book_login.jpg" alt="Library" className="banner-img" />

        <h2>Discover the world of knowledge</h2>

        <p>Thousands of quality books are waiting for you to explore. Log in to enjoy a great shopping experience and exclusive offers.</p>

        <div className="stats">
          <div className="stat">
            <h3>8K+</h3>
            <span>Books</span>
          </div>

          <div className="stat">
            <h3>50K+</h3>
            <span>Customers</span>
          </div>

          <div className="stat">
            <h3>4.8★</h3>
            <span>Ratings</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p>Sign in to continue shopping</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button className="login-btn">Sign In</button>
          </form>

          <p className="register-text">
            Don't have an account? <Link to="/register">Sign up now</Link>
          </p>

          <div className="divider">or</div>

          {/* Fix #5: dùng Link trực tiếp thay vì lồng Link trong button */}
          <Link to="/" className="guest-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}
