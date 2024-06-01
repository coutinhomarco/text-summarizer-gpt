import React from 'react';
import CustomInput from '../input/CustomInput';
import CustomButton from '../button/CustomButton';
import { CustomCard, CustomCardHeader, CustomCardBody } from '../card/index';

interface Props {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Form(props: Props) {
  const { input, handleInputChange, sendMessage } = props;
  return (
    <main className="container mx-auto p-4">
      <CustomCard>
        <CustomCardHeader>
          <h1 className="text-2xl font-bold">Welcome to the Next.js Text Summarizer!</h1>
        </CustomCardHeader>
        <CustomCardBody>
          <p className="mb-2">This is an open source text summarizer app template built with Next.js and OpenAI&apos;s GPT-4.</p>
          <p className="mb-2">It uses React components to provide a seamless experience for summarizing text using GPT-4.</p>
        </CustomCardBody>
      </CustomCard>
      <CustomCard>
        <CustomInput
          type="text"
          placeholder="Enter text to summarize..."
          value={input}
          onChange={handleInputChange}
          required
        />
        <CustomButton onClick={sendMessage}>Summarize</CustomButton>
      </CustomCard>
    </main>
  );
}
