import { Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import "../Layout/Navbar/Navbar.css";
const MiniBookCard = ({ book }) => {
  return (
    <div className="d-flex align-items-center border-bottom py-2 mini-book">

      <img src={book.image}  alt={book.title} width="85" height="142" style={{ objectFit: "cover", borderRadius: "4px" }}  className="me-2"/>

      <div className="flex-grow-1 d-flex flex-column mini-info">
        <div className="mini-title fw-bold">
          {book.title}
        </div>
        <div>Author: {book.author}</div>
        <div className="text-danger fw-bold small mt-auto"> {book.price}</div>
      </div>
      <Link to={`/books/${book.id}`}>
        <Button size="sm" variant="outline-primary mt-3">
          View
        </Button>
      </Link>

    </div>
  );
};

export default MiniBookCard;