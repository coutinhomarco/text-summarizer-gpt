import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Logo" className="mr-2" />
          <span className="font-bold text-lg">Login</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700">GitHub</a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Deploy to Vercel</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
