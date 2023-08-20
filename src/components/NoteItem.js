import React,{useContext} from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { NoteContext } from "../context/noteContext";

export default function NoteItem(props) {
  const context = useContext(NoteContext)
  const {deleteNote} = context
  // const {note} = props
//   console.log(props);
  return (
    <div>
      <Card style={{ height: "125px", width:"316px"}}>
        <Card.Body>
          <Card.Title>{props.note.title}</Card.Title>
          <Card.Text>{props.note.description}</Card.Text>
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "20px", cursor:"pointer" }} onClick={()=>{deleteNote(props.note._id); props.showAlert('success','note deleted successfully')}}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faPenToSquare} style={{  cursor:"pointer" }}></FontAwesomeIcon>
        </Card.Body>
      </Card>
    </div>
  );
}
