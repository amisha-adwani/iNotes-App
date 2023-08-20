import { createContext, useState } from "react";

const NoteContext = createContext();

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTI0ZWI2Mzc1NmQ5YTQ0YzA2NjYzIn0sImlhdCI6MTY5MTIzMTQ5MX0.yVVkdd9-oiz4Pq-ii0rtjqcLm6H5NpTM8aDpZtbguIE",
      },
    });
    //client function
    const note = await response.json();
    console.log(note);
    setNotes(note)
  };


  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTI0ZWI2Mzc1NmQ5YTQ0YzA2NjYzIn0sImlhdCI6MTY5MTIzMTQ5MX0.yVVkdd9-oiz4Pq-ii0rtjqcLm6H5NpTM8aDpZtbguIE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //client function
    const note = await response.json();
    setNotes(notes.concat(note));
  };


  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTI0ZWI2Mzc1NmQ5YTQ0YzA2NjYzIn0sImlhdCI6MTY5MTIzMTQ5MX0.yVVkdd9-oiz4Pq-ii0rtjqcLm6H5NpTM8aDpZtbguIE",
      },
    });
    //client function
    const json = await response.json();
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //  const editNote =()=>{
  //   for (let index = 0; index < notes.length; index++) {
  //     const element = notes[index];
  //     if(element._id === id){
  //       element.title = title;
  //       element.description = description;
  //       element.tag = tag;
  //     }
  //   }
  //  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteState };
