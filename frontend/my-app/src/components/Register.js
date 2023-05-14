import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const navigate =  useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const api = axios.create({
      baseURL: "http://localhost:8000", // APIサーバーのアドレスを指定
    });
    try {
      const response = await api.post('/register', { username, password });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
