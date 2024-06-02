import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${NEST_API_URL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to fetch users' });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await fetch(`${NEST_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to create user' });
      }

      const data = await response.json();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
