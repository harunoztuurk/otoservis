import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const paymentSchema = z.object({
  invoiceId: z.string().min(1, 'Fatura seçilmelidir'),
  amount: z.string().min(1, 'Tutar gereklidir'),
  paymentMethod: z.enum(['cash', 'credit_card', 'bank_transfer'], {
    required_error: 'Ödeme yöntemi seçilmelidir',
  }),
  paymentDate: z.string().min(1, 'Ödeme tarihi gereklidir'),
  description: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Payment data:', data);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add payment:', error);
    }
  };

  if (!isOpen) return null;

  // Mock invoices for demonstration
  const mockInvoices = [
    { id: '1', number: 'FTR-2024-001', customer: 'Ahmet Yılmaz', amount: 5310 },
    { id: '2', number: 'FTR-2024-002', customer: 'Ayşe Demir', amount: 8024 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Yeni Ödeme Ekle
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fatura
                </label>
                <select
                  className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('invoiceId')}
                >
                  <option value="">Fatura Seçin</option>
                  {mockInvoices.map(invoice => (
                    <option key={invoice.id} value={invoice.id}>
                      {invoice.number} - {invoice.customer} - {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(invoice.amount)}
                    </option>
                  ))}
                </select>
                {errors.invoiceId && (
                  <p className="mt-1 text-sm text-error-500">{errors.invoiceId.message}</p>
                )}
              </div>

              <Input
                type="number"
                label="Ödeme Tutarı"
                placeholder="0.00"
                {...register('amount')}
                error={errors.amount?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ödeme Yöntemi
                </label>
                <select
                  className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('paymentMethod')}
                >
                  <option value="">Ödeme Yöntemi Seçin</option>
                  <option value="cash">Nakit</option>
                  <option value="credit_card">Kredi Kartı</option>
                  <option value="bank_transfer">Havale/EFT</option>
                </select>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-error-500">{errors.paymentMethod.message}</p>
                )}
              </div>

              <Input
                type="date"
                label="Ödeme Tarihi"
                {...register('paymentDate')}
                error={errors.paymentDate?.message}
              />

              <Input
                label="Açıklama"
                placeholder="Ödeme açıklaması"
                {...register('description')}
                error={errors.description?.message}
              />

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Ödeme Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;