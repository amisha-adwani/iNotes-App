import { createContext, useState } from "react";

const NoteContext = createContext()

const NoteState =(props)=>{
    const notesInitial =[
       {
         "_id": "64ce279a476873d8212a4b06",
         "user": "64ce24eb63756d9a44c06663",
         "title": "title 1.6",
         "description": "some description 1.6",
         "tag": "personal",
         "date": "2023-08-05T10:42:34.085Z",
         "__v": 0
       },
       {
         "_id": "64d0d6c4d19c30bf09c243ad",
         "user": "64ce24eb63756d9a44c06663",
         "title": "title 2",
         "description": "some description 2",
         "tag": "personal",
         "date": "2023-08-07T11:34:28.870Z",
         "__v": 0
       }
     ]
     const [notes, setNotes] = useState(notesInitial)
   
     return(
       <NoteContext.Provider value={{notes, setNotes}}>
           {props.children}
       </NoteContext.Provider>
     )
   }
   
export  {NoteContext, NoteState};