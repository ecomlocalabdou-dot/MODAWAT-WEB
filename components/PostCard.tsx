
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link to={`/post/${post.slug}`} className="relative block h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
            {post.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('ar-EG')}
          </span>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
           <Link 
            to={`/post/${post.slug}`}
            className="text-primary font-bold text-sm flex items-center gap-1 group/btn"
           >
             اقرأ المزيد
             <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
