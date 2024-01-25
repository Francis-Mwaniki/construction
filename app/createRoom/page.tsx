"use client";
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import ChatRoom from '../components/room';

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(0)
    const [loading, setloading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | SetStateAction<number>>(0);
  const [isJoin, setIsJoin] = useState<boolean>(false);
  const [addJoin, setAddJoin] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const id = localStorage.getItem('id');
    if (token && user && id) {
      setUsername(user);
      setUserId(Number(id));
    }

    if(!token && !user && !id){
      return router.push('/Login')
    }
  }, []);

  



    const Join = () => {
        setAddJoin(true);
    }

    const createRoom = () => {
        setloading(true);
        // http://localhost:3000/api/auth/createRoom
        fetch('http://localhost:5000/api/auth/chatroom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                userId: userId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setRoomId(data.id);
                localStorage.setItem('roomId', data.id.toString());
                setloading(false);
                
            })
            .catch((err) => {
                setloading(false);
                console.log(err);
            });
    }

    const joinRoom = async () => {
      if(!roomId){
        return alert("Please enter a room id")
      }
        setloading(true);
        // http://localhost:3000/api/auth/createRoom
     try {
      let res= await fetch('http://localhost:5000/api/auth/joinRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            userId: userId,
            roomId: roomId,
        }),
    })
    let data = await res.json()

    if(res.ok){
      setloading(false);
      setRoomId(data.id);
      setAddJoin(false);
      localStorage.setItem('roomId', data.id.toString());
      console.log("data", data);
      
    }
    else{
      setloading(false);
      console.log("data", data);
      alert(data.error)
      
      
      
    }
     } catch (error:any) {
       setloading(false);
       console.log(error.message);
       alert(error.message)
      
     }

    }




  return (
    <>
    {/* join room add id form */}
    {
        addJoin && (
            <div className="fixed  inset-0 w-full h-full bg-white flex justify-center items-center flex-col max-w-md mx-auto">
                <Input
                    type="number"
                    placeholder="Room ID"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(e) => setRoomId(Number(e.target.value))}
                />
                <Button
                    onClick={joinRoom}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-7 py-5 my-4"
                >
                    {
                        loading ? (
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                        ) : (
                            (loading ? 'Loading...' : 'Join Room')
                        )
                    }
                </Button>
            </div>
        )
    }
    {
      !roomId && (
        <div className="flex justify-center items-center min-h-screen">
    {/* create room button */}
    <Button
        onClick={createRoom}
        className="bg-purple-500 hover:bg-purple-600 text-white"
        >
       {
            loading ? (
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            ) : (
            'Create Room'
            )
       }
    </Button>
    {/* join room button */}
    <div className="mx-4"></div>
    <Button
      onClick={Join}
      className="bg-purple-500 hover:bg-purple-600 text-white"
      >
      Join Room
    </Button>

    
    

        </div>
      ) 
    }
       <>
         {/* If roomId is set, render the ChatRoom component */}
      {roomId && !loading && !addJoin &&
       <div className="flex min-h-screen flex-col">
    <ChatRoom username={username} roomId={roomId}
       userId={userId}
      />
    
    </div>
      }
       </>
      
    
    </>
    
  );
}
