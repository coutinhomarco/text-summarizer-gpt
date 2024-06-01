import React from 'react';

export const CustomCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4 flex items-center bg-white shadow-md rounded p-6 mb-6">{children}</div>;
};