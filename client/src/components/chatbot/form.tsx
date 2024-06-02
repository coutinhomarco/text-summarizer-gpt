import React from 'react';
import { ClipLoader } from 'react-spinners';
import CustomInput from '../input/CustomInput';
import CustomButton from '../button/CustomButton';
import { CustomCard, CustomCardHeader, CustomCardBody } from '../card/index';
import {MessageList} from '../messagesList/index';

interface Props {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  messages: { role: 'user' | 'bot'; content: string }[];
  loading: boolean;
}

export default function Form(props: Props) {
  const { input, handleInputChange, sendMessage, messages, loading } = props;

  return (
    <main className="container mx-auto p-4">
      <CustomCard>
        <CustomCardHeader>
          <h1 className="text-2xl font-bold dark:text-white">Welcome to the Next.js Text Summarizer!</h1>
        </CustomCardHeader>
        <CustomCardBody>
          <p className="mb-2">This is an open source text summarizer app template built with Next.js and OpenAI&apos;s GPT-3.5 Turbo.</p>
          <p className="mb-2">It uses React components to provide a seamless experience for summarizing text using GPT-3.5 Turbo.</p>
        </CustomCardBody>
      </CustomCard>
      <CustomCard>
        <div className="mb-4 max-h-96 overflow-y-auto">
          <MessageList messages={messages} />
        </div>
        <CustomInput
          type="text"
          placeholder="Enter text to summarize..."
          value={input}
          onChange={handleInputChange}
          required
        />
        <CustomButton onClick={sendMessage} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </CustomButton>
        {loading && (
          <div className="mt-4 text-center text-gray-600">
            <ClipLoader color="#4A90E2" loading={loading} size={35} />
          </div>
        )}
      </CustomCard>
    </main>
  );
}
