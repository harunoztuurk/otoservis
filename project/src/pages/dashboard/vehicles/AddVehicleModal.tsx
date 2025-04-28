import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const vehicleSchema = z.object({
  licensePlate: z.string()
    .min(5, 'Geçerli bir plaka giriniz')
    .max(10, 'Geçerli bir plaka giriniz'),
  make: z.string()
    .min(2, 'Marka en az 2 karakter olmalıdır'),
  model: z.string()
    .min(1, 'Model girilmelidir'),
  year: z.string()
    .regex(/^\d{4}$/, 'Geçerli bir yıl giriniz'),
  chassisNumber: z.string()
    .min(17, 'Geçerli bir şasi numarası giriniz')
    .max(17, 'Geçerli bir şasi numarası giriniz'),
  engineNumber: z.string()
    .min(8, 'Geçerli bir motor numarası giriniz'),
  customerId: z.string()
    .min(1, 'Müşteri seçilmelidir'),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = async (data: VehicleFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Vehicle data:', data);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    }
  };

  if (!isOpen) return null;

  // Mock customers for demonstration
  const mockCustomers = [
    { id: '1', fullName: 'Ahmet Yılmaz' },
    { id: '2', fullName: 'Ayşe Demir' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Yeni Araç Ekle
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Plaka"
                placeholder="34ABC123"
                {...register('licensePlate')}
                error={errors.licensePlate?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Marka"
                  placeholder="Mercedes"
                  {...register('make')}
                  error={errors.make?.message}
                />
                <Input
                  label="Model"
                  placeholder="C180"
                  {...register('model')}
                  error={errors.model?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Yıl"
                  placeholder="2024"
                  type="number"
                  {...register('year')}
                  error={errors.year?.message}
                />
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Müşteri
                  </label>
                  <select
                    className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    {...register('customerId')}
                  >
                    <option value="">Müşteri Seçin</option>
                    {mockCustomers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.fullName}
                      </option>
                    ))}
                  </select>
                  {errors.customerId && (
                    <p className="mt-1 text-sm text-error-500">{errors.customerId.message}</p>
                  )}
                </div>
              </div>

              <Input
                label="Şasi Numarası"
                placeholder="WDD2040012A123456"
                {...register('chassisNumber')}
                error={errors.chassisNumber?.message}
              />

              <Input
                label="Motor Numarası"
                placeholder="27192031"
                {...register('engineNumber')}
                error={errors.engineNumber?.message}
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
                  Araç Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;