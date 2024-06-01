import React from 'react';

export const CustomCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4 flex-column items-center bg-white shadow-md rounded p-6 mb-6 dark:bg-gray-800">{children}</div>;
};