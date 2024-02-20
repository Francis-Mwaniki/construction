// components/ChatButton.js

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { set } from 'lodash';
import { Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('send Message');
const [send, setSend] = useState(false);
  const sendMessage = (e: { preventDefault: () => void; }) => {
    if(!message) return;
    setSend(true);
    e.preventDefault();
    
    console.log(message);
    // send message to backend

    // reset message
    setTimeout(() => {
      setText('Message Sent');
      setMessage('');
      setSend(false);
    }
    , 2000)

    setTimeout(() => {
      setText('Send Message');
    }
    , 4000)
    
  }
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-14 right-4">
      <button
        className="w-20 h-20
         bg-black
          rounded-full text-white flex items-center justify-center focus:outline-none"
        onClick={toggleChat}
      >
        <span className="text-sm 
        font-semibold 
        ">
           {
                isOpen ? (
                    <X size={24} />
                ) : 'Ask Expert'
           }
        </span>
      </button>
      {isOpen && (
        <div className="absolute bottom-20 h-96 right-4 w-64 p-2 bg-white border border-gray-300 rounded-lg shadow-lg ">
          {/* Chat Content Goes Here */}
          <div>
          <div className="flex-shrink-0 pt-0.5 justify-center items-center mx-auto flex my-3 ">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
          />
        </div>
            <h2 className="text-lg font-semibold mb-4 text-center mt-3">Chat with us</h2>
            <p className="text-sm mb-4">
              Send a quick message and we&apos;ll get back to you as soon as
                possible
            </p>
            <div className="mb-4">
              <Input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <Button 
            onClick={sendMessage}
            className="w-full  p-2 rounded-md">
              {
                send ? (
                  <div className="flex justify-center items-center">
                  <Loader2 size={24} className='mr-2 animate-spin'/>
                    <span>Sending</span>
                  </div>
                ) : text
              }
            </Button>
            {/* or go to live chat interface */}
            <p className="text-sm mt-4">
              or go to live chat interface
            </p>
            <Link href="/createRoom">
            <Button className="w-full  p-2 rounded-md mt-2">
                Live Chat
            </Button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
