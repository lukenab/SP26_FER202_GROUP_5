import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser } from '../../service/api';
import './UserManagement.css';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= DELETE USER =================
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `This will deactivate the user ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Deactivate',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await updateUser(id, {
          status: 'Inactive',
        });

        await fetchUsers();

        Swal.fire({
          title: 'User Deactivated!',
          text: `${name} is now inactive.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to deactivate user.',
          icon: 'error',
        });
      }
    }
  };

  // ================= SEARCH =================
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>User Management</h2>

        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search users by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <span className={`role-badge ${u.role}`}>{u.role}</span>
                </td>

                <td>
                  <span className={u.status === 'Inactive' ? 'status inactive' : 'status active'}>
                    {u.status || 'Active'}
                  </span>
                </td>

                <td>{u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '-'}</td>

                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditUser(u);
                      setShowEditModal(true);
                    }}
                  >
                    <FiEdit />
                  </button>

                  <button className="delete-btn" onClick={() => handleDelete(u.id, u.name)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={fetchUsers}
        existingUsers={users}
      />

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={editUser}
        onUpdated={fetchUsers}
      />
    </div>
  );
};

export default UserManagement;