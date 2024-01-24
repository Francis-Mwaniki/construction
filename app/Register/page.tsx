"use client";
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

type Props = {}

const register = (props: Props) => {
  return (
    <a className='max-w-md mx-auto mt-16 p-6  rounded-md my-auto   shadow-lg bg-white flex justify-center items-center flex-col'>
    <Register />
  <a
            className="text-blue-500 hover:text-blue-600 hover:underline"
           href="/register">Register</a>
    </a>
  )
}

export default register