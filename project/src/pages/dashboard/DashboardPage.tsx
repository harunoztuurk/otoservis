import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Car, 
  Wrench, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const stats = {
  customers: 126,
  vehicles: 184,
  activeServices: 8,
  completedServices: 152,
  totalRevenue: 127550,
  unpaidInvoices: 12,
  overduePayments: 5,
};

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const isAdmin = authState.user?.role === 'admin';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/customers">
          <Card hoverable className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100">Toplam Müşteri</p>
                <h3 className="text-3xl font-bold">{stats.customers}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users size={24} />
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/dashboard/vehicles">
          <Card hoverable className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">Toplam Araç</p>
                <h3 className="text-3xl font-bold">{stats.vehicles}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Car size={24} />
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/dashboard/services">
          <Card hoverable className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100">Aktif Servisler</p>
                <h3 className="text-3xl font-bold">{stats.activeServices}</h3>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Wrench size={24} />
              </div>
            </div>
          </Card>
        </Link>

        {isAdmin && (
          <Link to="/dashboard/invoices">
            <Card hoverable className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-amber-100">Ödenmemiş Faturalar</p>
                  <h3 className="text-3xl font-bold">{stats.unpaidInvoices}</h3>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <FileText size={24} />
                </div>
              </div>
            </Card>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isAdmin && (
          <Card title="Finansal Özet">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <div className="flex items-center">
                  <TrendingUp size={20} className="text-success-500 mr-2" />
                  <span>Toplam Gelir</span>
                </div>
                <span className="font-bold text-lg">{formatCurrency(stats.totalRevenue)}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b">
                <div className="flex items-center">
                  <FileText size={20} className="text-primary-500 mr-2" />
                  <span>Tamamlanan Servisler</span>
                </div>
                <span className="font-medium">{stats.completedServices}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b">
                <div className="flex items-center">
                  <CreditCard size={20} className="text-warning-500 mr-2" />
                  <span>Ödenmemiş Faturalar</span>
                </div>
                <span className="font-medium">{stats.unpaidInvoices}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AlertTriangle size={20} className="text-error-500 mr-2" />
                  <span>Gecikmiş Ödemeler</span>
                </div>
                <span className="font-medium">{stats.overduePayments}</span>
              </div>
            </div>
          </Card>
        )}

        <Card title="Aktif Servisler">
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="mr-3 bg-primary-100 text-primary-700 p-2 rounded-full">
                  <Wrench size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">34ABC{index * 123}</p>
                    <p className="text-sm text-gray-500">Mercedes C180</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    {index === 1 ? 'Motor revizyonu' : index === 2 ? 'Fren sistemi değişimi' : 'Periyodik bakım'}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-amber-600">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">3 gün</span>
                  </div>
                </div>
              </div>
            ))}

            <Link 
              to="/dashboard/services" 
              className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-2"
            >
              Tüm servisleri görüntüle
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;