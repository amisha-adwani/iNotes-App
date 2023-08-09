import  React,{ useContext } from "react";
import {NoteContext} from "../context/noteContext";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <h4>Your Notes </h4>
      {notes.map((note) => {
        return note.title;
      })}
    </div>
  );
};

export default Notes