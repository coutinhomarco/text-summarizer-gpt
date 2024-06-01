import dynamic from 'next/dynamic';
import { useState, ChangeEvent, FormEvent } from 'react';
import useAuth from '../hooks/useAuth';

const Form = dynamic(() => import('../components/chatbot/form'), { ssr: false });

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Home = () => {
  const isAuthenticated = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage: Message = { role: 'bot', content: data.reply };
      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="container mx-auto p-4">
        <Form
          input={input}
          handleInputChange={handleInputChange}
          sendMessage={sendMessage}
        />
      </main>
    </div>
  );
};

export default Home;
