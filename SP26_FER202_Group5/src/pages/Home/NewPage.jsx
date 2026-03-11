import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllBook} from '../../service/api';
import BookCard from '../../components/UI/BookCard';
import '../Books/BookListPage.css';
const NewPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const bookData = await getAllBook();
        setBooks(bookData);
        };
        fetchData();
    }, []);

     const newBooks = [...books].sort((a, b) => b.publication_year - a.publication_year);
  return (
    <>
    <Container>
        <div className="category-block my-3">
            <h4 className='fw-bold'>New Featured</h4>
            {/* 5 cột */}
            <Row xs={2} md={5} className="g-3 mb-2">
              {newBooks.map((book)=>(
                <Col key={book.id}>
                  <BookCard book={book}/>
                </Col>
              ))}
            </Row>
            <div className="text-end mt-2">
                <Link to={"/books"} className="view-all-link">
                    View All →
                </Link>
            </div>    
       </div>
       </Container>
    </>
  )
}

export default NewPage
