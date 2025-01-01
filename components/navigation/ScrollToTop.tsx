import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollTo } from '@/hooks/useScrollTo';
import { cn } from '@/utils/cn';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useScrollTo();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 left-6 z-50",
        "p-3 rounded-full",
        "bg-primary text-black",
        "shadow-lg shadow-primary/25",
        "hover:shadow-xl hover:shadow-primary/30",
        "transform transition-all duration-300",
        "hover:scale-110",
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}