import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ChatMessage } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { VoiceInput } from './VoiceInput';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      content: "👋 Welcome! I'm your AI assistant. Ask me anything about getting started or try the quick actions below!", 
      isBot: true 
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: message, isBot: false }]);
    const userMessage = message;
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        content: `Thanks for your message! This is a demo response to: "${userMessage}"`,
        isBot: true
      }]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setMessages(prev => [
      ...prev,
      { content: action, isBot: false },
      { content: `Here's information about: ${action}`, isBot: true }
    ]);
  };

  const handleVoiceInput = (text: string) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-96 h-[500px]",
        "bg-black/90 backdrop-blur-lg",
        "border border-white/10 rounded-2xl",
        "shadow-2xl shadow-primary/20",
        "flex flex-col",
        "transform transition-all duration-300",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <QuickActions onActionClick={handleQuickAction} />
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} {...msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <VoiceInput onVoiceInput={handleVoiceInput} />
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className={cn(
              "flex-1 px-4 py-2 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-gray-500",
              "focus:outline-none focus:border-primary/50",
              "transition-colors"
            )}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={cn(
              "p-2 rounded-xl",
              "bg-primary text-black",
              "hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}