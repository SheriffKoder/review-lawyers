import React from 'react';
import Link from 'next/link'
import { footerLinks } from '@/data/footer';

export function FooterLinks() {
  return (
    <>
      {footerLinks.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  className="text-gray-400 hover:text-primary opacity-70 hover:opacity-100 transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}