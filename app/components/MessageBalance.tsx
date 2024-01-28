
import React from "react";

interface MessageBalanceProps {
    messages: number;
    }


const MessageBalance = ({ messages }: MessageBalanceProps) => {
    return (
      <div className="bg-gray-200 p-4 rounded-md">
        <p>Messages Remaining: {messages}</p>
      </div>
    );
  };
  
  export default MessageBalance;
  