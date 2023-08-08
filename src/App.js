import Home from './components/Home';
import NavBar from './components/Navbar';
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <NavBar/>
        <Routes>
          <Route
          path='/home' element={<Home/>}/>
        </Routes>
        <Routes>
          <Route
          path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
