import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, LogIn } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const loginSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı gereklidir'),
  password: z.string().min(1, 'Şifre gereklidir'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, authState } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.username, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Error is handled in AuthContext
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Giriş Yap</h2>

      {authState.error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded text-error-700">
          {authState.error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="username"
          label="Kullanıcı Adı"
          placeholder="Kullanıcı adınızı girin"
          icon={<User size={18} className="text-gray-500" />}
          {...register('username')}
          error={errors.username?.message}
        />

        <div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            label="Şifre"
            placeholder="Şifrenizi girin"
            icon={<LogIn size={18} className="text-gray-500" />}
            {...register('password')}
            error={errors.password?.message}
          />
          <div className="mt-1 flex items-center">
            <input
              id="show-password"
              type="checkbox"
              className="h-4 w-4 text-primary-600 border-gray-300 rounded"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password" className="ml-2 block text-sm text-gray-600">
              Şifreyi göster
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Giriş Yap
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Demo kullanıcılar:</p>
        <p className="font-medium">Yönetici: admin / admin123</p>
        <p className="font-medium">Personel: personel / personel123</p>
      </div>
    </div>
  );
};

export default LoginPage;