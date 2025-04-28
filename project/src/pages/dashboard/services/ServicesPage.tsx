import React, { useState } from 'react';
import { Wrench, Search, Plus, AlertCircle } from 'lucide-react';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import AddServiceModal from './AddServiceModal';

// Mock data for demonstration
const mockServices = [
  {
    id: '1',
    vehicle: {
      licensePlate: '34ABC123',
      make: 'Mercedes',
      model: 'C180',
    },
    customer: {
      fullName: 'Ahmet Yılmaz',
      phone: '0532 123 4567',
    },
    description: 'Periyodik bakım ve yağ değişimi',
    serviceDate: new Date('2024-03-15'),
    estimatedCompletionDate: new Date('2024-03-16'),
    status: 'in_progress',
    totalCost: 4500,
    paymentStatus: 'pending',
    priority: 'normal',
    technician: 'Mehmet Usta',
    serviceItems: [
      { description: 'Motor Yağı Değişimi', type: 'labor', cost: 1500 },
      { description: 'Yağ Filtresi', type: 'part', cost: 500 },
      { description: 'Hava Filtresi', type: 'part', cost: 300 },
      { description: 'İşçilik', type: 'labor', cost: 2200 },
    ],
  },
  {
    id: '2',
    vehicle: {
      licensePlate: '34DEF456',
      make: 'BMW',
      model: '320i',
    },
    customer: {
      fullName: 'Ayşe Demir',
      phone: '0533 234 5678',
    },
    description: 'Fren sistemi tamiri',
    serviceDate: new Date('2024-03-14'),
    estimatedCompletionDate: new Date('2024-03-15'),
    status: 'completed',
    totalCost: 6800,
    paymentStatus: 'paid',
    priority: 'high',
    technician: 'Ali Usta',
    serviceItems: [
      { description: 'Fren Balataları', type: 'part', cost: 2500 },
      { description: 'Fren Diski', type: 'part', cost: 3000 },
      { description: 'İşçilik', type: 'labor', cost: 1300 },
    ],
  },
];

const ServicesPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = mockServices.filter(service => 
    service.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      waiting: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-primary-100 text-primary-800',
      completed: 'bg-success-100 text-success-800',
      cancelled: 'bg-error-100 text-error-800',
    };

    const statusText = {
      waiting: 'Bekliyor',
      in_progress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      low: 'bg-gray-100 text-gray-800',
      normal: 'bg-blue-100 text-blue-800',
      high: 'bg-warning-100 text-warning-800',
      urgent: 'bg-error-100 text-error-800',
    };

    const priorityText = {
      low: 'Düşük',
      normal: 'Normal',
      high: 'Yüksek',
      urgent: 'Acil',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityStyles[priority as keyof typeof priorityStyles]}`}>
        {priorityText[priority as keyof typeof priorityText]}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-warning-100 text-warning-800',
      partial: 'bg-primary-100 text-primary-800',
      paid: 'bg-success-100 text-success-800',
      overdue: 'bg-error-100 text-error-800',
    };

    const statusText = {
      pending: 'Bekliyor',
      partial: 'Kısmi Ödeme',
      paid: 'Ödendi',
      overdue: 'Gecikmiş',
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
            placeholder="Servis ara... (Plaka, müşteri, açıklama)"
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
          Yeni Servis Kaydı
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="bg-primary-50 border border-primary-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Wrench size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Aktif Servisler</p>
              <p className="text-2xl font-semibold text-primary-700">8</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-warning-50 border border-warning-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertCircle size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-warning-600">Bekleyen Servisler</p>
              <p className="text-2xl font-semibold text-warning-700">3</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-success-50 border border-success-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <Wrench size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-success-600">Tamamlanan</p>
              <p className="text-2xl font-semibold text-success-700">152</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-error-50 border border-error-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-100 rounded-lg">
              <AlertCircle size={24} className="text-error-600" />
            </div>
            <div>
              <p className="text-sm text-error-600">Gecikmeli</p>
              <p className="text-2xl font-semibold text-error-700">2</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Wrench size={24} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Servis Kayıtları</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Araç</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Müşteri</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Servis Detayı</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Tarih</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Teknisyen</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Öncelik</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Durum</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Ödeme</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">{service.vehicle.licensePlate}</div>
                      <div className="text-sm text-gray-500">
                        {service.vehicle.make} {service.vehicle.model}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{service.customer.fullName}</div>
                      <div className="text-sm text-gray-500">{service.customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{service.description}</div>
                    <div className="text-sm text-gray-500">
                      {service.serviceItems.length} kalem
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {new Intl.DateTimeFormat('tr-TR').format(service.serviceDate)}
                      </div>
                      <div className="text-gray-500">
                        Tahmini: {new Intl.DateTimeFormat('tr-TR').format(service.estimatedCompletionDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{service.technician}</div>
                  </td>
                  <td className="px-4 py-3">
                    {getPriorityBadge(service.priority)}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(service.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="mb-1">{getPaymentStatusBadge(service.paymentStatus)}</div>
                      <div className="text-sm font-medium">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(service.totalCost)}
                      </div>
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

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Wrench size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Servis kaydı bulunamadı</h3>
              <p className="text-gray-500">
                Arama kriterlerinize uygun servis kaydı bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </Card>

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default ServicesPage;