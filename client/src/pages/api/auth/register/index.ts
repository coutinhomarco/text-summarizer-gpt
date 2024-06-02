import type { NextApiRequest, NextApiResponse } from 'next';

const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await fetch(`${NEST_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ message: data.message || 'Registration failed' });
      }

      res.status(201).json({ message: 'Registration successful', user: data });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
