import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export default function NoteItem(props) {
  // const {note} = props
//   console.log(props);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.note.title}</Card.Title>
          <Card.Text>{props.note.description}</Card.Text>
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "20px", cursor:"pointer" }}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faPenToSquare} style={{  cursor:"pointer" }}></FontAwesomeIcon>
        </Card.Body>
      </Card>
    </div>
  );
}
