
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Settings as SettingsIcon, 
  LogOut, 
  Search,
  LayoutDashboard
} from 'lucide-react';
import { SiteSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  settings, 
  theme, 
  toggleTheme, 
  isLoggedIn, 
  onLogout 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-black text-primary dark:text-blue-400 tracking-tighter">
                  {settings.title.split(' - ')[0]}
                  <span className="text-accent">.</span>
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6 mr-8">
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">الرئيسية</Link>
                <Link to="/?category=أخبار المغرب" className="text-sm font-medium hover:text-primary transition-colors">أخبار المغرب</Link>
                <Link to="/?category=تقنية" className="text-sm font-medium hover:text-primary transition-colors">تقنية</Link>
                <Link to="/?category=أفلييت" className="text-sm font-medium hover:text-primary transition-colors">أفلييت</Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link to="/admin" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-primary">
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                  <button onClick={onLogout} className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-bold px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all">
                  دخول
                </Link>
              )}

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
            <Link to="/" className="block text-lg font-medium py-2">الرئيسية</Link>
            <Link to="/?category=أخبار المغرب" className="block text-lg font-medium py-2">أخبار المغرب</Link>
            <Link to="/?category=تقنية" className="block text-lg font-medium py-2">تقنية</Link>
            <Link to="/?category=تطوير الذات" className="block text-lg font-medium py-2">تطوير الذات</Link>
            {isLoggedIn && (
               <Link to="/admin" className="block text-lg font-medium py-2 text-primary">لوحة التحكم</Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{settings.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            {settings.description}
          </p>
          <div className="flex justify-center gap-6 mb-8 text-slate-500">
            <a href="#" className="hover:text-primary">فيسبوك</a>
            <a href="#" className="hover:text-primary">تويتر</a>
            <a href="#" className="hover:text-primary">انستغرام</a>
          </div>
          <p className="text-sm text-slate-500">
            {settings.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
