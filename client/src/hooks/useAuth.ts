import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const loginTimestamp = localStorage.getItem('loginTimestamp');
      const currentTime = Date.now();

      if (!token || !loginTimestamp || currentTime - parseInt(loginTimestamp) > 3600000) { // 3600000 ms = 60 minutes
        localStorage.removeItem('token');
        localStorage.removeItem('loginTimestamp');
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
