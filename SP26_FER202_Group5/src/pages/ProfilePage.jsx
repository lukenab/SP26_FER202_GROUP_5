import { useState } from 'react';
import './ProfilePage.css';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem('user'));
  });

  if (!user) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>

        <div className="profile-item">
          <span>Name</span>
          <p>{user.name}</p>
        </div>

        <div className="profile-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="profile-item">
          <span>Role</span>
          <p>{user.role}</p>
        </div>
        <button>
          <Link to="/user">Back To user</Link>
        </button>
      </div>
    </div>
  );
}
