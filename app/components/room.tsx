import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { debounce } from 'lodash';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JSX, SVGProps } from "react";
import { Pencil, Trash } from "lucide-react"
// import LoadingIndicator from './verticalLoader';
import VerticalLoader from './verticalLoader';
interface IMsgDataTypes {
  roomId: number | SetStateAction<number>;
  user: any;
  msg: string;
  time: string;
  id?: any
}

interface ChatProps {
  roomId: number | SetStateAction<number>;
  username: string | SetStateAction<string>;
  userId: number | SetStateAction<number>;
  socket: any

}

const Chat = ({ roomId, username, userId, socket }: ChatProps) => {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string>('');
  const [isTypingDebounced, setIsTypingDebounced] = useState<boolean>(false);
  const [user, setUser] = useState('')
  const [localuser, setLocalUser] = useState('')
  const [hasSent, setHasSent] = useState(false);
const [sending, setSending] = useState<boolean>(false);
const [currentMsg, setCurrentMsg] = useState("");
const [chat, setChat] = useState<IMsgDataTypes[]>([
  {
    roomId: 0,
    user: "Francis",
    msg: "hello",
    time: "0.20",
  },
]);

const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
  setSending(true);
  setIsTyping(false);
  e.preventDefault();
  if (currentMsg !== "") {
    const msgData: IMsgDataTypes = {
      roomId: roomId,
      user: username,
      msg: currentMsg,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };

      await socket.emit("send_msg", msgData);
    await socket.emit("msg", msgData);

    socket.on("receive_msg", (data: IMsgDataTypes) => {
      console.log("Received message:", data);
      setChat((prevChat) => [...prevChat, data]);
    }
    );

     setTimeout(async () => {
      setSending(false);
    }
      , 100);

  

    setCurrentMsg("");
  }
};

 

  // const handleSendMessage = (e: any) => {
  //   e.preventDefault()
  //   setSending(true)
  //   if(inputMessage === ""){
  //     return
  //   }
  //   socket.emit('chatMessage', inputMessage, userId, roomId);
  //   socket.emit('typing', username, roomId);
  //   setHasSent(true);


  //   // socket.on('chatMessage', (message: Message) => {
  //   //   console.log("------------------logs 1-----------------");
      
  //   //   console.log(message);

  //   //     debouncedSetMessages(message);
  //   // }
  //   // );
  //   setTimeout(async () => {

  //     setSending(false)
  //   }
  //     , 3000);
  //   setInputMessage(''); // Clear the input field after sending the message
  // };

  const editMessage = (id: string) => {
    // const message = messages.find((message) => message.id === id);
    // if (message) {
    //   setInputMessage(message.content);
    // }

    // socket.emit('editMessage', messages.filter((message) => message.id === id));
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (newline in the input field)
    //  sendData(e);
    }
  };
  const deleteFromSocket = (id: string) => {
    // socket.emit('deleteMessage', messages.filter((message) => message.id === id));

    // /* id */
    // if(id){
    //   setMessages(messages.filter((message) => message.id !== id));
    // }

  }
  // const debouncedSetMessages = debounce((message) => {
  //   setMessages((prevMessages) => [...prevMessages, message]);
  // }, 300);

//ferch messages from the backend https://localhost:5000/api/auth/messages-rd
// const fetchChatMessagese = async () => {
//   try {
//     const res = await fetch(`http://localhost:5000/api/auth/messages-rd/${roomId}`);
    
//     if (res.ok) {
//       const data = await res.json();
//       const messagesArray: Message[] = Object.values(data);

//       setMessages(messagesArray);
//     } else {
//       console.error("Error fetching messages:", res.statusText);
//     }
//   } catch (error: any) {
//     console.error("Error fetching messages:", error.message);
//   }


// }

/* call fetch after 3 sec every 3 sec */


  // useEffect(() => {
  //   if (inputMessage) {
  //     socket.emit('typing', username, roomId);
  //   }
  // }, [inputMessage, roomId, username]);

  // useEffect(() => {
  //   socket.on('typing', (username) => {
  //     setIsTyping(true);
  //     setTypingUser(username);
  //   });

  // }, [
  //   roomId,
  // ]);

   // emit fetchChatMessages
     // socket.emit('fetchChatMessages', roomId);
    //  useEffect(() => {
    //   console.log("------------------logs 2-----------------");
    //   socket.on('chatMessage', (message: Message[]) => {
    //     console.log("from the backend", message);
    //       debouncedSetMessages(message);
    //       console.log("debouncedSetMessages", debouncedSetMessages);
          
    //   });
     
    // }
    // , [
    //   roomId,
    //   socket,
    // ]);
