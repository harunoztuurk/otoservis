import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wrench } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white rounded-full p-3 mb-4">
            <Wrench size={30} className="text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Araç Servis Yönetimi</h1>
          <p className="text-primary-100">Servis ve müşteri takibiniz için profesyonel çözüm</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 animate-fade">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;