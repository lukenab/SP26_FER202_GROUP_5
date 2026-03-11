
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Card className="h-100 border-1 rounded-2">
      
      <div className="overflow-hidden rounded-top-4">
        <Card.Img variant="top" src={book.image} className="p-2"
          style={{ width: "100%",height: "200px", objectFit: "contain", }}/>
      </div>
      <Card.Body className="card-body d-flex flex-column">
        <Card.Title className="fw-semibold" style={{  fontSize: "18px" }} > {book.title} </Card.Title>
        <Card.Text style={{  fontSize: "13px" }}>Author: {book.author}</Card.Text>
        <div className="mb-3">
          <Badge bg="danger"  className="fw-bold mt-auto">{book.price} </Badge>
        </div>
        <Link to={`/books/${book.id}`} className="mt-auto">
          <Button variant="outline-primary" size="sm" className="w-100">
            View Detail
          </Button>
        </Link>

      </Card.Body>
    </Card>
  );
};

export default BookCard;

