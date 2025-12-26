
import React from 'react';
import { Save, Globe, Shield, DollarSign, Layout } from 'lucide-react';
import { SiteSettings } from '../types';

interface AdminSettingsProps {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = React.useState<SiteSettings>(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    alert('تم حفظ الإعدادات بنجاح!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8">إعدادات الموقع</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            الإعدادات العامة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2">اسم الموقع</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2">رابط الشعار (Logo)</label>
              <input 
                type="text" 
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">وصف الموقع (Meta Description)</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* AdSense Settings */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-accent" />
            إعلانات Google AdSense
          </h2>
          <div>
            <label className="block text-sm font-bold mb-2">معرف الناشر (AdSense Publisher ID)</label>
            <input 
              type="text" 
              name="adsenseId"
              value={formData.adsenseId}
              onChange={handleChange}
              placeholder="pub-xxxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono"
            />
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            الأمان والحماية
          </h2>
          <div>
            <label className="block text-sm font-bold mb-2">كلمة سر لوحة التحكم</label>
            <input 
              type="password" 
              name="adminPassword"
              value={formData.adminPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl"
            />
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Layout className="w-6 h-6 text-secondary" />
            التذييل (Footer)
          </h2>
          <div>
            <label className="block text-sm font-bold mb-2">نص الحقوق في التذييل</label>
            <input 
              type="text" 
              name="footerText"
              value={formData.footerText}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-6 h-6" />
          حفظ كافة الإعدادات
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
