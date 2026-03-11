import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './auth.css';
import axios from 'axios';

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
    };

    await axios.post('http://localhost:5000/users', newUser);

    alert('Register success!');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" className="auth-input" value={name} onChange={(e) => setName(e.target.value)} required />

          <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button className="auth-btn">Register</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
