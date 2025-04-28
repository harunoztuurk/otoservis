import React, { useState } from 'react';
import { FileText, Search, Plus, Download, AlertCircle } from 'lucide-react';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import ViewInvoiceModal from './ViewInvoiceModal';
import CreateInvoiceModal from './CreateInvoiceModal';

// Mock data for demonstration
const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'FTR-2024-001',
    customer: {
      fullName: 'Ahmet Yılmaz',
      phone: '0532 123 4567',
      taxNumber: '12345678901',
    },
    vehicle: {
      licensePlate: '34ABC123',
      make: 'Mercedes',
      model: 'C180',
    },
    service: {
      description: 'Periyodik bakım ve yağ değişimi',
      completionDate: new Date('2024-03-15'),
    },
    issueDate: new Date('2024-03-16'),
    dueDate: new Date('2024-04-15'),
    items: [
      { description: 'Motor Yağı Değişimi', type: 'labor', cost: 1500 },
      { description: 'Yağ Filtresi', type: 'part', cost: 500 },
      { description: 'Hava Filtresi', type: 'part', cost: 300 },
      { description: 'İşçilik', type: 'labor', cost: 2200 },
    ],
    subtotal: 4500,
    tax: 810,
    total: 5310,
    paymentStatus: 'pending',
    paymentMethod: 'cash',
  },
  {
    id: '2',
    invoiceNumber: 'FTR-2024-002',
    customer: {
      fullName: 'Ayşe Demir',
      phone: '0533 234 5678',
      taxNumber: '98765432109',
    },
    vehicle: {
      licensePlate: '34DEF456',
      make: 'BMW',
      model: '320i',
    },
    service: {
      description: 'Fren sistemi tamiri',
      completionDate: new Date('2024-03-14'),
    },
    issueDate: new Date('2024-03-15'),
    dueDate: new Date('2024-04-14'),
    items: [
      { description: 'Fren Balataları', type: 'part', cost: 2500 },
      { description: 'Fren Diski', type: 'part', cost: 3000 },
      { description: 'İşçilik', type: 'labor', cost: 1300 },
    ],
    subtotal: 6800,
    tax: 1224,
    total: 8024,
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
  },
];

const InvoicesPage: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            placeholder="Fatura ara... (Fatura no, müşteri, plaka)"
            icon={<Search size={18} className="text-gray-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Yeni Fatura Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="bg-primary-50 border border-primary-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <FileText size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Toplam Fatura</p>
              <p className="text-2xl font-semibold text-primary-700">156</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-warning-50 border border-warning-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertCircle size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-warning-600">Bekleyen Ödemeler</p>
              <p className="text-2xl font-semibold text-warning-700">12</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-success-50 border border-success-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <FileText size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-success-600">Ödenen</p>
              <p className="text-2xl font-semibold text-success-700">142</p>
            </div>
          </div>
        </Card>

        <Card hoverable className="bg-error-50 border border-error-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-100 rounded-lg">
              <AlertCircle size={24} className="text-error-600" />
            </div>
            <div>
              <p className="text-sm text-error-600">Vadesi Geçmiş</p>
              <p className="text-2xl font-semibold text-error-700">2</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <FileText size={24} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Fatura Listesi</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Fatura No</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Müşteri</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Araç</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Servis</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Tarih</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Tutar</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">Ödeme</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.customer.fullName}</div>
                      <div className="text-sm text-gray-500">{invoice.customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.vehicle.licensePlate}</div>
                      <div className="text-sm text-gray-500">
                        {invoice.vehicle.make} {invoice.vehicle.model}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{invoice.service.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {new Intl.DateTimeFormat('tr-TR').format(invoice.issueDate)}
                      </div>
                      <div className="text-gray-500">
                        Vade: {new Intl.DateTimeFormat('tr-TR').format(invoice.dueDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(invoice.total)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {getPaymentStatusBadge(invoice.paymentStatus)}
                      {getPaymentMethodBadge(invoice.paymentMethod)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Download size={16} />}
                        onClick={() => {}}
                      >
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        Detaylar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <FileText size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fatura bulunamadı</h3>
              <p className="text-gray-500">
                Arama kriterlerinize uygun fatura kaydı bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </Card>

      {selectedInvoice && (
        <ViewInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default InvoicesPage;