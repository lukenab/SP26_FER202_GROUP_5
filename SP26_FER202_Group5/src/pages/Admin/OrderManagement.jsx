import React, { useEffect, useState } from 'react';
import { deleteOrder, getAllBook, getAllOrders, updateOrderStatus } from '../../service/api';
import { Container, Table, Badge, Form, Row, Col, InputGroup, Modal, Button, Pagination } from 'react-bootstrap';
import { FiShoppingBag, FiClock, FiCheckCircle, FiDollarSign, FiSearch, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const lastOrderIndex = currentPage * ordersPerPage;
  const firstPageIndex = lastOrderIndex - ordersPerPage;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerInfo?.phone?.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalRevenue = orders.filter((o) => o.status === 'Delivered').reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const currentOrders = filteredOrders.slice(firstPageIndex, lastOrderIndex);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleShowDeleteModal = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const fetchOrders = async () => {
    try {
      const [ordersData, booksData] = await Promise.all([getAllOrders(), getAllBook()]);
      if (ordersData) {
        const sortedData = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedData);
      }
      if (booksData) {
        setBooks(booksData);
      }
    } catch (error) {
      console.error('Fail to get data', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirmDelete = async () => {
    if (orderToDelete) {
      try {
        await deleteOrder(orderToDelete.id);
        setShowDeleteModal(false);
        fetchOrders();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete order.');
      }
    }
  };

  const getLiveStock = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.stock : 0;
  };

  const checkStockAvailability = (order) => {
    return order.items.every((item) => {
      const liveBook = books.find((b) => b.id === item.bookId);
      return liveBook && liveBook.stock >= item.quantity;
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const order = orders.find((o) => o.id === orderId);

    if (newStatus === 'Processing' || newStatus === 'Shipping') {
      const isAvailable = checkStockAvailability(order);

      if (!isAvailable) {
        alert('❌ Order approval failed: Insufficient stock available.');
        return;
      }
    }

    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Shipping':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Container fluid className="pb-5">
      <div className="mb-4">
        <div className="text-muted" style={{ fontSize: '14px' }}>
          Dashboard &gt; Order Management
        </div>
        <h2 className="fw-bold mt-1" style={{ color: '#1e3d52' }}>
          Order Management
        </h2>
        <p className="text-muted">Manage and organize store orders</p>
      </div>

      <Row className="mb-4 g-3">
        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>
                Total Orders
              </div>
              <h3 className="fw-bold mb-0">{totalOrders}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-primary">
              <FiShoppingBag />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>
                Pending
              </div>
              <h3 className="fw-bold mb-0">{pendingOrders}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-warning">
              <FiClock />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>
                Delivered
              </div>
              <h3 className="fw-bold mb-0">{deliveredOrders}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-success">
              <FiCheckCircle />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card">
            <div>
              <div className="text-muted mb-1" style={{ fontSize: '14px' }}>
                Revenue
              </div>
              <h3 className="fw-bold mb-0">${totalRevenue.toFixed(2)}</h3>
            </div>
            <div className="stat-icon-wrapper bg-light-success">
              <FiDollarSign />
            </div>
          </div>
        </Col>
      </Row>

      <div className="shadow-sm rounded-3">
        <div className="toolbar-container d-flex justify-content-between align-items-center">
          <InputGroup className="search-input-group">
            <InputGroup.Text>
              <FiSearch />
            </InputGroup.Text>
            <Form.Control placeholder="Search by name, phone or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>

          <div className="d-flex gap-2">
            <Form.Select style={{ width: '180px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipping">Shipping</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </div>
        </div>

        <div className="table-wrapper">
          <Table hover className="custom-table border-top-0">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>ORDER ID</th>
                <th style={{ width: '25%' }}>CUSTOMER INFO</th>
                <th style={{ width: '15%' }}>ORDER DATE</th>
                <th style={{ width: '15%' }}>AMOUNT</th>
                <th style={{ width: '20%' }}>STATUS</th>
                <th style={{ width: '15%' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-semibold text-secondary">#{order.id.slice(0, 6).toUpperCase()}</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="fw-bold text-dark" style={{ fontSize: '15px' }}>
                          {order.customerInfo?.name}
                        </div>
                        <div className="text-muted" style={{ fontSize: '13px' }}>
                          {order.customerInfo?.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-muted">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>

                  <td className="fw-bold">${order.totalPrice?.toFixed(2)}</td>

                  <td>
                    <Form.Select size="sm" value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)} 
                    className={`text-${getStatusBadge(order.status)} fw-semibold border-0 shadow-none bg-transparent`} 
                    isInvalid={!checkStockAvailability(order) && order.status === 'Pending'} style={{ cursor: 'pointer', paddingLeft: 0}} 
                    disabled={order.status === 'Delivered' || order.status === 'Cancelled'}>
                      <option className="text-dark" value="Pending">
                        Pending
                      </option>
                      <option className="text-dark" value="Processing">
                        Processing
                      </option>
                      <option className="text-dark" value="Shipping">
                        Shipping
                      </option>
                      <option className="text-dark" value="Delivered">
                        Delivered
                      </option>
                      <option className="text-dark" value="Cancelled">
                        Cancelled
                      </option>
                    </Form.Select>

                    {!checkStockAvailability(order) && order.status === 'Pending' && (
                      <div className="text-danger mt-1 fw-bold" style={{ fontSize: '11px' }}>
                       Stock Insufficient
                      </div>
                    )}
                  </td>

                  <td>
                    <FiEye className="action-icon" title="View Details" onClick={() => handleViewDetails(order)} />
                    {order.status === 'Cancelled' && <FiTrash2 onClick={() => handleShowDeleteModal(order)} className="action-icon text-danger" title="Delete Order" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end align-items-center p-3 border-top bg-light-subtle rounded-bottom-3">
            <div className="text-muted me-auto small">
              Showing {Math.min(firstPageIndex + 1, filteredOrders.length)} to {Math.min(lastOrderIndex, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <Pagination className="mb-0">
              <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />

              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} />
            </Pagination>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-5 text-muted">
              <h5>No orders found matching your criteria.</h5>
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Order Details {selectedOrder && `#${selectedOrder.id.slice(0, 6).toUpperCase()}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-3">
          {selectedOrder && (
            <>
              <div className="bg-light p-3 rounded mb-4">
                <h6 className="fw-bold mb-3">Customer Information</h6>
                <Row>
                  <Col sm={6}>
                    <p className="mb-1">
                      <span className="fw-bold">Name: </span>
                      {selectedOrder.customerInfo?.name}
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">Phone: </span> {selectedOrder.customerInfo?.phone}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <p className="mb-1">
                      <span className="fw-bold">Email: </span> {selectedOrder.customerInfo?.email || 'N/A'}
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">Address: </span> {selectedOrder.customerInfo?.address}
                    </p>
                  </Col>
                </Row>
              </div>

              <h6 className="fw-bold mb-3">Items Ordered</h6>
              <Table bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Book</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map((item, index) => {
                    const liveStock = getLiveStock(item.bookId);
                    const isOutOfStock = liveStock < item.quantity;

                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img src={item.image} alt={item.title} style={{ width: '40px', height: '55px', objectFit: 'cover' }} />
                            <div>
                              <div className="fw-semibold text-dark">{item.title}</div>
                              <div className="text-muted small">Current Stock: {liveStock}</div>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle text-center">{item.price}</td>
                        <td className="align-middle text-center">
                          {item.quantity}
                          {isOutOfStock && <div className="text-danger extra-small fw-bold">Not enough stock!</div>}
                        </td>
                        <td className="align-middle text-end fw-semibold">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className="d-flex justify-content-end mt-3">
                <div className="text-end">
                  <div className="text-muted mb-1">Total Amount</div>
                  <h4 className="fw-bold" style={{ color: '#1e3d52' }}>
                    ${selectedOrder.totalPrice?.toFixed(2)}
                  </h4>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <p className="text-muted">
            Are you sure to delete order <strong>#{orderToDelete?.id.slice(0, 6).toUpperCase()}</strong>.
            <br />
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-end pb-4">
          <Button variant="secondary" onClick={handleCloseDeleteModal} className="px-4 me-2">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} className="px-4">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderManagement;
