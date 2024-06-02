import dynamic from 'next/dynamic';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import Notification from '../components/notification';
import ChatSidebar from '../components/chatsidebar';
import Image from 'next/image';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface Log {
  id: number;
  text: string;
  summary: string;
  createdAt: string;
}

const Form = dynamic(() => import('../components/chatbot/form'), { ssr: false });

const Home: React.FC = () => {
  const isAuthenticated = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();
  const { notification } = router.query;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/summarize/logs', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }

        const data = await response.json();
        setLogs(data.logs);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchLogs();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage: Message = { role: 'bot', content: data.summary };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chat: Log) => {
    setMessages([
      { role: 'user', content: chat.text },
      { role: 'bot', content: chat.summary }
    ]);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0 md:flex md:flex-col bg-gray-800 text-white w-64 p-4`}>
        <ChatSidebar logs={logs} onSelectChat={handleSelectChat} />
      </div>
      <div className="flex flex-col flex-grow">
        <main className="container mx-auto p-4">
          {notification && <Notification message={notification as string} />}
          <div className="flex justify-between items-center mb-4">
            <div className='flex items-center'>
              <Image src="/assets/logos/logo.webp" width={100} height={100} />
              <h1 className="text-2xl font-bold">Chat</h1>
            </div>
            <button
              onClick={handleNewChat}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              New Chat
            </button>
          </div>
          <Form
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            sendMessage={sendMessage}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
