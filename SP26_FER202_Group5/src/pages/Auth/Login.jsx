import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './auth.css';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.get('http://localhost:5000/users');
    const users = res.data;

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login to OBSM</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button className="auth-btn">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
