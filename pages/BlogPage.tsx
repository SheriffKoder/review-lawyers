import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogCard } from '@/components/blog/BlogCard';

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader />
        
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}