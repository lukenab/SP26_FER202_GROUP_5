import { Link } from "react-router-dom";
import "./auth.css";

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form className="auth-form">

          <input
            type="text"
            placeholder="Full Name"
            className="auth-input"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            required
          />

          <button className="auth-btn">
            Register
          </button>

        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}