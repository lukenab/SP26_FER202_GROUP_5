import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";  
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar";
import "./sidebar.css";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-vh-100 d-flex flex-column">

      <Header setMobileOpen={setMobileOpen} />

      <Row className="flex-grow-1 m-0">

        <Col md="auto" className="p-0">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        </Col>

        <Col className="content">
          <Outlet />
        </Col>

      </Row>

      <Footer />

    </div>
  );
};

export default Layout;