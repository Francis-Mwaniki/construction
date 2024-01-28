// components/MessageList.tsx

import { useState } from 'react';

interface MessageListProps {
  onMessageSent?: (newMessageCount: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ onMessageSent }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    setMessages([...messages, message]);
    if (onMessageSent) {
      onMessageSent(messages.length + 1); // Emit event with the updated message count
    }
  };

  // Other message handling logic...

  return (
    <div>
      
    </div>
  );
};

export default MessageList;
