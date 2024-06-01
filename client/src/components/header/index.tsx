import React, { useState } from 'react';
import CustomButton from '../button/CustomButton';

const Header = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Logo" className="mr-2" />
          {
            !isLogged ? (
              <CustomButton>Login</CustomButton>
            ) : (
              <CustomButton>Logout</CustomButton>
            )
          }

        </div>
        <div className="flex items-center space-x-4">
          <CustomButton>GitHub</CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
