import React from 'react';

interface Log {
  id: number;
  text: string;
  summary: string;
  createdAt: string;
}

interface ChatSidebarProps {
  logs: Log[];
  onSelectChat: (chat: Log) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ logs, onSelectChat }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Previous Chats</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id} onClick={() => onSelectChat(log)} className="cursor-pointer mb-2">
            <strong>Question:</strong> {log.text.substring(0, 20)}...
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
