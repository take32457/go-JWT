import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Logout from './components/Logout';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginUsername,setLoginUsername] = useState('');

  return (
      <div>
        <Nav loggedIn={loggedIn} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}setLoginUsername={setLoginUsername}/>} />
          <Route path="/logout" element={<Logout loggedIn={loggedIn}setLoggedIn={setLoggedIn}setLoginUsername={setLoginUsername}/>} />
          <Route path="/" element={<Main username={loginUsername}/>} />
        </Routes>
      </div>
  );
  
}
export default App;
