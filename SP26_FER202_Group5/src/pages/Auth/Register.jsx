import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './auth.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role: 'user',
      status: 'Active',
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:5000/users', newUser);

      Swal.fire({
        title: 'Registration Successful!',
        text: 'Your account has been created successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/login');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to register account.',
        icon: 'error',
      });
    }
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
            <h3>1K+</h3>
            <span>Books</span>
          </div>

          <div className="stat">
            <h3>5K+</h3>
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
            <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button className="login-btn">Sign up</button>
          </form>

          <p className="register-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <div className="divider">or</div>
          <button className="guest-btn">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Continue as Guest
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
