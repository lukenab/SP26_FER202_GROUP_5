import React from 'react'
import { FormControl, FormGroup, Navbar, Nav, Form, Container, Dropdown } from 'react-bootstrap'
import {FiMenu, FiSearch, FiUser, FiSettings, FiLogOut} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user')) || {name: 'Admin', email: '@obsm.com'}

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

  return (
    <header className="admin-navbar">
        <div className='d-flex align-items-center'>
            <FiMenu className='fs-4 me-3 text-secondary' style={{cursor: 'pointer'}}/>

            {/* <div className='search-wrapper d-none d-md-block'>
                <FiSearch className='search-icon'/>
                <input type="text" placeholder='Search...' />
            </div> */}
        </div>

        <Dropdown align="end">
          <Dropdown.Toggle variant="transparent" id="dropdown-custom-components" className='hide-arrow'>
            <div className="text-end me-2 d-none d-md-block">
              <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{user.name}</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>{user.email}</div>
            </div>
            <img src="https://ui-avatars.com/api/?name=Admin&background=1e3d52&color=fff" alt="avatar" className="user-avatar"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow mt-2 border-0 p-2" style={{ width: '220px', borderRadius: '8px' }}>
            <div className="px-3 py-2 border-bottom mb-2">
              <div className="fw-bold">{user.name}</div>
              <div className="text-muted small">{user.email}</div>
            </div>
            
            <Dropdown.Item href="#/profile" className="py-2">
                <FiUser className="me-2" /> Your Profile
            </Dropdown.Item>

            <Dropdown.Item href="#/settings" className="py-2">
                <FiSettings className="me-2" /> Settings
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="py-2 text-danger fw-semibold">
              <FiLogOut className="me-2" /> Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </header>
  )
}

export default AdminNavbar