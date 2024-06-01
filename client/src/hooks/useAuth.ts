import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'cookie';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies.token;

    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
