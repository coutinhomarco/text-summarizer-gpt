import '../styles/globals.css';
import '../layouts/layout.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/authContext';
import Layout from '../layouts/layout';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // Enable dark mode by default
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
