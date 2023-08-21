import React, { useContext, useEffect } from "react";
import { NoteContext } from "../context/noteContext";
import NoteItem from "./NoteItem";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      {/* <Row xs={1} md={2} lg={3} className="g-4"> */}
      <h4>Your Notes </h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <Col className="m-4">
                <NoteItem note={note} showAlert={props.showAlert} />
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default Notes;
