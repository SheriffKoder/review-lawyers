import React from 'react';
import { Shield } from 'lucide-react';
import Link from 'next/link'
import { FooterLinks } from './FooterLinks';

export function FooterContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1">
        <Link href="/" className="flex items-center group">
          <Shield className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <span className="ml-2 text-xl font-bold text-white opacity-70 group-hover:opacity-100 transition-opacity">
            ReviewPro+
          </span>
        </Link>
        <p className="mt-4 text-gray-400 opacity-70 hover:opacity-100 transition-opacity">
          Protecting your rental business reputation with advanced review management.
        </p>
      </div>
      <FooterLinks />
    </div>
  );
}