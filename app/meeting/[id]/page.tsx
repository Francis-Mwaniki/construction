"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "../../components/room";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Loader, Loader2, MessageSquareText, Share } from "lucide-react";
import MessageBalance from "../../components/MessageBalance";
import UpgradePrompt from "../../components/Upgrade";
import MessageList from '../../components/MessagesList';
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select";


type Props = {
  params:{
    id: string;
  }
}

export default function Home({params}:Props) {
  const {id} = params;
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState("");
  const [messages, setMessages] = useState<number>(50); 
  const [messageCount, setMessageCount] = useState<number>(50); 
 


  const handleMessageSent = () => {
    setMessageCount(prevCount => prevCount - 1);
  };

  const generateUniqueId = () => {
    let uniqueId = Math.random().toString(36).substring(7);
    setGeneratedRoomId(uniqueId);
  };

  const shareRoomID = (id: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Chat App",
          text: "Join my chat room",
          url: `https://localhost:3000/meeting/${id}`,
        })
        .then(() => {
          toast.success('shared', {
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
          });
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      toast.error('Your browser does not support Web Share API', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });

  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    let isExpert = localStorage.getItem("isExpert");

    if (user ) {
      setUserName(user);
    }
  }
  , [
    userName,
  ]);

  const socket = io("https://soket-9qe7.onrender.com");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      toast.error('fill all details', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });

    }
  };

  useEffect(() => {
    if(id){
      setRoomId(id);
      handleJoin();


    }

  }
  , [
    id,
  ]);

  return (
    <div className="flex flex-col overflow-hidden  min-h-screen">
      
      {
        !showChat && (
          <div className="mb-4 flex flex-col justify-center items-center min-h-screen">
        {
          userName === "" && (
            <Link href="/Login"
            className="
            text-white px-9 py-2 rounded-lg bg-black
            transition duration-300 ease-in-out hover:bg-gray-800
            ">
              Login to join chat
            </Link>
          )
        }
        {
          userName !== "" && (
            <>

              <h3 className="text-2xl font-bold mb-4">
            {userName ? `Welcome ${userName}` : "Welcome, Join a chat room"}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            click the button below to join a chat room
          </p>
        
           <div className="mb-4 text-center flex flex-row justify-center items-center">
        
          <Input
            className="border hidden p-2 rounded-lg mr-2 text-black"
            type="text"
            readOnly
            hidden={true}
            placeholder="Room Id"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            disabled={showSpinner}
          />
          <Button
            className=" text-white px-4 py-2 rounded-lg"
            onClick={handleJoin}
            disabled={showSpinner}
          >
            {!showSpinner ? (<>
            <span>Join Room</span>
            <MessageSquareText size={16} className="ml-2" />
            </>) : "Loading..."}
          </Button>
        </div>
            </>
          )
        }
         

      
              {/* {
          userName !== "" && (
           <Button
            className=" text-white px-4 py-2 rounded-lg"
            onClick={generateUniqueId}
          >
            Generate Room Id
          </Button>
          )
         } */}
          
          {/* {
            generatedRoomId && (
              <div className="flex justify-center items-center">
              <p className="text-sm text-gray-500 mt-2">
                Room Id: <span className="text-gray-800">{generatedRoomId}</span>
              </p>
              <span className="text-sm text-gray-500 mt-2 mx-2">|</span>
              <Copy
                size={16}
                className="cursor-pointer"
                onClick={() => copyToClipboard(generatedRoomId)}
              />
               <span className="text-sm text-gray-500 mt-2 mx-2">|</span>
              
               <Share
                size={16}
                className="cursor-pointer"
                onClick={() => shareRoomID(generatedRoomId)}
              />
              </div>

            )
          } */}

            
         {
            showSpinner && (
              <div className="flex justify-center items-center">
              <Loader2
                size={64}
              
                className="text-center animate-spin"
              />
              </div>
            )
         }
          </div>
        
        )
      }
      
     {
        showChat && (
          <div className="mb-4">
          <MessageBalance messages={messageCount} />
         <MessageList onMessageSent={handleMessageSent} />
         {messageCount === 0 && <UpgradePrompt />}
          </div>
        )
     }
      
         <div className="mb-4">
         <div style={{ display: showChat ? "block" : "none" }}>
          {
            messageCount > 0 && (
                <ChatPage onMessageSent={handleMessageSent} socket={socket} roomId={roomId} username={userName} />
            )
          }
        
        </div>
        </div>
        
       
      
    </div>
  );
}