// components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
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
      const response = await axios.post('/api/auth/login', {
        username,
        password,
        email,
      });

      console.log(response.data);
      if (response.data.status === 400 || response.data.status === 401) {
        
        toast.error(response.data.message, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        setLoading(false);
        return;
      }

      let token = response.data.token;
      let user : any = response.data.user.username;
      let id = response.data.user.id;
      const roomId = localStorage.getItem('roomId');
      toast.success('Login Successful', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
     
     
      
      localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('id', id);
        localStorage.setItem('roomId', roomId || generateRoomId());

        setLoading(false);
        router.push('/createRoom');
      

    } catch (error: any) {
      toast.error(error.response.data.message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      console.error(error);
        setLoading(false);
    }
  };

  return (
    <div className="shadow-lg  bg-white  p-16 rounded">
      <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
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
        className="w-full p-2  text-white rounded-md  focus:outline-none"
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
      <div className='my-4 ' />
       

            <p className="text-center text-gray-500 text-xs">
            &copy;2021 Our Services. All rights reserved.
            </p>
            <p className="text-center text-gray-500 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
            </p>
            <h5 className="text-center text-gray-500 text-xs">
            Have an account?
             <a
            className="text-blue-500  mx-2  hover:text-blue-600 hover:underline"
           href="/Login">Login</a>
            </h5>
            
            <h5 className="text-center mx-2 text-gray-500 text-xs">
            New to Our Services? 
             <a
            className="text-blue-500   hover:text-blue-600 hover:underline"
           href="/Register">Register</a>
            </h5>
     

       
            <div className="flex items-center my-5 justify-between">
            <span className="border-b w-1/5 lg:w-1/4 border-black"></span>
            <a href="loginAsExpert" className="text-xs text-center  uppercase hover:underline">Login as Expert</a>
            <span className="border-b w-1/5 lg:w-1/4 border-black"></span>
            </div>


    </div>
  );
};

export default Login;
