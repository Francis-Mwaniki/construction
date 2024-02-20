// RegisterForm.js
"use client"
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import React from 'react';
import { ChevronsDownUp, SeparatorVertical } from 'lucide-react';


const RegisterForm = () => {
  const router = useRouter();

  const handleRegisterRoleSelection = (role: string) => {
    switch (role) {
      case 'landowner':
        router.push('/Register');
        break;
      case 'expert':
        router.push('/applyAsExpert');
        break;
      case 'admin':
        router.push('/RegisterAsAdmin');
        break;
      default:
        break;
    }
  };
  const handleLoginRoleSelection = (role: string) => {
    switch (role) {
      case 'landowner':
        router.push('/Login');
        break;
      case 'expert':
        router.push('/loginAsExpert');
        break;
      case 'admin':
        router.push('/LoginAsAdmin');
        break;
      default:
        break;
    }
  }

  return (
    <div className=' space-y-7 my-9 overflow-hidden overflow-y-hidden'>
      <h4 className='text-2xl font-semibold text-center mb-4'>Welcome to Consite</h4>
      <p className='text-center text-gray-600'>Please select your role and proceed to register or login</p>
   <div className="flex flex-row gap-x-2 justify-center items-center h-screen">
      
      <div className="bg-white p-8 shadow-lg rounded-md w-96  h-72">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        {/* Role Selection */}
        <div className="mb-6">
         <div className='flex flex-row gap-x-2 justify-between items-center '>
         <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">
            Select Role
          </label>
          <span >
            Register
          </span>
          </div>
          <select
            id="role"
            name="role"
            className="w-full p-2  border rounded-md focus:outline-none bg-white appearance-auto"
            onChange={(e) => handleRegisterRoleSelection(e.target.value)}
          >
            <option className=' h-8 appearance-none' value="landowner">LandOwner</option>
            <option className=' h-8 appearance-none' value="expert">Expert</option>
            <option className=' h-8 appearance-none' value="admin">Admin</option>
          </select>
          
        </div>
      </div>
      {/* divider for vertical -or- */}
      <Separator orientation="vertical" />
        <div>or</div>
        <Separator orientation="vertical" />
      


      <div className="bg-white p-8 shadow-lg rounded-md w-96  h-72">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* Role Selection */}
        <div className="mb-6">
        <div className='flex flex-row gap-x-2 justify-between items-center '>
         <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">
            Select Role
          </label>
          <span >
            Login
          </span>
          </div>
          <select
            id="role"
            name="role"
            className="w-full p-2 border rounded-md focus:outline-none bg-white appearance-auto"
            onChange={(e) => handleLoginRoleSelection(e.target.value)}
          >
            <option className=' h-8 appearance-none' value="landowner">LandOwner</option>
            <option className=' h-8 appearance-none' value="expert">Expert</option>
            <option className=' h-8 appearance-none' value="admin">Admin</option>
          </select>
        </div>
        </div>
    </div>
   
   </div>
    
  );
};

export default RegisterForm;
