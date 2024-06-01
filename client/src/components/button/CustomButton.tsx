import React, { ButtonHTMLAttributes } from 'react';

const CustomButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button {...props} className="bg-blue-500 text-white px-4 py-2 rounded" />;
};

export default CustomButton;