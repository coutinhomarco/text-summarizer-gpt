import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/authContext';
import CustomButton from '../button/CustomButton';
import { useSidebar } from '../../context/sidebarContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800
    text-white">
    <div className="flex items-center">
      <span className="text-xl font-bold">Text Summarizer</span>
    </div>
    <div className="hidden md:flex">
      <CustomButton>
        <Link target="_blank" href="https://github.com/coutinhomarco/text-summarizer-gpt">
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
    <button className="md:hidden" onClick={toggleSidebar}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </header>
);
};

export default Header;
