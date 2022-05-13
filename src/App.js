import React from 'react';
import { BrowserRouter as Router, Route ,Routes, Navigate } from 'react-router-dom';

import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import ViewProfile from './components/frontend/profile/ViewProfile';
import ViewOneFixture from './components/frontend/fixtures/ViewOneFixture';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> 

          {/* <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/'/> : <Login/>} />
          
          <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to='/'/> : <Register/>} /> */}
          
          <Route path="/profile" element={<ViewProfile/>}/>
          <Route path="/displayonefixture/:id" element={<ViewOneFixture/>}/>
          
        </Routes>
      </Router>
       
    </div>
  );
}

export default App;
