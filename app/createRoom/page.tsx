"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "../components/room";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");

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
          <div className="mb-4 flex flex-col justify-center items-center">
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
          </div>
        
        )
      }
      
     
      
         <div className="mb-4">
         <div style={{ display: showChat ? "block" : "none" }}>
          <ChatPage socket={socket} roomId={roomId} username={userName} />
        </div>
        </div>
        
       
      
    </div>
  );
}