import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, Link as LinkIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';
import {doSignOut} from "@/firebase/auth.js";


export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
   

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    doSignOut();
    redirect('/login');
  };

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-10 h-10 rounded-full",
          "bg-primary text-black",
          "flex items-center justify-center",
          "font-semibold text-lg",
          "hover:bg-primary/90",
          "transition-colors duration-200"
        )}
      >
        {user.name?.[0]?.toUpperCase() || 'U'}
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 mt-2 w-48",
          "bg-black border border-white/10 rounded-xl",
          "shadow-xl shadow-primary/10",
          "backdrop-blur-xl",
          "py-2",
          "z-50"
        )}>
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-white font-medium truncate">{user.name}</p>
            <p className="text-sm text-gray-400 truncate">{user.email}</p>
          </div>

          <div className="py-2">
            <button
              onClick={() => redirect('/account')}
              className="w-full px-4 py-2 text-left text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Account
            </button>
            
            <button
              onClick={() => redirect('/integrations')}
              className="w-full px-4 py-2 text-left text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <LinkIcon className="w-4 h-4" />
              Integrations
            </button>
          </div>

          <div className="border-t border-white/10 pt-2">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}