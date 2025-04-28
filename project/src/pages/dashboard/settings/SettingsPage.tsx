import React, { useState } from 'react';
import { Settings, Building2, Users, Bell, Shield, Printer, Mail } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

const SettingsPage: React.FC = () => {
  const [companyForm, setCompanyForm] = useState({
    name: 'Araç Servis Merkezi',
    taxNumber: '1234567890',
    phone: '0212 345 6789',
    email: 'info@aracservis.com',
    address: 'Merkez Mah. Servis Cad. No:1 Kadıköy/İstanbul',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    serviceReminders: true,
    paymentReminders: true,
    maintenanceAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
  });

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle company info update
    console.log('Company info updated:', companyForm);
  };

  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Building2 size={24} className="text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Firma Bilgileri</h2>
            </div>

            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <Input
                label="Firma Adı"
                value={companyForm.name}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, name: e.target.value }))}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Vergi Numarası"
                  value={companyForm.taxNumber}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, taxNumber: e.target.value }))}
                />
                <Input
                  label="Telefon"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <Input
                label="E-posta"
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, email: e.target.value }))}
              />

              <Input
                label="Adres"
                value={companyForm.address}
                onChange={(e) => setCompanyForm(prev => ({ ...prev, address: e.target.value }))}
              />

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Quick Settings */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Settings size={24} className="text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Hızlı Ayarlar</h2>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                icon={<Users size={18} />}
              >
                Kullanıcı Yönetimi
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                icon={<Printer size={18} />}
              >
                Yazıcı Ayarları
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                icon={<Mail size={18} />}
              >
                E-posta Şablonları
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Shield size={24} className="text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Güvenlik</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">İki Faktörlü Doğrulama</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={securitySettings.twoFactorAuth}
                    onChange={() => setSecuritySettings(prev => ({
                      ...prev,
                      twoFactorAuth: !prev.twoFactorAuth
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Oturum Zaman Aşımı (dakika)
                </label>
                <select
                  className="w-full rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    sessionTimeout: e.target.value
                  }))}
                >
                  <option value="15">15 dakika</option>
                  <option value="30">30 dakika</option>
                  <option value="60">1 saat</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Bell size={24} className="text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Bildirim Ayarları</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">E-posta Bildirimleri</h3>
                <p className="text-sm text-gray-500">Sistem bildirimleri için e-posta gönderimi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => handleNotificationToggle('emailNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">SMS Bildirimleri</h3>
                <p className="text-sm text-gray-500">Önemli bildirimler için SMS gönderimi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.smsNotifications}
                  onChange={() => handleNotificationToggle('smsNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Servis Hatırlatmaları</h3>
                <p className="text-sm text-gray-500">Yaklaşan servis randevuları için bildirimler</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.serviceReminders}
                  onChange={() => handleNotificationToggle('serviceReminders')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Ödeme Hatırlatmaları</h3>
                <p className="text-sm text-gray-500">Yaklaşan ve geciken ödemeler için bildirimler</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.paymentReminders}
                  onChange={() => handleNotificationToggle('paymentReminders')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;