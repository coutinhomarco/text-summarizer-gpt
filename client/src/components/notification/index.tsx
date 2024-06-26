import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Notification: React.FC<{ message: string }> = ({ message }) => {
  const router = useRouter();

  const handleClose = () => {
    router.replace(router.pathname); // Remove the query parameter
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  return (
    <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-green-500 text-white rounded shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div>{message}</div>
        <button onClick={handleClose} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
