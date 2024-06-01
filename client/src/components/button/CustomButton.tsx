import React, { ButtonHTMLAttributes } from 'react';

const CustomButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
