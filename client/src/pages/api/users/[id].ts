import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${NEST_API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: `Failed to fetch user with ID ${id}` });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await fetch(`${NEST_API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: `Failed to delete user with ID ${id}` });
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
