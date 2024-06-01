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
          <CustomButton>
            <Link target='_blank' href="https://github.com/coutinhomarco/text-summarizer-gpt">
              Github
            </Link>
          </CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
