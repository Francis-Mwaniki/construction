// components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if(data.status === 400 || data.status === 401 || data.status === 500){
        alert(data.message);
        setLoading(false);
        return
      }
      if(data.status === 200){
        setTimeout(() => {
        setLoading(false);
        window.location.href = '/Login';
      }
        , 1000);
        alert(data.message);
      }

      
    } catch (error:any) {
      alert(error.message);
        setLoading(false);
      console.error(error);
    }
  };

  return ( 
    <div className="shadow-lg  bg-white  p-16 rounded">
      <h2 className="text-2xl font-semibold mb-6">Get started!</h2>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <div className="mb-4">
            <Input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
      <Button
        onClick={handleRegister}
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {
            loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
                </svg>
            ) : 'Register'
        }
      </Button>
      <div className='my-4 h-4' />
      <p className="text-center text-gray-500 text-xs">
            &copy;2021 Our Services. All rights reserved.
            </p>
            <p className="text-center text-gray-500 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
            </p>
            <h5 className="text-center text-gray-500 text-xs">
            Have an account?
             <Link
            className="text-blue-500  mx-2  hover:text-blue-600 hover:underline"
           href="/Login">Login</Link>
            </h5>
            
            <h5 className="text-center mx-2 text-gray-500 text-xs">
            New to Our Services? 
             <Link
            className="text-blue-500   hover:text-blue-600 hover:underline"
           href="/Register">Register</Link>
            </h5>
     

<div className="flex my-8 items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4 border-black"></span>
            <Link href="#" className="text-xs text-center uppercase hover:underline">Apply as an Expert</Link>
            <span className="border-b w-1/5 lg:w-1/4 border-black"></span>
            </div>
    </div>
  );
};

export default Register;
