import React, { useState } from 'react';
import { useCart } from '../components/Context/Cart/CartGlobalState';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Form, Modal } from 'react-bootstrap';
import { createOrder } from '../service/api';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, totalPrice, currentUser, clearCart } = useCart();
  const [errorMsg, setErrorMsg] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
  });

  const validate = () => {
    let newErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Full name is required!';
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required!';
    } else if (!phoneRegex.test(customerInfo.phone.trim())) {
      newErrors.phone = 'Invalid phone number (10-11 digits)';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Delivery Address is required!';
    }

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const newOrder = {
        userId: currentUser?.id,
        customerInfo: customerInfo,
        items: cartItems.map((item) => ({
          bookId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice: totalPrice,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      await createOrder(newOrder);
      clearCart();

      setShowModal(true);
    } catch (error) {
      console.error('Order failed: ', error);
      alert('Failed to place order. Please try again later.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <Container className="py-5">
      {cartItems.length === 0 && !showModal ? (
        <div className="text-center py-5">
          <h4>Your cart is empty. Please add items before checkout.</h4>
          <Button className="mt-3" style={{ background: '#1e3d52', border: 'none' }} onClick={() => navigate('/books')}>
            Go to Books
          </Button>
        </div>
      ) : (
        <>
          <h3 className="mb-4">Checkout</h3>
          <Row>
            <Col md={7}>
              <Card className="checkout-card">
                <h5 className="mb-4">Shipping Information</h5>

                <Form onSubmit={handlePlaceOrder}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="name" value={customerInfo.name} onChange={handleInputChange} isInvalid={!!errorMsg.name} />
                    <Form.Control.Feedback type="invalid">{errorMsg.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phone" value={customerInfo.phone} onChange={handleInputChange} isInvalid={!!errorMsg.phone} />
                    <Form.Control.Feedback type="invalid">{errorMsg.phone}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={customerInfo.email} readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control type="text" name="address" value={customerInfo.address} onChange={handleInputChange} isInvalid={!!errorMsg.address} />
                    <Form.Control.Feedback type="invalid">{errorMsg.address}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="form-actions">
                    <Button variant="danger" onClick={() => navigate('/cart')}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Place Order
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>

            <Col md={5}>
              <Card className="summary-card">
                <h5 className="mb-4">Order Summary</h5>

                {cartItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="summary-item-left">
                      <img src={item.image} alt={item.title} className="summary-item-img" />
                      <div>
                        <div className="summary-item-title">{item.title}</div>
                        <div className="summary-item-qty">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="fw-semibold">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</div>
                  </div>
                ))}

                <div className="summary-total-row">
                  <span>Total:</span>
                  <span style={{ color: '#1e3d52' }}>${totalPrice.toFixed(2)}</span>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Order Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            <p className="mt-3 fs-3 fw-bold">Thank you for your purchase! </p>
              <p>Your order has been placed successfully</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal} style={{ backgroundColor: '#1e3d52', border: 'none' }}>
            Back to Home
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
