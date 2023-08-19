import Home from './components/Home';
import NavBar from './components/Navbar';
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  NoteState } from './context/noteContext';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <Router>
      <NavBar/>
      <div className="container">
      <NoteState>
        <Routes>
          <Route
          path='/home' element={<Home/>}/>
          <Route
          path='/about' element={<About/>}/>
          <Route
          path='/login' element={<Login/>}/>
          <Route
          path='/signup' element={<Signup/>}/>
        </Routes>
      </NoteState>
      </div>
      </Router>
    </div>
  );
}

export default App;
