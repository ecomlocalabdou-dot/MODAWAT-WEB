
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, ChevronRight } from 'lucide-react';

interface LoginProps {
  onLogin: (password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      navigate('/admin');
    } else {
      setError('كلمة السر غير صحيحة!');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black">الدخول للوحة التحكم</h1>
          <p className="text-slate-500 mt-2">يرجى إدخال كلمة السر للاستمرار</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">كلمة السر</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 ring-primary"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            دخول آمن
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="w-full text-slate-500 text-sm flex items-center justify-center gap-1 hover:text-primary transition-colors"
          >
            <ChevronRight className="w-4 h-4" /> العودة للرئيسية
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
