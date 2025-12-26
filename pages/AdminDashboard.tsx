
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  FileText,
  CheckCircle,
  XCircle,
  Settings as SettingsIcon
} from 'lucide-react';
import { Post } from '../types';

interface AdminDashboardProps {
  posts: Post[];
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ posts, onDelete, onTogglePublish }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1">لوحة التحكم</h1>
          <p className="text-slate-500">مرحباً عبدو، لديك {posts.length} مقال حالياً.</p>
        </div>
        <div className="flex gap-2">
           <Link to="/admin/settings" className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl hover:bg-slate-200 transition-colors">
            <SettingsIcon className="w-5 h-5" />
          </Link>
          <Link to="/admin/editor" className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all">
            <Plus className="w-5 h-5" />
            إضافة مقال جديد
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="ابحث في المقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 ring-primary border-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm uppercase">
                <th className="px-6 py-4 font-bold">المقال</th>
                <th className="px-6 py-4 font-bold">التصنيف</th>
                <th className="px-6 py-4 font-bold text-center">الحالة</th>
                <th className="px-6 py-4 font-bold">التاريخ</th>
                <th className="px-6 py-4 font-bold text-center">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={post.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      <div className="max-w-xs truncate font-bold">{post.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onTogglePublish(post.id)}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${post.isPublished ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}
                    >
                      {post.isPublished ? (
                        <><CheckCircle className="w-3 h-3" /> منشور</>
                      ) : (
                        <><XCircle className="w-3 h-3" /> مسودة</>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <Link to={`/post/${post.slug}`} className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link to={`/admin/editor/${post.id}`} className="p-2 text-slate-400 hover:text-secondary transition-colors">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => {
                          if (confirm('هل أنت متأكد من حذف هذا المقال؟')) onDelete(post.id);
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    لا توجد مقالات مطابقة للبحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
