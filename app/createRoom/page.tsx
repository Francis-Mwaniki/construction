"use client";
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import ChatRoom from '../components/room';
import { io } from "socket.io-client";
import { Copy } from 'lucide-react';
import VerticalLoader from '../components/verticalLoader';

export default function App() {

  const socket = io("http://localhost:3001");
 const generateRoomId = () => {
  //Number
  return Math.floor(Math.random() * 100000000);
}
  const [username, setUsername] = useState<string | SetStateAction<string>>("");

  const [roomId, setRoomId] = useState<number>(0)
    const [loading, setloading] = useState<boolean>(false);
    const [showChat, setShowChat] = useState<boolean>(false);
    const [defaultRoomId, setDefaultRoomId] = useState<number>(generateRoomId())
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

    // if(!token && !user && !id){
    //   return router.push('/Login')
    // }
  }, []);
  

  



    const Join = () => {
        setAddJoin(true);
    }

    // const createRoom = () => {
    //     setloading(true);
    //     // http://localhost:3000/api/auth/createRoom
    //     fetch('http://localhost:5000/api/auth/chatroom', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             userId: userId,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setRoomId(data.id);
    //             localStorage.setItem('roomId', data.id.toString());
    //             setloading(false);
                
    //         })
    //         .catch((err) => {
    //             setloading(false);
    //             console.log(err);
    //         });
    // }

    const joinRoom = async () => {
      if (username !== "" ) {
        console.log(username, "userName", roomId, "roomId");
        socket.emit("join_room", roomId);
         setloading(true);
        // You can remove this setTimeout and add your own logic
        setTimeout(() => {
          setShowChat(true);
          setloading(false);
        }, 500);
      } else {
        alert("Please login first");
      }


    }




  return (
    <>
    {/* join room add id form */}
    {
        addJoin && ! showChat && (
            <div className="fixed  inset-0 w-full h-full bg-white flex justify-center items-center flex-col max-w-md mx-auto">
                <Input
                    type="number"
                    placeholder="Room ID"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(e) => setRoomId(Number(e.target.value))}
                    value={roomId}
                />
                <div className="my-4"></div>
                {/* copy generated roomId and share to your buddy */}
                <div className="text-gray-500 text-sm">
                    Or copy this generated room ID and share to your buddy
                </div>
                <div className="my-4"></div>
                <div className="text-2xl font-semibold text-purple-500">
                    <a
                        className="flex items-center cursor-pointer"
                     onClick={
                        () => {
                            navigator.clipboard.writeText(defaultRoomId.toString());
                            setRoomId(defaultRoomId);
                            alert('Copied to clipboard');
                        }
                    }>
                        <span className="cursor-pointer">
                            {defaultRoomId}
                        </span>
                        <Copy className="inline-block ml-2" size={24} />
                    </a>
                     
                    
                </div>
                

               
                <Button
                    onClick={joinRoom}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-7 py-5 my-4"
                >
                    {
                        loading ? (
                            ('Joining')
                        ) : (
                            ('Join Room')
                        )
                    }
                </Button>
                <div className="my-4"></div>
                <div className="flex justify-center items-center max-w-md">
                  {
                    loading && (
                      <>
                      loading
                      <VerticalLoader 
                      key={0}
                      />
                      </>
                     
                  ) 
                  }
                </div>
            </div>
        )
    }
    {
      !showChat && (
        <div className="flex justify-center items-center min-h-screen">
    {/* create room button */}
    {/* <Button
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
    </Button> */}
    {/* join room button */}
    <div className="mx-4"></div>
    <Button
      onClick={Join}
      disabled={loading}
      className="bg-purple-500 hover:bg-purple-600 text-white"
      >
      Join Room
    </Button>

    
    

        </div>
      ) 
    }
       <>
         {/* If roomId is set, render the ChatRoom component */}
       { showChat && 
         
       <div className="flex min-h-screen flex-col">
    <ChatRoom
    key={roomId}
    socket={socket} username={username} roomId={roomId}
       userId={userId}
      />
    
    </div>
        }
      
      
       </>
      
    
    </>
    
  );
}
