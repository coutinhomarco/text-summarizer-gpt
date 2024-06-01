import React from 'react';
import Link from 'next/link';
import CustomButton from '../button/CustomButton';
import { useAuth } from '../../context/authContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold dark:text-white ml-2">Text Summarizer</h1>
        </div>
        <div className="flex items-center space-x-4">
          <CustomButton>
            <Link target='_blank' href="https://github.com/coutinhomarco/text-summarizer-gpt">
              Github
            </Link>
          </CustomButton>
          {isLoggedIn ? (
            <CustomButton onClick={logout}>
              Logout
            </CustomButton>
          ) : (
            <Link href="/login">
              <CustomButton>Login</CustomButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
