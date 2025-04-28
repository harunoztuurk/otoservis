import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const customerSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir'),
  surname: z.string()
    .min(2, 'Soyisim en az 2 karakter olmalıdır')
    .max(50, 'Soyisim en fazla 50 karakter olabilir'),
  phone: z.string()
    .min(10, 'Geçerli bir telefon numarası giriniz')
    .max(20, 'Geçerli bir telefon numarası giriniz'),
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz'),
  address: z.string()
    .min(5, 'Adres en az 5 karakter olmalıdır')
    .max(200, 'Adres en fazla 200 karakter olabilir'),
});

type CustomerFormData = z.infer<typeof customerSchema>;

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (data: CustomerFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Customer data:', data);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Yeni Müşteri Ekle
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="İsim"
                  placeholder="Müşteri adı"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Soyisim"
                  placeholder="Müşteri soyadı"
                  {...register('surname')}
                  error={errors.surname?.message}
                />
              </div>

              <Input
                label="Telefon"
                placeholder="0532 123 4567"
                {...register('phone')}
                error={errors.phone?.message}
              />

              <Input
                label="E-posta"
                type="email"
                placeholder="ornek@email.com"
                {...register('email')}
                error={errors.email?.message}
              />

              <Input
                label="Adres"
                placeholder="Müşteri adresi"
                {...register('address')}
                error={errors.address?.message}
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
                  Müşteri Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;