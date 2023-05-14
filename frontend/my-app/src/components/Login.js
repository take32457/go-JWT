import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginForm({ setLoggedIn , setLoginUsername}) {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const api = axios.create({
      baseURL: "http://localhost:8000", // APIサーバーのアドレスを指定
    });
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data);
      setLoggedIn(true);
      setLoginUsername(username);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };


  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
