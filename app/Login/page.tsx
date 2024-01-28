"use client";
import React from 'react'
import Login from '../components/Login'

type Props = {}

const login = (props: Props) => {
  return (
    <div className="max-w-md mx-auto min-h-screen p-6  rounded-md my-auto   flex justify-center items-center flex-col">
          <Login />
          
          </div>
  )
}

export default login