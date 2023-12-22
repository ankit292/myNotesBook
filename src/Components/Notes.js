import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import Addnotes from "./Addnotes";
import { Modal, Button } from "react-bootstrap";
import AlertState from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const context = useContext(NoteContext);
  const {notes, getAllNotes, editNote } = context;
  const alertContext = useContext(AlertState);
  const {showAlert} = alertContext;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useNavigate();
  

  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }else{
      history('/signup');
    }
  }, []);

  // updtate note
  const ref = useRef(null);
  const [ note, setNote] = useState({
    etitle:"",
    edescription: "",
    etag: ""
  })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
     })
  };
  

  const handleUpdateNote = (e) => {
    e.preventDefault();
    editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    )
    showAlert(' Note Update Successfully','success')
    setShow(false)
    // addNote(note.title, note.description, note.tag);
    
  };
  
  const onChangeNote = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <Button ref={ref} className="nextButton d-none" onClick={handleShow}>
        Open Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-4">
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                aria-describedby="emailHelp"
                value={note.etitle}
                onChange={onChangeNote}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={onChangeNote}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={onChangeNote}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={note.etitle.length < 5 || note.edescription.length < 5} variant="primary" onClick={handleUpdateNote}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Addnotes />
      <h2 className="my-4">Your Notes</h2>
      <div className="row">
        <p className="ms-2" style={{fontWeight:'500',color:"red"}}>
          {notes.length === 0 && "No Notes Available" }</p>
        
        {notes.map((note, ind) => {
          return <Noteitems key={ind} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
}
