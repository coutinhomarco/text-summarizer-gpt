import { useEffect, useRef } from 'react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

type MessageListProps = {
  messages: Message[];
};

export const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to bottom only if the last message is from the bot
    if (messages.length > 0 && messages[messages.length - 1].role === 'bot') {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="message-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-4 rounded shadow ${message.role === 'user' ? 'bg-blue-200 text-blue-900' : 'bg-green-200 text-green-900'}`}
        >
          <strong>{message.role === 'user' ? 'You' : 'Bot'}:</strong> {message.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
