import Login from './components/Login'
import User from './components/User'
import { Button } from '@material-ui/core'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Buffer } from "buffer";

function App() {
  let [jwt, setJwt] = useState({ refresh: '', access: '' });
  let [userID, setUserID] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setJwt={setJwt} setUserID={setUserID}/>} />
        <Route path="/profile" element={<User jwt={jwt} userID={userID}/>}/>
        <Route path="/" element={<h1>User:{userID}</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
