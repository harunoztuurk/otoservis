import React from 'react';
import { X, Download } from 'lucide-react';
import Button from '../../../components/common/Button';

interface ViewInvoiceModalProps {
  invoice: any; // Replace with proper type
  onClose: () => void;
}

const ViewInvoiceModal: React.FC<ViewInvoiceModalProps> = ({ invoice, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Fatura Detayları
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Fatura Bilgileri</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Fatura No:</span> {invoice.invoiceNumber}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Düzenleme Tarihi:</span>{' '}
                      {new Intl.DateTimeFormat('tr-TR').format(invoice.issueDate)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Vade Tarihi:</span>{' '}
                      {new Intl.DateTimeFormat('tr-TR').format(invoice.dueDate)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Müşteri Bilgileri</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Ad Soyad:</span> {invoice.customer.fullName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Telefon:</span> {invoice.customer.phone}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">VKN/TCKN:</span> {invoice.customer.taxNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Araç ve Servis Bilgileri</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Plaka:</span> {invoice.vehicle.licensePlate}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Araç:</span>{' '}
                      {invoice.vehicle.make} {invoice.vehicle.model}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Servis:</span> {invoice.service.description}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Tamamlanma Tarihi:</span>{' '}
                      {new Intl.DateTimeFormat('tr-TR').format(invoice.service.completionDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Fatura Kalemleri</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Açıklama</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tür</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {invoice.items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {item.type === 'labor' ? 'İşçilik' : 'Parça'}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900 text-right">
                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.cost)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-sm font-medium text-gray-900">Ara Toplam</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(invoice.subtotal)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-sm font-medium text-gray-900">KDV (%18)</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(invoice.tax)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-sm font-medium text-gray-900">Genel Toplam</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(invoice.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Kapat
              </Button>
              <Button
                variant="primary"
                icon={<Download size={18} />}
                onClick={() => {}}
              >
                PDF İndir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;