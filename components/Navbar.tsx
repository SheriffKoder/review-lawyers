"use client"
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import Link from 'next/link'
import { MainNav } from './navigation/MainNav';
import { NavActions } from './navigation/NavActions';
import { MenuButton } from './navigation/MenuButton';
import { MobileMenu } from './navigation/MobileMenu';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            aria-label="Review Lawyers+ Home"
          >
            <Shield className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
            <span className="text-lg font-semibold text-black dark:text-white whitespace-nowrap">
              Review Lawyers+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <MainNav className="hidden md:flex" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <NavActions className="hidden md:flex" />
            <MenuButton 
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  );
}