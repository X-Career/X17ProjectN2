import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import JobMgr from './component/admin/Job/JobList';
import MailMgr from './component/admin/mailMgr.js';
import RecruittMgr from './component/admin/recruitMgr.js';
import ProfileAdmin from './component/admin/profileAdmin';
import NotFound from './component/not_found';
import Candidates from './component/candidate/Cadidates';
import Job from './pages/Job';
import User from './pages/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* router test upload infor candidate và CV của candidate */}
        {/* <Route path="/test" element={<CandidateTest />} /> */}

        <Route path="/candidate" element={<Candidates />} />
        <Route path="/user" element={<User />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/admin/" element={<Admin />} >
          <Route index element={<Navigate to="ProfileAdmin" />}></Route>
          <Route path='ProfileAdmin' element={<ProfileAdmin />} activeClassName="active"></Route>
          <Route path='JobMgr' element={<JobMgr />} activeClassName="active"></Route>
          <Route path='MailMgr' element={<MailMgr />} activeClassName="active"></Route>
          <Route path='RecruitMgr' element={<RecruittMgr />} activeClassName="active"></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
