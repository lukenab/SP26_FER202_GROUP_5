import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css'


const AdminLayout = () => {
  return (
    <div>
        <AdminSidebar/>
        <AdminNavbar/>
        
        <main className="admin-main-content">
            <Outlet/>
        </main>
        
    </div>
  )
}

export default AdminLayout