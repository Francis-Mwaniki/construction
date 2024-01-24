// components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [email, setEmail] = useState('');
  const generateRoomId = () => {
    return Math.random().toString(36).substring(7);
  };
  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
        email,
      });

      console.log(response.data);
      if (!response.data) {
        return alert('User does not exist');
      }

      let token = response.data.token;
      let user = response.data.userInfo.username
      let id = response.data.id;
      const roomId = localStorage.getItem('roomId');
     
     
      
      localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('id', id);
        localStorage.setItem('roomId', roomId || generateRoomId());

        setLoading(false);
        window.location.href = '/createRoom';
      

    } catch (error) {
      console.error(error);
        setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* email */}
        <div className="mb-4">
            <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />

            </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <Button
      disabled={loading}
        onClick={handleLogin}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {
            loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                     3.042 1.135 5.824 3 7.938l3-2.647z"
                />
                </svg>
            ) : (
                <span>Login</span>
            )
        }
      </Button>
    </div>
  );
};

export default Login;
