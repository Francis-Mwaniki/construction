"use client";
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header';
import ChatRoom from './components/room';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';


export default function App() {

  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }
      , 1000);

  
  }, []);


  return (
    <>
    {
      loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
       <>
       <div className="flex min-h-screen flex-col">
      <Header 
      
       />
<div className="max-w-md mx-auto mt-16 p-6  rounded-md my-auto   shadow-lg  bg-white flex justify-center items-center flex-col">
   <Login />
</div>
     
    </div>
       </>
      )
    }
    </>
    
  );
}