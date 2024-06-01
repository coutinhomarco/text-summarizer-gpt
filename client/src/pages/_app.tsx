import '../styles/globals.css';
import '../layouts/layout.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/layout';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // Enable dark mode by default
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
