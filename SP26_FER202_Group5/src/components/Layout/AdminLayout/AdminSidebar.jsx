import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiBook, FiShoppingCart, FiSettings, FiUser } from 'react-icons/fi';
import { BiCategory } from "react-icons/bi";
import './AdminLayout.css';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid /> },
    { title: 'User Management', path: '/admin/users', icon: <FiUsers /> },
    { title: 'Books Management', path: '/admin/books', icon: <FiBook /> },
    { title: 'Orders & Finance', path: '/admin/orders', icon: <FiShoppingCart /> },
    { title: 'Categories', path: '/admin/categories', icon: <BiCategory /> },
    // { title: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
    // { title: 'Profile', path: '/admin/profile', icon: <FiUser /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand fw-bold">
        <FiBook className="me-2 fs-3 logo-book" />
        OBSM 
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.path} 
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;