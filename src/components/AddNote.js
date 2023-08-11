import React, {useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NoteContext } from "../context/noteContext";

function BasicExample() {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({title:'', description:'', tag:''})

    function handleClick(e) {
        e.preventDefault()
        addNote( notes.title, notes.description)
        console.log(notes.title, notes.description)
        setNotes({title:'', description:'', tag:''})
      }
    function handleDescChange(event) {
        setNotes({...notes, description:event.target.value});
        console.log(notes)
      }
    function handleTitleChange(event) {
        setNotes({...notes, title:event.target.value});
        console.log(notes)
      }
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={notes.title} onChange={handleTitleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={notes.description} onChange={handleDescChange}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Save
      </Button>
    </Form>
  );
}

export default BasicExample;