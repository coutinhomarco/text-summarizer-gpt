import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await fetch('http://your-nest-api.com/auth/login', {
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

      // Set the JWT token in an HttpOnly cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Set secure flag to true in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/',
      }));

      res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
 