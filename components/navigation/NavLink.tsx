import React from 'react';
import Link from 'next/link'
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, children, className }: NavLinkProps) {
  const pathname = usePathname()
    const isActive = location.pathname === to;

  return (
    <Link 
    href={to} 
      className={cn(
        "relative text-sm font-medium transition-colors duration-200",
        "hover:text-primary",
        // Active state styles
        isActive ? [
          "text-primary",
          "after:absolute after:bottom-0 after:left-0 after:right-0",
          "after:h-0.5 after:bg-primary",
          "after:animate-[expand_0.2s_ease-out_forwards]"
        ] : "text-gray-400",
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}