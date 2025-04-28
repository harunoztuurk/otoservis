import React, { useState } from 'react';
import { Car, Search, Plus } from 'lucide-react';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import AddVehicleModal from './AddVehicleModal';

// Mock data for demonstration
const mockVehicles = [
  {
    id: '1',
    licensePlate: '34ABC123',
    make: 'Mercedes',
    model: 'C180',
    year: 2020,
    chassisNumber: 'WDD2040012A123456',
    engineNumber: '27192031',
    customer: {
      id: '1',
      fullName: 'Ahmet Yılmaz',
    },
    lastService: new Date('2024-02-15'),
    status: 'active',
  },
  {
    id: '2',
    licensePlate: '34DEF456',
    make: 'BMW',
    model: '320i',
    year: 2021,
    chassisNumber: 'WBA8Z9C02L123456',
    engineNumber: '89234567',
    customer: {
      id: '2',
      fullName: 'Ayşe Demir',
    },
    lastService: new Date('2024-03-01'),
    status: 'service',
  },
];

const VehiclesPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = mockVehicles.filter(vehicle => 
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.chassisNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: 'bg-success-100 text-success-800',
      service: 'bg-warning-100 text-warning-800',
      inactive: 'bg-gray-100 text-gray-800',
    };

    const statusText = {
      active: 'Aktif',
      service: 'Serviste',
      inactive: 'Pasif',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Araç ara... (Plaka, şasi no, müşteri)"
            icon={<Search size={18} className="text-gray-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Yeni Araç Ekle
        </Button>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Car size={24} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Araç Listesi</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Plaka</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Araç</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Müşteri</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Şasi No</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Son Servis</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Durum</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{vehicle.licensePlate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </div>
                      <div className="text-sm text-gray-500">{vehicle.year}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{vehicle.customer.fullName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{vehicle.chassisNumber}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {new Intl.DateTimeFormat('tr-TR').format(vehicle.lastService)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(vehicle.status)}
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

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Car size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Araç bulunamadı</h3>
              <p className="text-gray-500">
                Arama kriterlerinize uygun araç kaydı bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </Card>

      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default VehiclesPage;