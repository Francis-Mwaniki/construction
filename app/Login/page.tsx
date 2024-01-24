"use client";
import React from 'react'
import Login from '../components/Login'

type Props = {}

const login = (props: Props) => {
  return (
    <div className="max-w-md mx-auto mt-16 p-6  rounded-md my-auto   shadow-lg  bg-white flex justify-center items-center flex-col">
          <Login />
          <a
            className="text-blue-500 hover:text-blue-600 hover:underline"
           href="/register">Register</a>
          </div>
  )
}

export default login