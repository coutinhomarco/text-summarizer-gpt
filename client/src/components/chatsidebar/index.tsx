import React from 'react';

interface Log {
  id: number;
  text: string;
  summary: string;
  createdAt: string;
}

interface Props {
  logs: Log[];
  onSelectChat: (chat: Log) => void;
}

const ChatSidebar: React.FC<Props> = ({ logs, onSelectChat }) => {
  return (
    <div className="sidebar">
      <h2>Previous Chats</h2>
      {logs.length === 0 ? (
        <p>No chats found</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id} onClick={() => onSelectChat(log)}>
              <strong>Question:</strong> {log.text.substring(0, 20)}...
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatSidebar;
