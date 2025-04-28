import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Get title based on current path
  const getPageTitle = () => {
    const path = location.pathname.split('/')[2] || '';
    const titles: Record<string, string> = {
      customers: 'Müşteri Yönetimi',
      vehicles: 'Araç Yönetimi',
      services: 'Servis Kayıtları',
      invoices: 'Faturalar',
      payments: 'Ödemeler',
      reports: 'Raporlar',
      settings: 'Ayarlar',
    };
    return titles[path] || 'Gösterge Paneli';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;