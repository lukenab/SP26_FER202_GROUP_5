import { Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login to OBSM</h2>

        <form className="auth-form">
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

          <button className="auth-btn">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}