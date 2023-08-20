import React,{useState} from 'react';
import Home from './components/Home';
import NavBar from './components/Navbar';
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  NoteState } from './context/noteContext';
import Login from './components/Login';
import Signup from './components/Signup';
import SuccessAlert from './components/Alert';

function App() {
  const [alert, setAlert] = useState({})
  const showAlert = (variant, message) => {
    setAlert({
      variant: variant,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div>
      <Router>
      <NavBar/>  
      <SuccessAlert alert={alert}/>
      <div className="container">
      <NoteState>
        <Routes>
          <Route
          path='/home' element={<Home showAlert={showAlert}/>}/>
          <Route
          path='/about' element={<About/>}/>
          <Route
          path='/login' element={<Login showAlert={showAlert}/>}/>
          <Route
          path='/signup' element={<Signup showAlert={showAlert}/>}/>
        </Routes>
      </NoteState>
      </div>
      </Router>
    </div>
  );
}

export default App;
