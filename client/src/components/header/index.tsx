import React from 'react';
import Link from 'next/link';
import CustomButton from '../button/CustomButton';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link href="/login">
          <CustomButton>Login</CustomButton>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <CustomButton>Github</CustomButton>
          <Link href="/register">
            <span className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
