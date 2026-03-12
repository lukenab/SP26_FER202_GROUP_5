import React, { useState } from 'react';
import { Container, Table, Button, Modal, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../pages/Admin/BookManagement.css";
const TableListBook = ({ ListBooks, category, title, onDelete}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <>
      <Container className="bg-white shadow-lg border-3 rounded-3 p-2">
        <h2 className="my-2">{title}</h2>

        <Table bordered hover responsive>
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>price</th>
              <th>Country</th>
              <th>Category</th>
              <th>Publication</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {ListBooks.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center text-muted py-4">
                  No books found
                </td>
              </tr>
            ) : (
              ListBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    <img src={book.image} alt={book.title} width="85" height="142" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>{book.country}</td>
                  <td>{category?.find((c) => c.id === book.category_id)?.name || 'Unknown'}</td>
                  <td>{book.publication_year}</td>
                  <td>{book.stock}</td>
                  <td>{book.description}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Button
                      size="sm"
                      style={{ background: '#1e3d52', border: 'none' }}
                      onClick={() => {
                        setSelectedBook(book);
                        setShowModal(true);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" className="p-3">
        <Modal.Header closeButton>
          <Modal.Title>Book Detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedBook && (
            <Container>
              <Row>
                {/* Image */}
                <Col md={4} className="p-3">
                  <img src={selectedBook.image} alt={selectedBook.title} style={{ width: '100%', height: '400px', objectFit: 'contain' }} />
                </Col>

                {/* Info */}
                <Col md={4}>
                  <h4 style={{ color: '#1e3d52' }}>{selectedBook.price}</h4>

                  <p>Stock: {selectedBook.stock}</p>

                  <div className="border rounded-3 p-3" style={{ borderColor: '#1e3d52', backgroundColor: '#e8eef2' }}>
                    <h6 className="fw-bold" style={{ color: '#1e3d52' }}>
                      Description
                    </h6>
                    <p>{selectedBook.description}</p>
                  </div>

                  <Row className="my-3 g-3 text-white">
                    <Col>
                      <Button  className="w-100" style={{ background: '#1e3d52' }}>
                        UPDATE
                      </Button>
                    </Col>

                    <Col>
                      <Button onClick={() => {
                              onDelete(selectedBook.id);
                              setShowModal(false);
                            }}
                        className="w-100" variant="danger">
                        DELETE
                      </Button>
                    </Col>
                  </Row>
                </Col>

                {/* Detail table */}
                <Col md={4}>
                  <Row className="mb-5">
                    <Card className="py-2">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex flex-column align-items-center">
                          <img variant="top" src="/images/logo.png" className="p-2" width="135" height="62" alt="logo" />
                          <small>Explore Books</small>
                        </div>
                        <Button as={Link} to="/books" style={{ background: '#1e3d52' }}>
                          View More ›
                        </Button>
                      </div>
                    </Card>
                  </Row>

                  <Table bordered>
                    <tbody>
                      <tr>
                        <td>Title</td>
                        <td>{selectedBook.title}</td>
                      </tr>

                      <tr>
                        <td>Author</td>
                        <td>{selectedBook.author}</td>
                      </tr>

                      <tr>
                        <td>Country</td>
                        <td>{selectedBook.country}</td>
                      </tr>

                      <tr>
                        <td>Publication</td>
                        <td>{selectedBook.publication_year}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TableListBook;
