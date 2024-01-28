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

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState("");
  const [messages, setMessages] = useState<number>(10); 
  const [messageCount, setMessageCount] = useState<number>(5); 

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
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Your browser doesn't support this feature");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setUserName(user);
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
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div className="flex flex-col  min-h-screen">
      
      {
        !showChat && (
          <div className="mb-4 flex flex-col justify-center items-center min-h-screen">
          <h3 className="text-2xl font-bold mb-4">
            {userName ? `Welcome ${userName}` : "Enter your roomID to join chat"}
          </h3>
           <div className="mb-4 text-center flex flex-row justify-center items-center">
        
          <Input
            className="border p-2 rounded-lg mr-2 text-black"
            type="text"
            placeholder="Room Id"
            onChange={(e) => setRoomId(e.target.value)}
            disabled={showSpinner}
          />
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleJoin}
            disabled={showSpinner}
          >
            {!showSpinner ? "Join" : "Loading..."}
          </Button>
        </div>
         
         {/* generate unique id */}
          <div className="mb-4">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={generateUniqueId}
          >
            Generate Room Id
          </Button>
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
                color="blue"
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