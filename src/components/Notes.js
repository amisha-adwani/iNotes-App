import React, { useContext } from "react";
import { NoteContext } from "../context/noteContext";
import NoteItem from "./NoteItem";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes} = context;
  return (
    <div>
      {/* <Row xs={1} md={2} lg={3} className="g-4"> */}
      <h4>Your Notes </h4>
      <Row xs={1} md={2} lg={4} className="g-4">
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <Col className="m-4">
                <NoteItem note={note} />
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default Notes;
