import React from 'react';
import { NavLink } from './NavLink';
import { NavDropdown } from './NavDropdown';
import { SearchBar } from './SearchBar';
import { cn } from '@/utils/cn';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const servicesItems = [
    {
      label: 'Overview',
      href: '/services',
      description: 'Explore our complete range of services'
    },
    // {
    //   label: 'Rental Properties',
    //   href: '/short-term-rentals',
    //   description: 'Review management for rental businesses'
    // },
    // {
    //   label: 'Restaurants',
    //   href: '/restaurant',
    //   description: 'Protect your restaurant\'s reputation'
    // },
    {
      label: 'Demo Dashboard',
      href: '/dashboard',
      description: 'Try our interactive demo dashboard'
    },
    {
      label: 'Case Studies',
      href: '/case-studies',
      description: 'See our success stories'
    }
  ];

  const featuresItems = [
    {
      label: 'Overview',
      href: '/features',
      description: 'Explore all features'
    },
    {
      label: 'Product Roadmap',
      href: '/roadmap',
      description: 'See what we\'re building'
    },
    // {
    //   label: 'AI Analysis',
    //   href: '/features#ai-analysis',
    //   description: 'Advanced review analysis with AI'
    // },
    // {
    //   label: 'Review Defense',
    //   href: '/features#review-defense',
    //   description: 'Professional review removal service'
    // }
  ];

  return (
    <nav className={cn("flex items-center gap-4", className)}>
      <NavDropdown label="Services" items={servicesItems} />
      <NavDropdown label="Features" items={featuresItems} />
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      
      {/* <SearchBar 
        className="ml-4 w-64" 
        placeholder="Search features, docs..."
        onSearch={console.log}
      /> */}
    </nav>
  );
}