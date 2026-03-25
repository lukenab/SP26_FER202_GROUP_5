import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Badge, Button } from 'react-bootstrap';
import { FiDollarSign, FiShoppingBag, FiAlertTriangle, FiClock, FiArrowRight } from 'react-icons/fi';
import { getAllOrders, getAllBook } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import './OrderManagement.css'; 

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    lowStockCount: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockBooks, setLowStockBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, books] = await Promise.all([getAllOrders(), getAllBook()]);

        const delivered = orders.filter(o => o.status === 'Delivered');
        const revenue = delivered.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        const lowStock = books.filter(b => Number(b.stock) < 10);

        setStats({
          totalRevenue: revenue,
          totalOrders: orders.length,
          pendingOrders: orders.filter(o => o.status === 'Pending').length,
          lowStockCount: lowStock.length
        });

        setRecentOrders(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));
        setLowStockBooks(lowStock.sort((a, b) => Number(a.stock) - Number(b.stock)).slice(0, 5));
      } catch (error) {
        console.error("Dashboard data error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold mt-1" style={{ color: '#1e3d52' }}>Business Overview</h2>
        <p className="text-muted">Quick summary of your store's performance</p>
      </div>

      <Row className="mb-4 g-3">
        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Total Revenue</div>
              <h3 className="fw-bold mb-0">${stats.totalRevenue.toFixed(2)}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-success">
              <FiDollarSign className="text-success" />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Total Orders</div>
              <h3 className="fw-bold mb-0">{stats.totalOrders}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-primary">
              <FiShoppingBag className="text-primary" />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Pending Orders</div>
              <h3 className="fw-bold mb-0">{stats.pendingOrders}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-warning">
              <FiClock className="text-warning" />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>Low Stock</div>
              <h3 className="fw-bold mb-0">{stats.lowStockCount}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-danger">
              <FiAlertTriangle className="text-danger" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <div className="shadow-sm rounded-3 bg-white">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
              <Button variant="link" className="p-0 text-decoration-none fw-semibold" onClick={() => navigate('/admin/orders')}>
                View All <FiArrowRight />
              </Button>
            </div>
            <div className="table-responsive">
              <Table hover className="mb-0 custom-table">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3">ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>STATUS</th>
                    <th className="text-end pe-3">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/orders')}>
                      <td className="ps-3 text-secondary fw-semibold">#{order.id.slice(0, 5).toUpperCase()}</td>
                      <td className="fw-bold">{order.customerInfo?.name}</td>
                      <td>
                         <Badge pill bg={order.status === 'Delivered' ? 'success' : 'warning'} style={{fontSize: '11px'}}>
                            {order.status.toUpperCase()}
                         </Badge>
                      </td>
                      <td className="text-end pe-3 fw-bold text-dark">${order.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>

        <Col lg={5}>
          <div className="shadow-sm rounded-3 bg-white">
            <div className="p-3 border-bottom">
              <h5 className="mb-0 fw-bold text-danger">Inventory Alerts</h5>
            </div>
            <div className="table-responsive">
              <Table hover className="mb-0 custom-table">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3">BOOK TITLE</th>
                    <th className="text-center pe-3">STOCK</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockBooks.map(book => (
                    <tr key={book.id}>
                      <td className="ps-3 small fw-semibold text-dark">{book.title}</td>
                      <td className="text-center pe-3">
                        <Badge bg="danger" pill>{book.stock}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;