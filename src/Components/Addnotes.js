import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AlertState from "../context/alert/alertContext";
export default function Addnotes(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const alertContext = useContext(AlertState);
  const {showAlert} = alertContext;

  
  const [ note, setNote] = useState({
    title:"",
    description: "",
    tag: ""
  })
  // const [checkField , setCheckField] = useState();
  const handleAddNote = (e) => {
    e.preventDefault();
    // if(checkField === undefined){
    //     alert('Please add fields')
    //     showAlert('Inavalid creadential','error')
    // }else{
        
    // }
    addNote(note.title, note.description, note.tag);
        showAlert('Add new Note Successfully','success')
    setNote({
      title:"",
      description: "",
      tag: ""
    })
    
  };
  
  const onChangeNote = (e)=>{
    // setCheckField(e.target.value)
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <h2 className="my-4">Add Notes</h2>
      <form className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            required
            minLength={5}
            value={note.title}
            onChange={onChangeNote}
          />
          <div id="emailHelp" className="form-text d-none">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            required
            minLength={5}
            id="description"
            name="description"
            value={note.description}
            onChange={onChangeNote}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChangeNote}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Submit
        </button>
      </form>
    </>
  );
}
