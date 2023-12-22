import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
export default function Noteitems(props) {
  const {note, updateNote} = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <>
      <div className="col-md-3 my-4">
        <div className="card">
          <div className="card-body">
            <h5
              className="card-title"
            >
              {note.title} <br/>
              <sup className="badge text-bg-secondary" style={{fontSize:"10px"}}>{note._id}</sup>
            </h5>
            <p className="card-text"> {note.description} </p>
            <small>{note.tag}</small>
            <div className="d-flex align-items-center justify-content-end">
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i 
              className="fa-solid fa-pen-to-square mx-2"
              onClick={()=>{updateNote(note)}}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
