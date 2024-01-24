import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { debounce, set } from 'lodash';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JSX, SVGProps } from "react";
interface Message {
  id: string;
  sender: string;
  content: string;
}

interface ChatProps {
  roomId: number | SetStateAction<number>;
  username: string | SetStateAction<string>;
  userId: number | SetStateAction<number>;
  
}

const Chat = ({ roomId, username, userId }: ChatProps) => {
  const socket = useRef<Socket>(io('http://localhost:4000')).current;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string>('');
  const [isTypingDebounced, setIsTypingDebounced] = useState<boolean>(false);
  const [user, setUser] = useState('')
  const [localuser, setLocalUser] = useState('')
const [sending, setSending] = useState<boolean>(false);

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    setSending(true)
    if(inputMessage === ""){
      return
    }
    socket.emit('chatMessage', inputMessage, userId, roomId);
    socket.emit('typing', username, roomId);
    setTimeout(() => {
      setSending(false)
    }
      , 2000);
    setInputMessage(''); // Clear the input field after sending the message
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (newline in the input field)
      handleSendMessage(e); // Call the function to send the message
    }
  };
  const deleteFromSocket = (id: string) => {
    socket.emit('deleteMessage', messages.filter((message) => message.id === id));

    /* id */
    if(id){
      setMessages(messages.filter((message) => message.id !== id));
    }

  }
  const debouncedSetMessages = debounce((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, 300);

  useEffect(() => {
    if (inputMessage) {
      socket.emit('typing', username, roomId);
    }
  }, [inputMessage, roomId, username]);

  useEffect(() => {
    socket.on('typing', (username) => {
      setIsTyping(true);
      setTypingUser(username);
    });
  }, []);

   // emit fetchChatMessages
     // socket.emit('fetchChatMessages', roomId);
     useEffect(() => {
     if(roomId){
      socket.emit('fetchChatMessages', roomId) 
       
      socket.on('chatMessage', (message) => {
        console.log("from the backend", message);
          debouncedSetMessages(message);
          console.log("debouncedSetMessages", debouncedSetMessages);
          
      });
     }
    }
    , [
      roomId,
      socket,
    ]);

  useEffect(() => {
    const isUser = localStorage.getItem('user');
    if(isUser){
      setLocalUser(isUser)
    }

    if (!username) {
      window.location.href = '/';
      return;
    }
    let isMounted = true;
    socket.on('connect', () => {
      console.log('connected');
      setIsConnected(true);


   
    });

    socket.on('disconnect', (reason) => {
      console.log(`Disconnected from the server. Reason: ${reason}`);
      setIsConnected(false);
    });
    // emit disconnect
    // socket.emit('disconnect', roomId, userId);

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
      setIsConnected(false);
    });

    if (roomId) {
      socket.emit('join', roomId, username, userId);
    }
    

    //join
    socket.on('join', (data) => {
      setUser(data);
      console.log(data);
      
    });


   
    // socket.on('chatMessage', (message) => {
    //   console.log(message);
    //     debouncedSetMessages(message);
    // });
    
  }, [roomId, username, socket]);

  return (
    <>
      {isConnected && (
        <div className="w-full h-full flex flex-col lg:flex-row relative">
          
          {/* Aside Section */}
          <aside className="w-full lg:w-1/3 h-full border-r lg:border-r-0 lg:border-b overflow-auto">
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
          <section className="w-full lg:w-2/3 h-full flex flex-col divide-x-2 divide-gray-200 min-h-screen ">
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
              {/* Chat messages */}

              {messages.map((message) => (
                <>
                <div key={message.id} className={`flex ${message.sender === `${username}`
                   ? 'justify-start' : 'justify-end'} items-end mb-4`}>
    <div
      className={`max-w-xs mx-2 my-2 p-4 rounded-lg ${message.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
    >
      <p className="text-sm flex  flex-col
       min-w-[100px] 
       ">
        <span>{message.content} - <span className="text-xs text-gray-500">{message.sender}</span></span>
        <span className="text-[10px]
         text-gray-500">{new Date().toLocaleTimeString()}</span>

        {/* end delete icon */}
         < span className="text-xs text-gray-500">{isTyping ? `${typingUser} is typing...` : ''}</span>

      
          <button 
          className="text-red-500 float-end flex justify-end "
          >
            <TrashIcon onClick={() => deleteFromSocket(message.id)} className="h-5 w-5" />
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
        <span className="text-xs text-gray-500">sending...</span>
      </p>
    </div>
  </div>
    ) : ''
  }

            </div>

            {/* Message Input */}
            <div className="p-4 border-t  sm:sticky bg-white fixed bottom-1 inset-x-0 z-20">
              <p className="text-xs text-gray-500 mb-2">
                {isTyping ? `${typingUser} is typing...` : ''}
              </p>
              {/* sending  message*/}
              <div className="flex justify-center items-center">
              {
                sending ? (
                 
                  <p className="text-xs text-gray-800 text-center py-2  rounded mb-2">
                    sending...
                  </p>
                ) : (
                  ''
                )
              }
              </div>

              <form className="flex space-x-2">
                <Input
                 disabled={sending}
                   value={inputMessage}
                   onChange={(e) => setInputMessage(e.target.value)}
                   // enter to send message
                   onKeyPress={handleKeyPress}
                 className="flex-1" id="message" placeholder={sending ? 'Sending...' : `${username} type a message`}
                  />
                <Button type="submit"
                disabled={inputMessage === '' || sending}
                onClick={(e) => handleSendMessage(e)}
                >
                  <ArrowRightIcon className="h-6 w-6" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </section>
        </div>
      )}

      {!isConnected && (
        /* loading */
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
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