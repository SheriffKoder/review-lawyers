import React from 'react';
import { Clock, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={cn(
      "group bg-white dark:bg-gray-800 rounded-xl overflow-hidden",
      "transform transition-all duration-300",
      "hover:shadow-xl hover:shadow-primary/10",
      "hover:-translate-y-1",
      "border border-transparent hover:border-primary/20"
    )}>
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            "px-3 py-1 text-sm rounded-full",
            "bg-primary/10 text-primary",
            "transition-colors duration-300",
            "group-hover:bg-primary/20"
          )}>
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center group/author">
            <User className="h-4 w-4 text-gray-500 mr-2 transition-colors group-hover/author:text-primary" />
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors group-hover/author:text-primary">
              {post.author}
            </span>
          </div>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
      </div>
    </article>
  );
}