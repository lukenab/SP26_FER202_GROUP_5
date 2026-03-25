import React, { useState } from 'react';
import { createUser } from '../../service/api';
import './CreateUserModal.css';
import Swal from 'sweetalert2';
const CreateUserModal = ({ isOpen, onClose, onCreated, existingUsers }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existed = existingUsers?.find((u) => u.email === form.email);

    if (existed) {
      Swal.fire({
        title: 'Email already exists!',
        text: 'Please use another email address.',
        icon: 'warning',
      });
      return;
    }

    const payload = {
      ...form,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      await createUser(payload);

      Swal.fire({
        title: 'User Created!',
        text: `${form.name} has been created successfully.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      onCreated?.();
      onClose();

      setForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create user.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Create New User</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter user name" value={form.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter email address" value={form.email} onChange={handleChange} required />

          <label>Phone</label>
          <input type="text" name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" value={form.password} onChange={handleChange} required />

          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="create-btn">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
