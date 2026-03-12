import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './auth.css';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      phone,
      role: 'user',
    };

    await axios.post('http://localhost:5000/users', newUser);

    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="login-page">
      {/* LEFT SECTION */}
      <div className="login-left">
        <div className="brand">
          📚 <span>OBSM Books</span>
        </div>

        <img src="\images\book-register.jpg" alt="Library" className="banner-img" />

        <h2>Start your reading journey</h2>

        <p>Join thousands of readers discovering amazing books every day. Create an account to start exploring now.</p>

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
          <h2>Create Account</h2>
          <p>Register to start shopping</p>

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Phone</label>
            <input type="text" placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            
            <label>Password</label>
            <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button className="login-btn">Register</button>
          </form>

          <p className="register-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <div className="divider">or</div>
          <button className="guest-btn">
            <Link to="/">Continue as Guest</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
