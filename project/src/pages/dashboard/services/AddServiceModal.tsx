import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceItemSchema = z.object({
  description: z.string().min(1, 'Açıklama gereklidir'),
  type: z.enum(['labor', 'part'], {
    required_error: 'Tür seçilmelidir',
  }),
  cost: z.string().min(1, 'Tutar gereklidir'),
});

const serviceSchema = z.object({
  vehicleId: z.string().min(1, 'Araç seçilmelidir'),
  description: z.string().min(1, 'Servis açıklaması gereklidir'),
  estimatedCompletionDate: z.string().min(1, 'Tahmini tamamlanma tarihi gereklidir'),
  priority: z.enum(['low', 'normal', 'high', 'urgent'], {
    required_error: 'Öncelik seçilmelidir',
  }),
  technicianId: z.string().min(1, 'Teknisyen seçilmelidir'),
  serviceItems: z.array(serviceItemSchema).min(1, 'En az bir servis kalemi eklenmelidir'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose }) => {
  const [serviceItems, setServiceItems] = useState<Array<{ description: string; type: 'labor' | 'part'; cost: string }>>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceItems: [],
    },
  });

  const onSubmit = async (data: ServiceFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Service data:', data);
      reset();
      setServiceItems([]);
      onClose();
    } catch (error) {
      console.error('Failed to add service:', error);
    }
  };

  const addServiceItem = () => {
    setServiceItems([...serviceItems, { description: '', type: 'labor', cost: '' }]);
  };

  const removeServiceItem = (index: number) => {
    setServiceItems(serviceItems.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  // Mock data for demonstration
  const mockVehicles = [
    { id: '1', licensePlate: '34ABC123', customer: 'Ahmet Yılmaz' },
    { id: '2', licensePlate: '34DEF456', customer: 'Ayşe Demir' },
  ];

  const mockTechnicians = [
    { id: '1', name: 'Mehmet Usta' },
    { id: '2', name: 'Ali Usta' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Yeni Servis Kaydı
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
                  Araç
                </label>
                <select
                  className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('vehicleId')}
                >
                  <option value="">Araç Seçin</option>
                  {mockVehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.licensePlate} - {vehicle.customer}
                    </option>
                  ))}
                </select>
                {errors.vehicleId && (
                  <p className="mt-1 text-sm text-error-500">{errors.vehicleId.message}</p>
                )}
              </div>

              <Input
                label="Servis Açıklaması"
                placeholder="Servis detaylarını girin"
                {...register('description')}
                error={errors.description?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Tahmini Tamamlanma Tarihi"
                  type="date"
                  {...register('estimatedCompletionDate')}
                  error={errors.estimatedCompletionDate?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Öncelik
                  </label>
                  <select
                    className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    {...register('priority')}
                  >
                    <option value="">Öncelik Seçin</option>
                    <option value="low">Düşük</option>
                    <option value="normal">Normal</option>
                    <option value="high">Yüksek</option>
                    <option value="urgent">Acil</option>
                  </select>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-error-500">{errors.priority.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teknisyen
                </label>
                <select
                  className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('technicianId')}
                >
                  <option value="">Teknisyen Seçin</option>
                  {mockTechnicians.map(technician => (
                    <option key={technician.id} value={technician.id}>
                      {technician.name}
                    </option>
                  ))}
                </select>
                {errors.technicianId && (
                  <p className="mt-1 text-sm text-error-500">{errors.technicianId.message}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Servis Kalemleri
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={addServiceItem}
                  >
                    Kalem Ekle
                  </Button>
                </div>

                <div className="space-y-3">
                  {serviceItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Input
                        placeholder="Açıklama"
                        {...register(`serviceItems.${index}.description`)}
                        error={errors.serviceItems?.[index]?.description?.message}
                      />
                      <select
                        className="rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        {...register(`serviceItems.${index}.type`)}
                      >
                        <option value="labor">İşçilik</option>
                        <option value="part">Parça</option>
                      </select>
                      <Input
                        type="number"
                        placeholder="Tutar"
                        {...register(`serviceItems.${index}.cost`)}
                        error={errors.serviceItems?.[index]?.cost?.message}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-error-600 hover:text-error-700"
                        onClick={() => removeServiceItem(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.serviceItems && (
                  <p className="mt-1 text-sm text-error-500">{errors.serviceItems.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setServiceItems([]);
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
                  Servis Kaydı Oluştur
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;