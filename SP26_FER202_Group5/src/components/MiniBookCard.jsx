import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MiniBookCard = ({ book }) => {
  return (
    <div className="d-flex align-items-center border-bottom py-2 mini-book">
      <img src={book.image} alt={book.title}  width="85" height="135" style={{ objectFit: "cover", borderRadius: "4px" }} className="me-2" />
      <div className="flex-grow-1">
        <div className="mini-title fw-bold">{book.title}</div>
        <div >Author: {book.author}</div>
        <div className="text-primary fw-bold small"> {book.price} </div>
      </div>

      <Link to={`/book/${book.id}`}>
        <Button size="sm" variant="outline-primary mt-5"> View</Button>
      </Link>

    </div>
  );
};

export default MiniBookCard;