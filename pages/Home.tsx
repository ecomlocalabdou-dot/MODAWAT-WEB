
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Post, Category } from '../types';
import PostCard from '../components/PostCard';
import AdSlot from '../components/AdSlot';
import { CATEGORIES } from '../constants';

interface HomeProps {
  posts: Post[];
  adsenseId: string;
}

const Home: React.FC<HomeProps> = ({ posts, adsenseId }) => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') as Category | null;

  const filteredPosts = posts
    .filter(p => p.isPublished)
    .filter(p => !activeCategory || p.category === activeCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Categories Bar */}
      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
        <button 
          onClick={() => window.history.replaceState(null, '', '/')}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${!activeCategory ? 'bg-primary text-white font-bold' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary'}`}
        >
          الكل
        </button>
        {CATEGORIES.map(cat => (
          <a 
            key={cat}
            href={`#/?category=${cat}`}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary text-white font-bold' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary'}`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Hero Featured */}
      {!activeCategory && featuredPost && (
        <section className="mb-12 relative h-[500px] rounded-3xl overflow-hidden group">
          <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 flex flex-col justify-end">
            <span className="w-fit px-4 py-1 bg-accent text-white rounded-full text-sm font-bold mb-4">{featuredPost.category}</span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 max-w-3xl leading-tight">
              {featuredPost.title}
            </h1>
            <p className="text-slate-200 mb-6 max-w-2xl text-lg line-clamp-2">
              {featuredPost.excerpt}
            </p>
            <a href={`#/post/${featuredPost.slug}`} className="w-fit bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105">
              اقرأ المقال بالكامل
            </a>
          </div>
        </section>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(activeCategory ? filteredPosts : otherPosts).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
               <p className="text-slate-500">لا توجد مقالات في هذا التصنيف حالياً.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              إعلان
            </h4>
            <AdSlot type="sidebar" adsenseId={adsenseId} />
          </div>

          <div className="bg-gradient-to-br from-primary to-blue-700 p-6 rounded-2xl text-white">
            <h4 className="font-bold text-xl mb-2">اشترك في القائمة البريدية</h4>
            <p className="text-blue-100 text-sm mb-4">كن أول من يحصل على أخبار المغرب والتقنية فور نشرها.</p>
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 text-white focus:outline-none focus:ring-2 ring-white/50 mb-3"
            />
            <button className="w-full bg-accent text-white font-bold py-2 rounded-lg hover:bg-orange-500 transition-colors">
              اشترك الآن
            </button>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <AdSlot type="banner" adsenseId={adsenseId} />
      </div>
    </div>
  );
};

export default Home;
