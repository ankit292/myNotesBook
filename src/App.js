import "./App.css";
import Navbar from "./Components/Navbar";
import NoteState from "./context/notes/NoteState";
// import Alert from "./Components/Alert";
import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AlertState from "./context/alert/AlertState";
export default function App() {
  
  return (
    <>
    {/* all api fetch State */}
      <NoteState>
        {/* Alert  State */}
        
        <Router>
          <Navbar />
          <AlertState >
          <div className="container my-5">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/about"
                element={<About  />}
              />
              <Route
                exact
                path="/login"
                element={<Login  />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup  />}
              />
            </Routes>
          </div>
          </AlertState>
        </Router>
        
      </NoteState>
    </>
  );
}
