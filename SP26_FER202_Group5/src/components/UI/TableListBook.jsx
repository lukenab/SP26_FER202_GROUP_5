import React, { useState } from 'react';
import { Container, Table, Button, Modal, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../pages/Admin/BookManagement.css';
const TableListBook = ({ ListBooks, category, title, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [error, setError] = useState("");




  const handleChange = (e) => {
    setError("");
    setEditBook((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };


 const handleSubmit = (e) => {
      e.preventDefault();

      const priceNumber = Number(editBook.price.replace("$", ""));
      const stockNumber = Number(editBook.stock);
      const yearNumber = Number(editBook.publication_year);
      const currentYear = new Date().getFullYear();

      if(yearNumber > currentYear) {
        setError("Publication year cannot be in the future!")
        return;
        }
        if(stockNumber <= 0) {
            setError("Stock must be positive number!");
            return;
        }

      const updatedBook = {
          ...editBook,
          id: editBook.id.toString(),
          stock: stockNumber,
          price: `$${priceNumber}`
        };

      onUpdate(updatedBook, true);
      setShowModal(false);
    }

  const handleUploadImage =(e) =>{
    const file = e.target.files[0];
      if(file) {
          const path = `/images/${file.name}`;
          setEditBook(pre=>({
            ...pre,
              image:path

          }))
        }
      }
  return (
    <>
      <Container className="bg-white shadow-lg border-3 rounded-3 p-2">
        <h3 className="my-2">{title}</h3>

        <Table hover responsive className="rounded-3 overflow-hidden">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Country</th>
              <th>Category</th>
              <th>Stock</th>
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
                    <img src={book.image} alt={book.title} width="85" height="122" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>{book.country}</td>
                  <td>{category?.find((c) => c.id === book.category_id)?.name || 'Unknown'}</td>
                  <td>{book.stock}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Button
                      size="sm"
                      style={{ background: 'transparent', border: '2px solid #1e3d52',color: '#1e3d52' }}
                      onClick={() => {
                        setSelectedBook(book);
                        setEditBook(book);
                        setEditMode(false);
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" className="p-3" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{!editMode ? "Book Detail" : "Update Book"}</Modal.Title>
        </Modal.Header>
        {!editMode ? (
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
                    <h4 style={{ color: '#1e3d52' }}>Price: {selectedBook.price}</h4>

                    <p>Stock: {selectedBook.stock}</p>

                    <div className="border rounded-3 p-3" style={{ borderColor: '#1e3d52', backgroundColor: '#e8eef2' }}>
                      <h6 className="fw-bold" style={{ color: '#1e3d52' }}>
                        Description
                      </h6>
                      <p>{selectedBook.description}</p>
                    </div>

                    <Row className="my-3 g-3 text-white">
                      <Col>
                        <Button className="w-100" style={{ background: '#1e3d52' }} onClick={()=> setEditMode(true)}>
                          UPDATE
                        </Button>
                      </Col>

                      <Col>
                        <Button
                          onClick={() => {
                            onDelete(selectedBook.id);
                            setShowModal(false);
                          }}
                          className="w-100"
                          variant="danger"
                        >
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
                          <Button as={Link} to="/admin" style={{ background: '#1e3d52' }}>
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
        ) : (
          /* EDIT MODE */
          <Modal.Body>
            <Form onSubmit={handleSubmit} >
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control name="title" value={editBook?.title || ''} onChange={handleChange} required />
              </Form.Group>

              <div className="d-flex gap-2 mb-2">
                <Form.Group className="w-100">
                  <Form.Label className="fw-bold">Author</Form.Label>
                  <Form.Control name="author" value={editBook?.author || ''} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label className="fw-bold">Country</Form.Label>
                  <Form.Control name="country" value={editBook?.country || ''} onChange={handleChange} required />
                </Form.Group>
              </div>

              <div className="d-flex gap-2 mb-2">
                <Form.Group className="w-100">
                  <Form.Label className="fw-bold">Price</Form.Label>
                  <Form.Control type="number" name="price" value={editBook?.price.replace("$","") || ''} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label className="fw-bold">Stock</Form.Label>
                  <Form.Control type="number" name="stock" value={editBook?.stock || ''} onChange={handleChange} required />
                </Form.Group>
              </div>

              <div className="d-flex gap-2 mb-2">
                <Form.Group className="w-100">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select name="category_id" value={editBook?.category_id || ''} onChange={handleChange}>
                    <option value="">Choose Category</option>

                    {category.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label className="fw-bold">Publication Year</Form.Label>

                  <Form.Control name="publication_year" value={editBook?.publication_year || ''} onChange={handleChange} required />
                </Form.Group>
              </div>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={editBook?.description || ''} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Upload image file</Form.Label>
                  {editBook && editBook.image && (
                    <img src={editBook.image} alt="preview Image"   style={{ width: "120px", display: "block", marginBottom: "10px" }}/>
                  )}
                   <Form.Control type="file" accept="image/*" name="image" onChange={handleUploadImage} />
              
              </Form.Group>
              {error !== "" ? (<Alert variant="danger"> {error}  </Alert>): ""}    
              <Button style={{ background: '#1e3d52', border: 'none' }} type="submit" className="mt-3 me-3">
                Update Book
              </Button>
              <Button variant='secondary' className="mt-3" onClick={()=> setEditMode(false)}>
                Cancel Update
              </Button>
            </Form>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default TableListBook;
