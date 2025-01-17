import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Courses from './components/Courses';
import MainSection from './components/MainSection';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainSection/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;
