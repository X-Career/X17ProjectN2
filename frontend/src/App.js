import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Candidate from './pages/Candidate';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* router test upload infor candidate và CV của candidate */}
        <Route path="/test" element={<Candidate/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
