import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Açıklama gereklidir'),
  type: z.enum(['labor', 'part'], {
    required_error: 'Tür seçilmelidir',
  }),
  cost: z.string().min(1, 'Tutar gereklidir'),
});

const invoiceSchema = z.object({
  serviceId: z.string().min(1, 'Servis seçilmelidir'),
  paymentMethod: z.enum(['cash', 'credit_card', 'bank_transfer', 'installment'], {
    required_error: 'Ödeme yöntemi seçilmelidir',
  }),
  dueDate: z.string().min(1, 'Vade tarihi gereklidir'),
  items: z.array(invoiceItemSchema).min(1, 'En az bir kalem eklenmelidir'),
  installmentCount: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<Array<{ description: string; type: 'labor' | 'part'; cost: string }>>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [],
    },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Invoice data:', data);
      reset();
      setItems([]);
      onClose();
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', type: 'labor', cost: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  // Mock services for demonstration
  const mockServices = [
    { id: '1', description: 'Periyodik bakım ve yağ değişimi', customer: 'Ahmet Yılmaz', vehicle: '34ABC123' },
    { id: '2', description: 'Fren sistemi tamiri', customer: 'Ayşe Demir', vehicle: '34DEF456' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Yeni Fatura Oluştur
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
                  Servis
                </label>
                <select
                  className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('serviceId')}
                >
                  <option value="">Servis Seçin</option>
                  {mockServices.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.vehicle} - {service.customer} - {service.description}
                    </option>
                  ))}
                </select>
                {errors.serviceId && (
                  <p className="mt-1 text-sm text-error-500">{errors.serviceId.message}</p>
                )}
              </div>

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
                  <option value="installment">Taksitli Ödeme</option>
                </select>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-error-500">{errors.paymentMethod.message}</p>
                )}
              </div>

              {paymentMethod === 'installment' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taksit Sayısı
                  </label>
                  <select
                    className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    {...register('installmentCount')}
                  >
                    <option value="">Taksit Sayısı Seçin</option>
                    <option value="3">3 Taksit</option>
                    <option value="6">6 Taksit</option>
                    <option value="9">9 Taksit</option>
                    <option value="12">12 Taksit</option>
                  </select>
                  {errors.installmentCount && (
                    <p className="mt-1 text-sm text-error-500">{errors.installmentCount.message}</p>
                  )}
                </div>
              )}

              <Input
                type="date"
                label="Vade Tarihi"
                {...register('dueDate')}
                error={errors.dueDate?.message}
              />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Fatura Kalemleri
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={addItem}
                  >
                    Kalem Ekle
                  </Button>
                </div>

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Input
                        placeholder="Açıklama"
                        {...register(`items.${index}.description`)}
                        error={errors.items?.[index]?.description?.message}
                      />
                      <select
                        className="rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        {...register(`items.${index}.type`)}
                      >
                        <option value="labor">İşçilik</option>
                        <option value="part">Parça</option>
                      </select>
                      <Input
                        type="number"
                        placeholder="Tutar"
                        {...register(`items.${index}.cost`)}
                        error={errors.items?.[index]?.cost?.message}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-error-600 hover:text-error-700"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.items && (
                  <p className="mt-1 text-sm text-error-500">{errors.items.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setItems([]);
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
                  Fatura Oluştur
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;