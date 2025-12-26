
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor from './pages/AdminEditor';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import { Post, SiteSettings, AppState } from './types';
import { 
  getStoredPosts, 
  savePosts, 
  getStoredSettings, 
  saveSettings, 
  getStoredTheme, 
  saveTheme 
} from './utils/storage';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setPosts(getStoredPosts());
    // Auto login for demo purposes if stored session found (optional enhancement)
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const handleLogin = (password: string) => {
    if (password === settings.adminPassword) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSavePost = (post: Post) => {
    const index = posts.findIndex(p => p.id === post.id);
    let newPosts: Post[];
    if (index > -1) {
      newPosts = [...posts];
      newPosts[index] = post;
    } else {
      newPosts = [post, ...posts];
    }
    setPosts(newPosts);
    savePosts(newPosts);
  };

  const handleDeletePost = (id: string) => {
    const newPosts = posts.filter(p => p.id !== id);
    setPosts(newPosts);
    savePosts(newPosts);
  };

  const handleTogglePublish = (id: string) => {
    const newPosts = posts.map(p => 
      p.id === id ? { ...p, isPublished: !p.isPublished } : p
    );
    setPosts(newPosts);
    savePosts(newPosts);
  };

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <Router>
      <Layout 
        settings={settings} 
        theme={theme} 
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home posts={posts} adsenseId={settings.adsenseId} />} />
          <Route path="/post/:slug" element={<PostDetail posts={posts} settings={settings} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />} />

          {/* Admin Routes (Protected) */}
          <Route 
            path="/admin" 
            element={isLoggedIn ? (
              <AdminDashboard 
                posts={posts} 
                onDelete={handleDeletePost} 
                onTogglePublish={handleTogglePublish} 
              />
            ) : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/editor" 
            element={isLoggedIn ? (
              <AdminEditor posts={posts} onSave={handleSavePost} />
            ) : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/editor/:id" 
            element={isLoggedIn ? (
              <AdminEditor posts={posts} onSave={handleSavePost} />
            ) : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/settings" 
            element={isLoggedIn ? (
              <AdminSettings settings={settings} onSave={handleSaveSettings} />
            ) : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
