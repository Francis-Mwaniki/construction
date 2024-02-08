"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "../components/room";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Loader, Loader2, Share } from "lucide-react";
import MessageBalance from "../components/MessageBalance";
import UpgradePrompt from "../components/Upgrade";
import MessageList from '../components/MessagesList';
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
export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState("");
  const [messages, setMessages] = useState<number>(10); 
  const [messageCount, setMessageCount] = useState<number>(5); 
 
  const Experts = [
    { id: 1, name: "Frank -contractor" },
    { id: 2, name: "Carter -plumber" },
    { id: 3, name: "Oliver -electrician" },
    { id: 4, name: "Liam -carpenter" },
    { id: 5, name: "Noah -painter" },
    { id: 6, name: "Elijah -mason" },
    { id: 7, name: "William -roofer" },
    { id: 8, name: "James -landscaper" },
  ];
  const [selectedExpert, setSelectedExpert] = useState<string>("");
  const handleExpertChange = (expert: string) => {
    setSelectedExpert(expert);
  };



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
          url: `https://localhost:3000/share/${id}`,
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
    if (user) {
      setUserName(user);
    }
    if(!user) {
      setUserName('');
    }
  }
  , [
    userName,
  ]);

  const socket = io("http://localhost:3001");

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

  return (
    <div className="flex flex-col  min-h-screen">
      
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
            {userName ? `Welcome ${userName}` : "Enter your roomID to join chat"}
          </h3>
          <div className="mb-4">
          <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an Expert" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Expert</SelectLabel>
          {Experts.map((expert) => (
            <SelectItem
              key={expert.id}
              onSelect={() => handleExpertChange(expert.name)}
              value={expert.name}
            >
              {expert.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
           <div className="mb-4 text-center flex flex-row justify-center items-center">
        
          <Input
            className="border p-2 rounded-lg mr-2 text-black"
            type="text"
            placeholder="Room Id"
            onChange={(e) => setRoomId(e.target.value)}
            disabled={showSpinner}
          />
          <Button
            className=" text-white px-4 py-2 rounded-lg"
            onClick={handleJoin}
            disabled={showSpinner}
          >
            {!showSpinner ? "Join" : "Loading..."}
          </Button>
        </div>
            </>
          )
        }
         
         {/* generate unique id */}
       
          <div className="mb-4">
              {
          userName !== "" && (
           <Button
            className=" text-white px-4 py-2 rounded-lg"
            onClick={generateUniqueId}
          >
            Generate Room Id
          </Button>
          )
         }
          
          {
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
               {/* share */}
               <Share
                size={16}
                className="cursor-pointer"
                onClick={() => shareRoomID(generatedRoomId)}
              />
              </div>

            )
          }

            </div>
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