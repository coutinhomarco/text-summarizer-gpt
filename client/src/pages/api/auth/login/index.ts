import type { NextApiRequest, NextApiResponse } from 'next';

const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await fetch(`${NEST_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Authentication failed' });
      }

      const data = await response.json();

      res.status(200).json({ message: 'Authentication successful', token: data.token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
