import { Card } from "react-bootstrap";
import MiniBookCard from "./MiniBookCard";

const RightPanel = ({ newBooks }) => {

  return (
    <Card className="shadow-sm border-0">

      <Card.Header className="fw-bold">
        New Books
      </Card.Header>

      <Card.Body>

        {newBooks.map((book) => (
          <MiniBookCard key={book.id} book={book} />
        ))}

      </Card.Body>

    </Card>
  );
};

export default RightPanel;