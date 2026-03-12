import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAllBook, getAllCategories, deleteBook } from '../../service/api';
import { FaBook } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TableListBook from '../../components/UI/TableListBook';
import './BookManagement.css';
const BookManagement = () => {

  const [ListBook, setListBook] = useState([]);
  const [ListCategory, setListCategory] = useState([]);
  const [showAllBook, setshowAllBook] = useState(true);
  const [showLowStock, setShowLowStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getAllBook();
        const categoryData = await getAllCategories();
        setListBook(bookData);
        setListCategory(categoryData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  // calculate book
  const totalOfBook = ListBook.length;
  // calculate out of stock
  const totalOutofStock = ListBook.filter((book) => book.stock === 0);
  // calculate low stock
  const lowStockBooks = ListBook.filter((book) => book.stock > 0 && book.stock < 5);

  const handleDeleteBook = async (id) =>{
    await deleteBook(id);
    setListBook(list => list.filter(book=> book.id !== id));
    setToast("Book deleted successfully!");
    setTimeout(()=> {
      setToast(null)
    }, 2500);
  }

  return (
    <>
      <Container>
        {/* hang 3 o tong */}
        <Row className="g-3">
          <Col md={4} className="ps-0">
            <div className="bg-white shadow-lg rounded-3 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Total Books</h4>
                <FaBook size={30} />
              </div>
              <h4>{totalOfBook}</h4>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-success">Library inventory</span>
                <Button
                  onClick={() => {
                    setshowAllBook(true);
                    setShowLowStock(false);
                    setShowOutOfStock(false);
                  }}
                  style={{ background: '#1e3d52' }}
                >
                  View All →
                </Button>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white shadow-lg rounded-3 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Out Of Stock</h4>
                <MdRemoveShoppingCart size={28} />
              </div>
              <h4>{totalOutofStock.length}</h4>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-danger">Need restocking</span>
                <Button
                  onClick={() => {
                    setShowLowStock(false);
                    setShowOutOfStock(true);
                    setshowAllBook(false);
                  }}
                  style={{ background: '#1e3d52' }}
                >
                  View All →
                </Button>
              </div>
            </div>
          </Col>
          <Col md={4} className="pe-0">
            <div className="bg-white shadow-lg rounded-3 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Low Stock</h4>
                <FiAlertTriangle size={28} />
              </div>
              <h4>{lowStockBooks.length}</h4>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-warning">Need restocking</span>
                <Button
                  onClick={() => {
                    setShowLowStock(true);
                    setShowOutOfStock(false);
                    setshowAllBook(false);
                  }}
                  style={{ background: '#1e3d52' }}
                >
                  View All →
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className='px-0'>
            <div className="d-flex align-items-center gap-2">
              {/* Search */}
              <input type="text" className="form-control" placeholder="Enter title, author, category..." style={{ maxWidth: "880px" }} />
              {/* Category filter */}
              <select className="form-select" style={{ maxWidth: "200px" }}>
                <option value="All">All Categories</option>
                {ListCategory.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
              {/* Add Book */}
              <Button style={{ background: "#1e3d52", border: "none" }} > + Add Book </Button>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <Row className="mt-2">
          {showAllBook && <TableListBook ListBooks={ListBook} category={ListCategory} title="All Books" onDelete={handleDeleteBook}/>}

          {showLowStock && <TableListBook ListBooks={lowStockBooks} category={ListCategory} title="Low Stock Books" onDelete={handleDeleteBook}/>}

          {showOutOfStock && <TableListBook ListBooks={totalOutofStock} category={ListCategory} title="Out Of Stock Books" onDelete={handleDeleteBook}/>}
        </Row>

      </Container>
        {/* thong bao */}
          {toast && (
            <div className="custom-toast">
              {toast}
            </div>
          )}
    </>
  );
};

export default BookManagement;
