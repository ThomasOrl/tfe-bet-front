import React from 'react';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';

import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

        </Routes>
      </Router>
       
    </div>
  );
}

export default App;
