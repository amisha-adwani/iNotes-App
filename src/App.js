import Home from './components/Home';
import NavBar from './components/Navbar';
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  NoteState } from './context/noteContext';

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
        </Routes>
      </NoteState>
      </div>
      </Router>
    </div>
  );
}

export default App;
