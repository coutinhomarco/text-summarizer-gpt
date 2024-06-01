import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  reply: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await fetch('http://your-nest-api-url.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      const botReply = data.reply;

      res.status(200).json({ reply: botReply });
    } catch (error) {
      res.status(500).json({ reply: 'Error processing your request' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}