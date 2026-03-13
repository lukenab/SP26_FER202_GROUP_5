import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAllBook, getAllCategories, deleteBook,addBook, updateBook } from '../../service/api';
import { FaBook } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TableListBook from '../../components/UI/TableListBook';
import AddBookModal from '../../components/UI/AddBookModal';
import './BookManagement.css';
const BookManagement = () => {

  const [ListBook, setListBook] = useState([]);
  const [ListCategory, setListCategory] = useState([]);
  const [showAllBook, setshowAllBook] = useState(true);
  const [showLowStock, setShowLowStock] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchKey, setSearchKey] = useState("")
  const [filteredListCate, setFilteredListCate] = useState("All");
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

  //serach and filter
  const filteredBook = ListBook.filter((book)=>{
    //filter
    const matchCategory = book.category_id === filteredListCate || filteredListCate === 'All'
    //search
    const matchSearch = book.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchKey.toLowerCase()) ||
                        book.publication_year.includes(searchKey) ||
                        book.country.toLowerCase().includes(searchKey.toLowerCase())
    return matchCategory && matchSearch;
  })  

  // calculate book
  const totalOfBook = ListBook.length;
  // đảo ngược list Nếu kết quả  > 0 b sẽ đứng trước a.
  const reverseListBook = [...filteredBook].sort((a, b)=> b.id - a.id);
  // calculate out of stock
  const totalOutofStock = filteredBook.filter((book) => book.stock === 0);
  // calculate low stock
  const lowStockBooks = filteredBook.filter((book) => book.stock > 0 && book.stock < 5);

  const handleDeleteBook = async (id) =>{
    await deleteBook(id);
    setListBook(list => list.filter(book=> book.id !== id));
    setToast("Book Deleted Successfully!");
    setTimeout(()=> {
      setToast(null)
    }, 2500);
  }

  const handleAddAndUpdateBook = async (book, isUpdate) =>{
    try {
        if(!isUpdate) {
        const newBook = await addBook(book);
        setListBook(pre => [...pre, newBook]);
        setToast("Book Added Successfully!")
      }else {
        const updatedBook = await updateBook(book.id, book);
        setListBook(pre=> pre.map(b=> (b.id === updatedBook.id ? updatedBook :b)))
        setToast("Book Updated Successfully!")
      }
      setTimeout(()=> { setToast(null) }, 2500);
    } catch (error) {
      setToast("Something went wrong!")
      console.log(error);
    }
  }

  return (
    <>
      <Container>
        {/* hang 3 o tong */}
        <Row className="g-3">
          <Col md={4} className="ps-0">
            <div className="bg-white shadow-lg rounded-3 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total Books</h5>
                <FaBook size={30} />
              </div>
              <h5>{totalOfBook}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-success">Library inventory</span>
                <Button
                  onClick={() => {
                    setshowAllBook(true);
                    setShowLowStock(false);
                    setShowOutOfStock(false);
                  }}
                  style={{ background: 'transparent', border: '2px solid #1e3d52',color: '#1e3d52' }}
                >
                  View All
                </Button>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white shadow-lg rounded-3 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Out Of Stock</h5>
                <MdRemoveShoppingCart size={28} />
              </div>
              <h5>{totalOutofStock.length}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-danger">Need restocking</span>
                <Button
                  onClick={() => {
                    setShowLowStock(false);
                    setShowOutOfStock(true);
                    setshowAllBook(false);
                  }}
                  style={{ background: 'transparent', border: '2px solid #1e3d52',color: '#1e3d52' }}
                >
                  View All
                </Button>
              </div>
            </div>
          </Col>
          <Col md={4} className="pe-0">
            <div className="bg-white shadow-lg rounded-3 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Low Stock</h5>
                <FiAlertTriangle size={28} />
              </div>
              <h5>{lowStockBooks.length}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-warning">Need restocking</span>
                <Button
                  onClick={() => {
                    setShowLowStock(true);
                    setShowOutOfStock(false);
                    setshowAllBook(false);
                  }}
                  style={{ background: 'transparent', border: '2px solid #1e3d52',color: '#1e3d52' }}
                >
                  View All
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className='px-0'>
            <div className="d-flex align-items-center gap-2">
              {/* Search */}
              <input type="text" className="form-control" placeholder="Enter Title, Author, Category, Country,..." style={{ maxWidth: "880px" }} value={searchKey} onChange={(e)=> setSearchKey(e.target.value)}/>
              {/* Category filter */}
              <select className="form-select" value={filteredListCate} onChange={(e)=> setFilteredListCate(e.target.value)} style={{ maxWidth: "200px" }}>
                <option value="All">All Categories</option>
                {ListCategory.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
              {/* Add Book */}
              <Button style={{ background: "#1e3d52", border: "none",whiteSpace: "nowrap" }} onClick={()=> setShowAddModal(true)}> + Add Book </Button>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <Row className="mt-2">
          {showAllBook && <TableListBook ListBooks={reverseListBook} category={ListCategory} title="All Books" onDelete={handleDeleteBook} onUpdate={handleAddAndUpdateBook}/>}

          {showLowStock && <TableListBook ListBooks={lowStockBooks} category={ListCategory} title="Low Stock Books" onDelete={handleDeleteBook} onUpdate={handleAddAndUpdateBook}/>}

          {showOutOfStock && <TableListBook ListBooks={totalOutofStock} category={ListCategory} title="Out Of Stock Books" onDelete={handleDeleteBook} onUpdate={handleAddAndUpdateBook}/>}
        </Row>
      </Container>
        {/* thong bao */}
          {toast && (
            <div className="custom-toast">
              {toast}
            </div>
          )}
          <AddBookModal show={showAddModal} onClose={()=> setShowAddModal(false)} ListBook={ListBook} ListCategory={ListCategory} onAdd={handleAddAndUpdateBook}/>
    </>
  );
};

export default BookManagement;
