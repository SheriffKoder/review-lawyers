import React from 'react';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import { cn } from '@/utils/cn';

// Custom TikTok icon component
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function SocialLinks() {
  const socialLinks = [
    { 
      id: 'linkedin',
      icon: Linkedin,
      href: 'https://linkedin.com/',
      label: 'LinkedIn'
    },
    {
      id: 'tiktok',
      icon: TikTokIcon,
      href: 'https://tiktok.com/',
      label: 'TikTok'
    },
    {
      id: 'instagram',
      icon: Instagram,
      href: 'https://instagram.com/',
      label: 'Instagram'
    },
    {
      id: 'youtube',
      icon: Youtube,
      href: 'https://youtube.com/',
      label: 'Youtube'
    }
  ];

  return (
    <ul className="example-2 flex-row gap-2">
      {socialLinks.map(({ id, icon: Icon, href, label }) => (
        <li key={id} className="icon-content">
          <a href={href} aria-label={label} data-social={id} target="_blank" rel="noopener noreferrer">
            <div className="filled" />
            <Icon className="w-5 h-5" />
          </a>
          <div className="tooltip">{label}</div>
        </li>
      ))}
    </ul>
  );
}