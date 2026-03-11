import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import NavBar from '../components/Layout/Navbar/NavBar';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-fill">
        <Header setMobileOpen={setMobileOpen} />
        <NavBar />
        <Container>
          <Row className="flex-grow-1 m-0">
            <Col className="content">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
