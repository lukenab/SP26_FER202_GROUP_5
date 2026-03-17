import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBook, getAllCategories } from "../../service/api";
import { Row, Col, Container } from "react-bootstrap";
import BookCard from "../../components/UI/BookCard";
import { FaBook } from "react-icons/fa";

const CategoryPage = () => {
    const { id } = useParams()
    const [books, setBooks] = useState([])
    const [categoryName, setCategoryName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const bookData = await getAllBook();
            const categories = await getAllCategories();
            const filtered = bookData.filter(
                (book) => Number(book.category_id) === Number(id)
            );
            const category = categories.find((c) => String(c.id) === String(id));
            setBooks(filtered);
            setCategoryName(category?.name || "Category");
        };
        fetchData();
    }, [id])

    return (
        <Container className="mt-4">
            <h2 className="fw-bold mb-4">{categoryName}</h2>
            <Row>
                {books.length > 0 ? (
                    books.map((book) => (
                        <Col md={3} key={book.id}>
                            <BookCard book={book} />
                        </Col>
                    ))
                ) : (
                    <div className="text-center py-5 text-muted">
                        <h5><FaBook /> No books found in this category</h5>
                        <p>Try exploring other categories!</p>
                    </div>
                )}
            </Row>
        </Container>
    )
}

export default CategoryPage;