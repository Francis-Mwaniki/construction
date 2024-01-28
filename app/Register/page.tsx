"use client";
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

type Props = {}

const register = (props: Props) => {
  return (
    <div className='max-w-md mx-auto mt-16 p-6  rounded-md my-auto    flex justify-center items-center flex-col'>
    <Register />

    </div>
  )
}

export default register