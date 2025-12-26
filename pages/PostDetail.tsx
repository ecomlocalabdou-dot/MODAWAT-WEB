
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, User, Tag, Share2, Facebook, Twitter, MessageSquare, ExternalLink } from 'lucide-react';
import { Post, SiteSettings } from '../types';
import AdSlot from '../components/AdSlot';

interface PostDetailProps {
  posts: Post[];
  settings: SiteSettings;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, settings }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/" />;

  const shareUrl = window.location.href;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-10 text-center">
        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4 inline-block">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {new Date(post.date).toLocaleDateString('ar-EG')}
          </span>
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            0 تعليقات
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Social */}
        <div className="lg:col-span-1 hidden lg:flex flex-col gap-4 sticky top-24 h-fit">
          <button className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-sky-400 text-white hover:scale-110 transition-transform">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:scale-110 transition-transform">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="lg:col-span-11">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-rtl prose-headings:font-black prose-a:text-primary leading-loose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Ad Slot */}
          {post.adSlotEnabled && (
            <div className="my-10">
              <AdSlot type="banner" adsenseId={settings.adsenseId} />
            </div>
          )}

          {/* Affiliate Links Section */}
          {post.affiliateLinks && post.affiliateLinks.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-primary/20 mt-12">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-accent" />
                روابط شراء مقترحة (أفلييت)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.affiliateLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group"
                  >
                    <span className="font-bold">{link.label}</span>
                    <span className="text-primary group-hover:translate-x-[-4px] transition-transform">اطلب الآن ←</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags / Meta */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <span className="font-bold">التصنيف:</span>
            <Link to={`/?category=${post.category}`} className="px-4 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm hover:bg-primary hover:text-white transition-colors">
              {post.category}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