const getRandomKey = Math.random().toString(36).substring(7);

  useEffect(() => {

    

    const isUser = localStorage.getItem('user');
    if(isUser){
      setLocalUser(isUser)
    }

    if (!isUser) {
      window.location.href = '/';
      return;
    }

    //log username and roomId to the console
    console.log("username", username, "roomId", roomId, "chat", chat);
    let isMounted = true;

    socket.on('connect', () => {
      console.log('-- connected --');
      setIsConnected(true);
    
      // Listen for "receive_msg" event
      socket.on("receive_msg", (data: IMsgDataTypes) => {
        console.log("Received message:", data);
        setChat((prevChat) => [...prevChat, data]);
      });
    
      // Listen for "msg" event
      socket.on("msg", (data: IMsgDataTypes) => {
        console.log("Received message:", data);
        setChat((prevChat) => [...prevChat, data]);
      });
    });
    
   

    socket.on('disconnect', (reason: any) => {
      console.log(`Disconnected from the server. Reason: ${reason}`);
      setIsConnected(false);
    });
   
 
    
  }, [roomId, username, socket,chat, isConnected]);

  return (
    <>
       {!isConnected && sending && (
        <div className="absolute top-0  w-full flex items-center justify-center ">
          <VerticalLoader
            key={getRandomKey}
           />
        </div>
      )}
        <div className="w-full h-full flex flex-col lg:flex-row relative">
          
          {/* Aside Section */}
          <aside className="w-full lg:w-[28%] h-full border-r lg:border-r-0 lg:border-b overflow-auto sm:sticky sm:z-20 sm:bg-white  sm:left-0 ">
            <div className="p-4">
              <h2 className="text-xl font-bold">Contacts</h2>
            </div>
            <div className="mb-4 text-green-500">
              {user ? `${user} joined` : ''}
            </div>
            <ul className="divide-y">
              {/* message send list */}
               {
                  localuser
                   ? <li className="flex items-center p-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${localuser}`}
                    alt={user}
                    className="w-10 h-10 mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{user}</h3>
                    <p className="text-sm text-gray-500">
                      {localuser} joined
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
             
  
              {chat.map((data, index) => (
                <>
                
                 <div key={Date.now() + index
                  } className={`flex ${data.user === `${localuser}` ? 'justify-start' : 'justify-end'} items-end mb-4`}>
                 
       <img
                    src={`https://ui-avatars.com/api/?name=${data.user}`}
                    alt={user}
                    className="w-7 h-7 rounded-full mr-1"
                  />
    <div
      className={`max-w-xs mx-2 my-2 p-4 rounded-lg ${data.user === `${localuser}`
       ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
    >
      <p className="text-sm flex  flex-col
       min-w-[100px] 
       ">
        <span>{data.msg} - <span className="text-xs text-gray-500">{
          data.user === `${localuser}` ? 'You' : data.user
        }</span></span>
        <span className="text-[10px]
         text-gray-500">{new Date().toLocaleTimeString()}</span>

        {/* end delete icon */}
         < span className="text-xs text-gray-500">{isTyping ? `${typingUser} is typing...` : ''}</span>

      
          <button 
          className="  gap-x-4 float-end flex justify-end "
          >
            <Trash onClick={() => deleteFromSocket(data.id)} className="h-5 w-5 " />
            <Pencil onClick={() => editMessage(data.id)} className="h-5 w-5" />
          </button>
      </p>
    </div>
  </div>
  
                </>
  


))}
 

 {/*  */}
 {
    isTyping ? (
      <div className="flex items-center justify-start mb-4">
    <div
      className={`max-w-xs mx-2 my-2 p-4 rounded-lg bg-gray-200 text-black`}
    >
      <p className="text-sm flex  flex-col
       min-w-[100px] 
       ">
        <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
        <span className="text-xs text-gray-500">{isTyping ? `${typingUser} is typing...` : ''}</span>
      </p>
    </div>
  </div>
    ) : ''

  }
  {
    sending ? (
      <div className="flex items-center justify-start mb-4">
    <div
      className={`max-w-xs mx-2 my-2 p-4 rounded-lg bg-gray-200 text-black`}  
    >
      <p className="text-sm flex  flex-col
       min-w-[100px] 
       ">
        <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
        <span className="text-xs text-gray-500">
         sending...
        </span>
      </p>
    </div>
  </div>
    ) : ''
  }

            </div>

            {/* Message Input */}
            <div className="p-4 border-t  sm:sticky bg-white fixed bottom-1 inset-x-0 z-20">
              <p className="text-xs text-gray-500 mb-2">
                {isTyping && `${typingUser} is typing...` }
              </p>
              {/* sending  message*/}
              <div className="flex justify-center items-center">
              {
                sending && (
                 
                  <p className="text-xs text-gray-800 text-center py-2  rounded w-full min-w-[400px] mb-2">
                     <VerticalLoader
                      key={getRandomKey}
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
                <Button type="submit"
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


export default Chat;


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
