import { useState, ChangeEvent, FormEvent } from 'react';
import Chatbot from '../components/chatbot/form';
interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Home = () => {
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

  return (
    <div className="bg-gray-100 text-gray-900 min-h-footer">
      <Chatbot input={input} sendMessage={sendMessage} handleInputChange={handleInputChange} />
    </div>
  );
};

export default Home;
