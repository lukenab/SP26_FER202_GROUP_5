import { Card } from "react-bootstrap";
import MiniBookCard from "../components/UI/MiniBookCard";

const LeftPanel = ({ title, newBooks }) => {

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="fw-bold fs-4">
       {title}
      </Card.Header>
      <Card.Body>
        {newBooks.map((book) => (
          <MiniBookCard key={book.id} book={book} />
        ))}
      </Card.Body>

    </Card>
  );
};

export default LeftPanel;