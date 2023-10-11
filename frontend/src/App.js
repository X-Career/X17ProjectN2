import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Candidate from './pages/Candidate';
import Admin from './pages/Admin';
import JobMgr from './component/admin/jobMgr.js';
import MailMgr from './component/admin/mailMgr.js';
import RecruittMgr from './component/admin/recruitMgr.js';
import ProfileAdmin from './component/admin/profileAdmin';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* router test upload infor candidate và CV của candidate */}
        <Route path="/test" element={<Candidate/>} />
        <Route path="/admin/" element={<Admin/>} >
          <Route index element={<Navigate to ="ProfileAdmin" />}></Route>
          <Route path='ProfileAdmin' element={<ProfileAdmin/>}></Route>
          <Route path='JobMgr' element={<JobMgr/>}></Route>
          <Route path='MailMgr' element={<MailMgr/>}></Route>
          <Route path='RecruitMgr' element={<RecruittMgr/>}></Route>
        </Route>  
      </Routes>
    </Router>
  );
}

export default App;
