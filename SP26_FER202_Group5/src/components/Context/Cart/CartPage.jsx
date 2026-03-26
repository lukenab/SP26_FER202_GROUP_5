import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form, Toast, ToastContainer } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useCart } from './CartGlobalState';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, totalItems, currentUser } = useCart();
  const navigate = useNavigate();

  // State tích chọn sản phẩm
  const [selectedIds, setSelectedIds] = useState([]);
  const [showLoginToast, setShowLoginToast] = useState(false);

  // Tích / bỏ tích 1 item
  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Tích tất cả / bỏ tất cả
  const toggleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((item) => item.id));
    }
  };

  // Xóa các item đã chọn
  const removeSelected = () => {
    selectedIds.forEach((id) => removeItem(id));
    setSelectedIds([]);
  };

  // Tính tổng tiền chỉ của các item đã chọn
  const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));
  const selectedTotal = selectedItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return sum + price * item.quantity;
  }, 0);
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  // Checkout - chỉ cho phép khi đã đăng nhập
  const handleCheckout = () => {
    if (!currentUser) {
      setShowLoginToast(true);
      return;
    }
    if (selectedIds.length === 0) return;
    // Fix #2: truyền selectedIds sang CheckoutPage qua navigation state
    navigate('/orders', { state: { selectedIds } });
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h4>Your cart is empty</h4>
        <Link to="/books">
          <Button style={{ background: '#1e3d52', border: 'none' }} className="mt-3">
            Browse Books
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Toast yêu cầu đăng nhập khi checkout */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={showLoginToast} onClose={() => setShowLoginToast(false)} delay={3000} autohide bg="warning">
          <Toast.Header>
            <strong className="me-auto">⚠️ Login Required</strong>
          </Toast.Header>
          <Toast.Body>
            You need to{' '}
            <Link to="/login" style={{ fontWeight: 600, color: '#1e3d52' }}>
              sign in
            </Link>{' '}
            to proceed to checkout.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <h4 className="mb-4">Shopping Cart ({totalItems} items)</h4>

      <Row>
        {/* Danh sách sản phẩm */}
        <Col md={8}>
          <Table bordered hover responsive>
            <thead style={{ background: '#1e3d52', color: '#fff' }}>
              <tr>
                {/* Checkbox chọn tất cả */}
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <Form.Check type="checkbox" checked={selectedIds.length === cartItems.length && cartItems.length > 0} onChange={toggleSelectAll} title="Select all" />
                </th>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const price = parseFloat(item.price.replace('$', '')) || 0;
                const subtotal = price * item.quantity;
                const isSelected = selectedIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    style={{
                      background: isSelected ? '#eef4f8' : 'white',
                      transition: 'background 0.2s',
                    }}
                  >
                    {/* Checkbox chọn item */}
                    <td className="align-middle text-center">
                      <Form.Check type="checkbox" checked={isSelected} onChange={() => toggleSelect(item.id)} />
                    </td>

                    {/* Tên sách + ảnh + in stock */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.image} alt={item.title} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <Link to={`/books/${item.id}`} style={{ color: '#1e3d52', fontWeight: 600, textDecoration: 'none' }}>
                            {item.title}
                          </Link>
                          <div style={{ fontSize: '13px', color: '#777' }}>{item.author}</div>
                          <div style={{ fontSize: '12px', color: '#28a745', marginTop: '2px' }}>In stock: {item.stock - item.quantity}</div>
                        </div>
                      </div>
                    </td>

                    {/* Giá */}
                    <td className="align-middle">${price.toFixed(2)}</td>

                    {/* Số lượng */}
                    <td className="align-middle">
                      <div className="d-flex align-items-center gap-2">
                        <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          −
                        </Button>
                        <span style={{ minWidth: '28px', textAlign: 'center' }}>{item.quantity}</span>
                        <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                          +
                        </Button>
                      </div>
                    </td>

                    {/* Subtotal */}
                    <td className="align-middle fw-semibold">${subtotal.toFixed(2)}</td>

                    {/* Xóa */}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-2">
            <Link to="/books">
              <Button variant="outline-secondary">← Continue Shopping</Button>
            </Link>
            <div className="d-flex gap-2">
              {selectedIds.length > 0 && (
                <Button variant="outline-danger" onClick={removeSelected}>
                  <FaTrash className="me-1" />
                  Remove Selected ({selectedIds.length})
                </Button>
              )}
              <Button variant="outline-danger" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </Col>

        {/* Tổng tiền */}
        <Col md={4}>
          <div className="border rounded p-4" style={{ background: '#f8f9fa' }}>
            <h5 className="mb-3">Order Summary</h5>
            <hr />

            {selectedItems.length > 0 ? (
              <>
                <div className="d-flex justify-content-between mb-2">
                  <span>Selected items ({selectedCount})</span>
                  <span>${selectedTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span>${selectedTotal.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                Select items above to see your total.
              </p>
            )}

            <Button
              className="w-100"
              style={{
                background: selectedIds.length === 0 ? '#aaa' : '#1e3d52',
                border: 'none',
              }}
              disabled={selectedIds.length === 0}
              onClick={handleCheckout}
            >
              {currentUser ? 'Proceed to Checkout' : '🔒 Sign in to Checkout'}
            </Button>

            {/* Hint nếu chưa đăng nhập */}
            {!currentUser && (
              <p className="text-muted mt-2 mb-0" style={{ fontSize: '13px', textAlign: 'center' }}>
                <Link to="/login" style={{ color: '#1e3d52' }}>
                  Sign in
                </Link>{' '}
                to place your order
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
