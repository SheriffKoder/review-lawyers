import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

export function ChatButton({ onClick, isOpen, unreadCount }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "p-4 rounded-full",
        "bg-primary text-black",
        "shadow-lg shadow-primary/25",
        "hover:shadow-xl hover:shadow-primary/30",
        "transform transition-all duration-300",
        "hover:scale-110",
        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      )}
      aria-label="Open chat"
    >
      <MessageSquareText className="w-6 h-6" />
      {unreadCount && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}