import React, { useState } from 'react';
import { CreditCard, Search, Plus, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import AddPaymentModal from './AddPaymentModal';

// Mock data for demonstration
const mockPayments = [
  {
    id: '1',
    invoiceNumber: 'FTR-2024-001',
    customer: {
      fullName: 'Ahmet Yılmaz',
      phone: '0532 123 4567',
    },
    amount: 5310,
    dueDate: new Date('2024-04-15'),
    paymentDate: new Date('2024-03-20'),
    status: 'paid',
    paymentMethod: 'credit_card',
    description: 'Periyodik bakım ve yağ değişimi ödemesi',
  },
  {
    id: '2',
    invoiceNumber: 'FTR-2024-002',
    customer: {
      fullName: 'Ayşe Demir',
      phone: '0533 234 5678',
    },
    amount: 8024,
    dueDate: new Date('2024-04-14'),
    status: 'pending',
    paymentMethod: 'installment',
    installments: [
      { number: 1, amount: 2674.67, dueDate: new Date('2024-04-14'), status: 'pending' },
      { number: 2, amount: 2674.67, dueDate: new Date('2024-05-14'), status: 'pending' },
      { number: 3, amount: 2674.66, dueDate: new Date('2024-06-14'), status: 'pending' },
    ],
    description: 'Fren sistemi tamiri - Taksitli ödeme',
  },
];

const PaymentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredPayments = mockPayments.filter(payment => 
    payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-warning-100 text-warning-800',
      processing: 'bg-primary-100 text-primary-800',
      paid: 'bg-success-100 text-success-800',
      failed: 'bg-error-100 text-error-800',
      refunded: 'bg-gray-100 text-gray-800',
    };

    const statusText = {
      pending: 'Bekliyor',
      processing: 'İşleniyor',
      paid: 'Ödendi',
      failed: 'Başarısız',
      refunded: 'İade Edildi',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  const getPaymentMethodBadge = (method: string) => {
    const methodStyles = {
      cash: 'bg-green-100 text-green-800',
      credit_card: 'bg-blue-100 text-blue-800',
      bank_transfer: 'bg-purple-100 text-purple-800',
      installment: 'bg-amber-100 text-amber-800',
    };

    const methodText = {
      cash: 'Nakit',
      credit_card: 'Kredi Kartı',
      bank_transfer: 'Havale/EFT',
      installment: 'Taksit',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${methodStyles[method as keyof typeof methodStyles]}`}>
        {methodText[method as keyof typeof methodText]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Ödeme ara... (Fatura no, müşteri)"
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
          Yeni Ödeme Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="bg-success-50 border border-success-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <CheckCircle2 size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-success-600">Ödenen</p>
              <p className="text-2xl font-semibold text-success-700">₺142.350</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-warning-50 border border-warning-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Calendar size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-warning-600">Bekleyen</p>
              <p className="text-2xl font-semibold text-warning-700">₺28.500</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-primary-50 border border-primary-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CreditCard size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Bu Ay</p>
              <p className="text-2xl font-semibold text-primary-700">₺45.750</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-error-50 border border-error-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-100 rounded-lg">
              <AlertCircle size={24} className="text-error-600" />
            </div>
            <div>
              <p className="text-sm text-error-600">Gecikmiş</p>
              <p className="text-2xl font-semibold text-error-700">₺12.800</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <CreditCard size={24} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Ödeme Listesi</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Fatura No</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Müşteri</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Açıklama</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Tutar</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Vade</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Ödeme Şekli</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Durum</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{payment.invoiceNumber}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.customer.fullName}</div>
                      <div className="text-sm text-gray-500">{payment.customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{payment.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(payment.amount)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {new Intl.DateTimeFormat('tr-TR').format(payment.dueDate)}
                      </div>
                      {payment.paymentDate && (
                        <div className="text-gray-500">
                          Ödeme: {new Intl.DateTimeFormat('tr-TR').format(payment.paymentDate)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getPaymentMethodBadge(payment.paymentMethod)}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(payment.status)}
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

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <CreditCard size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ödeme bulunamadı</h3>
              <p className="text-gray-500">
                Arama kriterlerinize uygun ödeme kaydı bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </Card>

      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default PaymentsPage;