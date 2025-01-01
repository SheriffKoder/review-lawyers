import React from 'react';
import Link from 'next/link'
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation'

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}

export function MobileNavLink({ to, children, onClick }: MobileNavLinkProps) {
  const pathname = usePathname()  
  const isActive = location.pathname === to;

  return (
    <Link
    href={to}
      className={cn(
        "block px-4 py-2 text-base font-medium rounded-lg transition-all duration-200",
        "hover:bg-primary/10",
        isActive ? [
          "text-primary bg-primary/5",
          "border-l-2 border-primary"
        ] : "text-gray-400"
      )}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}