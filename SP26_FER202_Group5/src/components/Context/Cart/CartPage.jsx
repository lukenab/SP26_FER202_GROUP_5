import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useCart } from './CartGlobalState';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();

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
      <h4 className="mb-4">Shopping Cart ({totalItems} items)</h4>

      <Row>
        {/* Danh sách sản phẩm */}
        <Col md={8}>
          <Table bordered hover responsive>
            <thead style={{ background: '#1e3d52', color: '#fff' }}>
              <tr>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const price = parseFloat(item.price.replace('$', '')) || 0;
                const subtotal = price * item.quantity;
                return (
                  <tr key={item.id}>
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
                    <td className="align-middle text-center">
                      <Button variant="outline-danger" size="sm" onClick={() => removeItem(item.id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-2">
            <Link to="/books">
              <Button variant="outline-secondary">← Continue Shopping</Button>
            </Link>
            <Button variant="outline-danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </Col>

        {/* Tổng tiền */}
        <Col md={4}>
          <div className="border rounded p-4" style={{ background: '#f8f9fa' }}>
            <h5 className="mb-3">Order Summary</h5>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Items ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/orders">
              <Button className="w-100" style={{ background: '#1e3d52', border: 'none' }}>
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
