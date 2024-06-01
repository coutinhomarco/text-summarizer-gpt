import React from 'react';
import { Input, Button, Card, CardHeader, CardBody } from '@shadcn/ui';

interface Props {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Form(props: Props) {
  const { input, handleInputChange, sendMessage } = props;
  return (
    <main className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-2xl font-bold">Welcome to the Next.js Text Summarizer!</h1>
        </CardHeader>
        <CardBody>
          <p className="mb-2">This is an open source text summarizer app template built with Next.js and OpenAI's GPT-4.</p>
          <p className="mb-2">It uses React components to provide a seamless experience for summarizing text using GPT-4.</p>
        </CardBody>
      </Card>
      <Card className="p-4 flex items-center">
        <Input 
          type="text" 
          placeholder="Enter text to summarize..." 
          className="flex-grow mr-2" 
          value={input}
          onChange={handleInputChange}
          required
        />
        <Button 
          variant="primary"
          onClick={sendMessage}
        >
          Summarize
        </Button>
      </Card>
    </main>
  );
}
