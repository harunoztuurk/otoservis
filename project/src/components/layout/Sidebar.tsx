import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Car, 
  Wrench, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { authState, logout } = useAuth();
  const isAdmin = authState.user?.role === 'admin';

  const navigationItems = [
    { name: 'Müşteri Yönetimi', path: '/dashboard/customers', icon: <Users size={20} />, allowedRoles: ['admin', 'personnel'] },
    { name: 'Araç Yönetimi', path: '/dashboard/vehicles', icon: <Car size={20} />, allowedRoles: ['admin', 'personnel'] },
    { name: 'Servis Kayıtları', path: '/dashboard/services', icon: <Wrench size={20} />, allowedRoles: ['admin', 'personnel'] },
    { name: 'Faturalar', path: '/dashboard/invoices', icon: <FileText size={20} />, allowedRoles: ['admin'] },
    { name: 'Ödemeler', path: '/dashboard/payments', icon: <CreditCard size={20} />, allowedRoles: ['admin'] },
    { name: 'Raporlar', path: '/dashboard/reports', icon: <BarChart3 size={20} />, allowedRoles: ['admin'] },
    { name: 'Ayarlar', path: '/dashboard/settings', icon: <Settings size={20} />, allowedRoles: ['admin'] },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.allowedRoles.includes(authState.user?.role || '')
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-30 h-screen w-64 
          bg-primary-800 text-white transition-transform duration-300 ease-in-out
          md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 px-4 border-b border-primary-700">
            <h1 className="text-xl font-semibold">Araç Servis Yönetimi</h1>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-2">
              {filteredNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary-700 text-white' 
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'}
                  `}
                  onClick={() => onClose()}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="border-t border-primary-700 p-4">
            <div className="flex flex-col">
              <div className="text-sm text-primary-200 mb-1">Giriş yapan kullanıcı:</div>
              <div className="font-medium">{authState.user?.fullName}</div>
              <div className="text-xs text-primary-300 mb-3">{authState.user?.role === 'admin' ? 'Yönetici' : 'Personel'}</div>
              
              <button
                onClick={logout}
                className="flex items-center text-primary-100 hover:text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;