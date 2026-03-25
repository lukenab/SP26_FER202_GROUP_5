import React, { useEffect, useState } from 'react';
import { updateUser } from '../../service/api';
import './CreateUserModal.css';
import Swal from 'sweetalert2';

const EditUserModal = ({ isOpen, onClose, user, onUpdated }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(user.id, form);

      Swal.fire({
        title: 'User Updated!',
        text: `${form.name} has been updated successfully.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      onUpdated();
      onClose();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update user.',
        icon: 'error',
      });
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Edit User</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name || ''} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} />

          <label>Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} />

          <label>Role</label>
          <select name="role" value={form.role || 'user'} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <label>Status</label>
          <select name="status" value={form.status || 'Active'} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="create-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
