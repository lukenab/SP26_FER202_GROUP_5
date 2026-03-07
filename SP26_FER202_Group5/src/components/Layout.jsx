import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
        <Header/>

        <Container className='flex-grow-1'>
            <Outlet/>
        </Container>

        <Footer/>
    </div>
  )
}

export default Layout