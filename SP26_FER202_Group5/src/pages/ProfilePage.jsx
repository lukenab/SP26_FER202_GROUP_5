import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import Header from '../components/Layout/Header/Header';
import NavBar from '../components/Layout/Navbar/NavBar';
import Swal from 'sweetalert2';

export default function ProfilePage() {
  const [formData, setFormData] = useState(() => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });

  if (!formData) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const updatedUser = await response.json();

    localStorage.setItem('user', JSON.stringify(updatedUser));

    Swal.fire({
      title: 'Profile Updated!',
      text: 'Your profile has been updated successfully.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);

    Swal.fire({
      title: 'Error!',
      text: 'Update failed!',
      icon: 'error',
    });
  }
};

  return (
    <>
      <Header />
      <NavBar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">{formData.name?.charAt(0).toUpperCase()}</div>

            <div>
              <h3>{formData.name || 'Unknown User'}</h3>
              <p>{formData.email || 'No email'}</p>
            </div>
          </div>

          <div className="profile-body">
            <div className="profile-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
            </div>

            <div className="profile-group">
              <label>Email</label>
              <input type="text" value={formData.email || ''} readOnly />
            </div>

            <div className="profile-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
            </div>

            <div className="profile-group">
              <label>Address</label>
              <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
            </div>

            <div className="profile-group">
              <label>Date of Birth</label>
              <input type="date" name="birthday" value={formData.birthday || ''} onChange={handleChange} />
            </div>

            <div className="profile-actions">
              <Link to="/books" className="btn-back">
                ← Back to Home
              </Link>

              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
