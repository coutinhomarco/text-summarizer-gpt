import React, { InputHTMLAttributes } from 'react';

const CustomInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className="flex-grow p-2 border border-gray-300 rounded mr-2" />;
};

export default CustomInput;