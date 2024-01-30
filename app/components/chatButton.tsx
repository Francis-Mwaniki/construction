// components/ChatButton.js

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
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
                ) : 'Ask us'
           }
        </span>
      </button>
      {isOpen && (
        <div className="absolute bottom-20 right-4 w-64 p-6 bg-white border border-gray-300 rounded-lg shadow-lg ">
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
              Send a quick message and we'll get back to you as soon as
                possible
            </p>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Type your message here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <Button className="w-full  p-2 rounded-md">
              Send
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
