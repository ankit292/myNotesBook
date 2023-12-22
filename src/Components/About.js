import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import abc from './../images/me.jpg'
export default function About() {
  const a = useContext(noteContext);
  console.log(a);
  return (
    <>
      
      <section class="about">
        <div class="container">
            <h1>About Me</h1>
            <div class="about-content d-flex">
                <img src={abc} alt="Profile" style={{width:'40%'}}/>
                <div className="abtMe" style={{width:'60%',paddingLeft:'20px'}}>
                <p>I am a passionate UI Developer with a strong background in front-end development...</p>
                <p>Skills: HTML5, CSS3, JavaScript, React, etc.</p>
                <p>I love creating intuitive and user-friendly interfaces...</p>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
