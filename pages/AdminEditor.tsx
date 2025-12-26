
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Post, Category } from '../types';
import { CATEGORIES } from '../constants';
import { generateExcerpt, suggestTitle } from '../services/geminiService';

interface AdminEditorProps {
  posts: Post[];
  onSave: (post: Post) => void;
}

const AdminEditor: React.FC<AdminEditorProps> = ({ posts, onSave }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const existingPost = posts.find(p => p.id === id);

  const [formData, setFormData] = React.useState<Partial<Post>>(
    existingPost || {
      title: '',
      content: '',
      excerpt: '',
      category: 'أخبار المغرب' as Category,
      image: 'https://picsum.photos/800/400',
      isPublished: true,
      adSlotEnabled: true,
      affiliateLinks: []
    }
  );

  const [isPreview, setIsPreview] = React.useState(false);
  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddAffiliate = () => {
    setFormData(prev => ({
      ...prev,
      affiliateLinks: [...(prev.affiliateLinks || []), { label: '', url: '' }]
    }));
  };

  const handleAffiliateChange = (idx: number, field: 'label' | 'url', value: string) => {
    const newLinks = [...(formData.affiliateLinks || [])];
    newLinks[idx][field] = value;
    setFormData(prev => ({ ...prev, affiliateLinks: newLinks }));
  };

  const handleRemoveAffiliate = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      affiliateLinks: prev.affiliateLinks?.filter((_, i) => i !== idx)
    }));
  };

  const handleAiOptimize = async () => {
    if (!formData.content || formData.content.length < 50) {
      alert('الرجاء كتابة محتوى كافٍ أولاً.');
      return;
    }
    setIsAiLoading(true);
    try {
      const excerpt = await generateExcerpt(formData.content);
      const title = await suggestTitle(formData.content);
      setFormData(prev => ({ ...prev, excerpt, title: prev.title || title }));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\u0600-\u06FFa-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const finalPost: Post = {
      ...(formData as Post),
      id: id || Math.random().toString(36).substr(2, 9),
      slug,
      date: formData.date || new Date().toISOString(),
      author: 'عبدو'
    };

    onSave(finalPost);
    navigate('/admin');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black">{id ? 'تعديل المقال' : 'مقال جديد'}</h1>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${isPreview ? 'bg-accent text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
          >
            <Eye className="w-5 h-5" />
            {isPreview ? 'تعديل المحتوى' : 'معاينة المقال'}
          </button>
        </div>
      </div>

      {isPreview ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
           <div className="max-w-2xl mx-auto">
              <span className="text-primary font-bold">{formData.category}</span>
              <h1 className="text-4xl font-black mt-4 mb-6">{formData.title || 'بدون عنوان'}</h1>
              <img src={formData.image} className="w-full h-80 object-cover rounded-2xl mb-8" alt="" />
              <div className="prose dark:prose-invert prose-rtl max-w-none" dangerouslySetInnerHTML={{ __html: formData.content || 'لا يوجد محتوى...' }} />
           </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">عنوان المقال</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="أدخل عنواناً جذاباً..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 ring-primary"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold">محتوى المقال (HTML)</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={handleAiOptimize} disabled={isAiLoading} className="text-xs flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                      <Sparkles className="w-3 h-3" />
                      {isAiLoading ? 'جاري التحسين...' : 'تحسين الذكاء الاصطناعي'}
                    </button>
                  </div>
                </div>
                <textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  placeholder="اكتب محتوى المقال هنا... يمكنك استخدام وسوم HTML للتنسيق"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 ring-primary font-mono text-sm leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">وصف قصير (للـ SEO)</label>
                <textarea 
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 ring-primary"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">روابط الأفلييت</h3>
                <button type="button" onClick={handleAddAffiliate} className="text-primary text-sm font-bold flex items-center gap-1">
                  <Plus className="w-4 h-4" /> إضافة رابط
                </button>
              </div>
              <div className="space-y-4">
                {formData.affiliateLinks?.map((link, idx) => (
                  <div key={idx} className="flex gap-2 items-end">
                    <div className="flex-grow grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="نص الزر"
                        value={link.label}
                        onChange={(e) => handleAffiliateChange(idx, 'label', e.target.value)}
                        className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm"
                      />
                      <input 
                        type="url" 
                        placeholder="رابط الأفلييت"
                        value={link.url}
                        onChange={(e) => handleAffiliateChange(idx, 'url', e.target.value)}
                        className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm"
                      />
                    </div>
                    <button type="button" onClick={() => handleRemoveAffiliate(idx)} className="p-2 text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-500">التصنيف</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-500">رابط صورة المقال</label>
                <div className="relative">
                  <input 
                    type="url" 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none"
                  />
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
                <img src={formData.image} className="mt-4 w-full h-32 object-cover rounded-xl" alt="معاينة" />
              </div>

              <div className="pt-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData(prev => ({...prev, isPublished: e.target.checked}))}
                      className="w-5 h-5 rounded accent-primary"
                    />
                    <span className="font-bold text-sm">نشر المقال فوراً</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="adSlotEnabled"
                      checked={formData.adSlotEnabled}
                      onChange={(e) => setFormData(prev => ({...prev, adSlotEnabled: e.target.checked}))}
                      className="w-5 h-5 rounded accent-primary"
                    />
                    <span className="font-bold text-sm">تفعيل مساحات إعلانية</span>
                 </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all mt-4"
              >
                <Save className="w-6 h-6" />
                حفظ المقال
              </button>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
};

export default AdminEditor;
