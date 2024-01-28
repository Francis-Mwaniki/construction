import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JSX, SVGProps } from "react";
import {  Pencil, Trash } from "lucide-react"
import VerticalLoader from "../components/verticalLoader"
import Loader from "../components/loader"
interface IMsgDataTypes {
  roomId: string | number;
  user: string;
  msg: string;
  time: string;
}

const ChatPage = ({ socket, username, roomId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);
  const [sending, setSending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
        msg: currentMsg,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      await socket.emit("send_msg", msgData);
      setTimeout(() => {
        setSending(false);
      }
      , 1000);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");
    });
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  // delete message
  const deleteFromSocket = (key: any) => {
    socket.emit("delete_msg", key);
  };

  // edit message
  const editMessage = (key: any) => {
    socket.emit("edit_msg", key);
  };

  return (
    <>
    {
      !isConnected && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )
    }
    <div className="w-full h-full flex flex-col lg:flex-row relative">
      {/* Aside Section */}
      <aside className="w-full lg:w-[28%] h-full border-r lg:border-r-0 lg:border-b overflow-auto sm:sticky sm:z-20 sm:bg-white  sm:left-0 ">
        <div className="p-4">
          <h2 className="text-xl font-bold">Contacts</h2>
        </div>
        
        <ul className="divide-y">
          {/* message send list */}
           {
              username
               ? <li className="flex items-center p-4">
              <img
                src={`https://ui-avatars.com/api/?background=random&name=${username}`}
                alt={username}
                className="w-10 h-10 mr-4"
              />
              <div>
                <h3 className="font-bold">{username}</h3>
                <p className="text-sm text-gray-200 font-bold">
                  {username} joined
                </p>
              </div>
            </li> : ''

           }
        </ul>
      </aside>

      {/* Section Section */}
      <section className="w-full sm:left-[28%] lg:w-2/3 h-full flex flex-col divide-x-2 divide-gray-200 min-h-screen sm:absolute ">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            {roomId ? `Room ${roomId}` : 'Join a room'}
          </h2>
          <Button size="icon" variant="outline">
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Close chat</span>
          </Button>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4 ">
         

           {chat.map(({ user, msg }, key) => (
            <>
            
             <div key={Date.now() + key
              } className={`flex items-center mb-4 ${
            user === username ? "justify-start" : "justify-end"
          }`}
          >
            
            <img 
            src={`https://ui-avatars.com/api/?background=random&name=${user}`}
            alt={user}
            className="w-7 h-7 rounded-full mr-1"
            /> 
            
<div
  className={`max-w-xs mx-2 my-2 p-4 rounded-lg ${user === `${username}`
   ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'}`}
>
  <p className="text-sm flex  flex-col
   min-w-[100px] 
   ">
    <span>{msg} - <span className={
      user === `${username}` ? 'text-gray-200' : 'text-gray-600'
    }>{' '
    }
      {
      user === `${username}` ? 'You' : user
    }</span></span>
    <span className={
      user === `${username}` ? 'text-gray-200' : 'text-gray-600'
    }
    >{new Date().toLocaleTimeString()}</span>

    {/* end delete icon */}
    
  
      <button 
      className="  gap-x-4 float-end flex justify-end "
      >
        <Trash onClick={() => deleteFromSocket(key)} className="h-5 w-5 " />
        <Pencil onClick={() => editMessage(key)} className="h-5 w-5" />
      </button>
  </p>
</div>
</div>

            </>



))}


{/* 
{
sending ? (
  <div className="flex items-center justify-start mb-4">
<div
  className={`max-w-xs mx-2 my-2 p-4 rounded-lg bg-gray-200 text-black`}  
>
  <p className="text-sm flex  flex-col
   min-w-[100px] 
   ">
    <span className="text-xs text-gray-200 font-bold">{new Date().toLocaleTimeString()}</span>
    <span className="text-xs text-gray-200 font-bold">
     sending...
    </span>
  </p>
</div>
</div>
) : ''
}

*/}



        </div>

        {/* Message Input */}
        <div className="p-4 border-t  sm:sticky bg-white fixed bottom-1 inset-x-0 z-20">
         
          {/* sending  message*/}
          <div className="flex justify-center items-center">
          {
            sending && (
             
              <p className="text-xs text-gray-800 text-center py-2  rounded w-full min-w-[400px] mb-2">
                 <VerticalLoader
                  
                  />
                  
              </p>
            )
          }
          </div>

          <form className="flex space-x-2" onSubmit={(e) => sendData(e)}>
            <Input
             disabled={sending}
               value={currentMsg}
               onChange={(e) => setCurrentMsg(e.target.value)}
               // enter to send message
              //  onKeyPress={handleKeyPress}
             className="flex-1" id="message" placeholder={sending ? 'Sending...' : `${username} type a message`}
              />
            <Button 
            disabled={currentMsg === '' || sending}
            
            >
              <ArrowRightIcon className="h-6 w-6" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </section>
    </div>
  

 
</>
  
  );
};

export default ChatPage;


function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6 5 6 21 6" />
      <path d="m5 6 0 15 14 0 0-15" />
      <path d="m10 11 0 6" />
      <path d="m14 11 0 6" />
    </svg>
  )
}

function EditIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6 5 6 21 6" />
      <path d="m5 6 0 15 14 0 0-15" />
      <path d="m10 11 0 6" />
      <path d="m14 11 0 6" />
    </svg>
  )
}

function PenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6 5 6 21 6" />
      <path d="m5 6 0 15 14 0 0-15" />
      <path d="m10 11 0 6" />
      <path d="m14 11 0 6" />
    </svg>
  )
}
