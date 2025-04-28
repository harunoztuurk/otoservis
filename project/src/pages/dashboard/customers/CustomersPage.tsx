import React, { useState } from 'react';
import { Plus, Search, UserPlus, Users } from 'lucide-react';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import AddCustomerModal from './AddCustomerModal';

// Mock data for demonstration
const mockCustomers = [
  {
    id: '1',
    name: 'Ahmet',
    surname: 'Yılmaz',
    phone: '0532 123 4567',
    email: 'ahmet.yilmaz@email.com',
    address: 'Kadıköy, İstanbul',
    registrationDate: new Date('2024-01-15'),
    vehicleCount: 2,
  },
  {
    id: '2',
    name: 'Ayşe',
    surname: 'Demir',
    phone: '0533 234 5678',
    email: 'ayse.demir@email.com',
    address: 'Beşiktaş, İstanbul',
    registrationDate: new Date('2024-02-20'),
    vehicleCount: 1,
  },
];

const CustomersPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Müşteri ara... (İsim, telefon)"
            icon={<Search size={18} className="text-gray-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          icon={<UserPlus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Yeni Müşteri Ekle
        </Button>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Users size={24} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Müşteri Listesi</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Müşteri</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">İletişim</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Adres</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Kayıt Tarihi</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Araç Sayısı</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {customer.name} {customer.surname}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div>{customer.phone}</div>
                      <div className="text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{customer.address}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {new Intl.DateTimeFormat('tr-TR').format(customer.registrationDate)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {customer.vehicleCount} Araç
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {}}
                    >
                      Detaylar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Users size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Müşteri bulunamadı</h3>
              <p className="text-gray-500">
                Arama kriterlerinize uygun müşteri kaydı bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </Card>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default CustomersPage;