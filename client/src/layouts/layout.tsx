import React from 'react';
import Header from '../components/header';
import { SidebarProvider } from '../context/sidebarContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
