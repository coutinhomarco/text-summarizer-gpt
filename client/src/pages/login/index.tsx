import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      login(data.token);
      router.push({
        pathname: '/',
        query: { notification: 'Login successful!' }
      });
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-center w-full p-6">
        <Image fetchpriority="low" src="/assets/logos/logo.webp" alt="Logo" width={250} height={250} />
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md ml-6">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block mb-2 dark:text-gray-300" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 dark:text-gray-300" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Login
          </button>
          <div className="mt-4 text-center dark:text-gray-300">
            <a href="/register" className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">Don&apos;t have an account? Register here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
