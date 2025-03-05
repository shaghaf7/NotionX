import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout.tsx"; // Ensure this file exists
import ReactMarkdown from "react-markdown";

// Define the expected type of the note
type NoteData = {
  id: string;
  title: string;
  markdown: string;
  tags: { id: string; label: string }[];
};

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note: NoteData = useNote(); // Ensure useNote() returns an object of type NoteData
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
