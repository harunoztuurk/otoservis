import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  const { authState } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 z-10">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none md:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-2 md:ml-0 text-xl font-medium text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center">
            <span className="hidden sm:block text-sm text-gray-700 mr-2">
              {authState.user?.fullName}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              {authState.user?.fullName.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;