"use client";
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header';
import ChatRoom from './components/room';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import LandingPage from './components/LandingPage';
import LoadingIndicator from './components/verticalLoader';


export default function App() {

  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }
      , 5000);

  
  }, []);


  return (
    <>
    {
      loading && (
       <LoadingIndicator
        key={0}
        />
      ) 
    }
       <>
       <div className="flex min-h-screen flex-col">
     
<div className="">
   <LandingPage
   key={1}
    />
</div>
     
    </div>
       </>
   
    </>
    
  );
}
