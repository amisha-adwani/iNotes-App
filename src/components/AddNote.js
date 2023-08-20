import React, {useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NoteContext } from "../context/noteContext";

function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({title:'', description:'', tag:''})

    function handleClick(e) {
        e.preventDefault()
        addNote( notes.title, notes.description, notes.tag)
        // console.log(notes.title, notes.description)
        props.showAlert('success','note added successfully')
        setNotes({title:'', description:'', tag:''})
      }
    function handleDescChange(event) {
        setNotes({...notes, description:event.target.value});
        // console.log(notes)
      }
    function handleTitleChange(event) {
        setNotes({...notes, title:event.target.value});
        // console.log(notes)
      }
    function handleTagChange(event) {
        setNotes({...notes, tag:event.target.value});
        // console.log(notes)
      }
    
  return (
    <div className='container'>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={notes.title} onChange={handleTitleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={notes.description} onChange={handleDescChange}/>
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" value={notes.tag} onChange={handleTagChange}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Save
      </Button>
    </Form>
    </div>
  );
}

export default AddNote;