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
    <div className="flex flex-row gap-x-2 justify-center items-center h-screen">
      
      <div className="bg-white p-8 shadow-lg rounded-md w-96  h-72">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        {/* Role Selection */}
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border rounded-md focus:outline-none"
            onChange={(e) => handleRegisterRoleSelection(e.target.value)}
          >
            <option value="landowner">LandOwner</option>
            <option value="expert">Expert</option>
            <option value="admin">Admin</option>
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
          <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border rounded-md focus:outline-none"
            onChange={(e) => handleLoginRoleSelection(e.target.value)}
          >
            <option value="landowner">LandOwner</option>
            <option value="expert">Expert</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        </div>
    </div>
  );
};

export default RegisterForm;
