import React from 'react';
import { cn } from '@/utils/cn';

interface ChatMessageProps {
  content: string;
  isBot: boolean;
  className?: string;
}

export function ChatMessage({ content, isBot, className }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isBot ? "justify-start" : "justify-end",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isBot ? [
            "bg-white/10 text-white",
            "rounded-tl-none"
          ] : [
            "bg-primary text-black",
            "rounded-tr-none"
          ]
        )}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}