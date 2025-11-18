'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';
import { ThemeToggle } from './theme-toggle';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Price', icon: <span className='mr-1'>📈</span>, path: '/price' },
  {
    label: 'Percentage',
    icon: <span className='mr-1'>%</span>,
    path: '/priceAlert/percentage',
  },
  {
    label: 'Periodic',
    icon: <span className='mr-1'>⏱️</span>,
    path: '/priceAlert/periodic',
  },
  {
    label: 'Dominance',
    icon: <span className='mr-1'>🏆</span>,
    path: '/dominance',
  },
  {
    label: 'MarketCap',
    icon: <span className='mr-1'>🏷️</span>,
    path: '/marketCap',
  },
  { label: 'Volume', icon: <span className='mr-1'>📊</span>, path: '/volume' },
  {
    label: 'Coin Listing',
    icon: <span className='mr-1'>🪙</span>,
    path: '/priceAlert/coin-listing',
  },
];

export function Navbar() {
  const [active, setActive] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleTabClick = (idx: number, path: string) => {
    setActive(idx);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='sticky top-0 z-50'>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-[999] focus:rounded-br-lg focus:bg-white focus:p-3 focus:text-black'
      >
        Skip to main content
      </a>
      <nav
        className='w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-black/60'
        role='navigation'
        aria-label='Main navigation'
      >
        <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between px-3 py-2 sm:px-6 md:h-16 md:px-12 lg:px-20'>
          {/* Logo */}
          <div className='flex min-w-max items-center'>
            <Link
              href='/'
              className='flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              <Image
                src='/logo.png'
                alt='TokenRadar Logo'
                width={28}
                height={28}
                className='rounded-full'
              />
              <span className='bg-gradient-to-r from-[#a78bfa] via-[#6ee7ff] to-white bg-clip-text text-lg font-bold text-transparent'>
                TokenRadar-xyz
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='rounded-md p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              aria-controls='mobile-menu'
              aria-expanded={isMobileMenuOpen}
              aria-label='Toggle navigation menu'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                  ></path>
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop & Mobile) */}
          <div
            id='mobile-menu'
            className={`w-full md:flex md:w-auto md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          >
            <ul
              className='mt-4 flex flex-1 flex-col items-center justify-center md:mt-0 md:flex-row md:space-x-4'
              role='list'
            >
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    onClick={() => handleTabClick(idx, item.path)}
                    className={`flex items-center rounded-md px-3 py-2 text-left text-[0.95rem] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${active === idx ? 'bg-[#313440] font-semibold text-white shadow' : 'font-normal text-[#b2b7be] hover:bg-[#282b38] hover:text-white'}`}
                    aria-current={active === idx ? 'page' : undefined}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Login/Signup */}
            <div className='mt-4 flex flex-col items-center gap-2 md:mt-0 md:flex-row'>
              <ThemeToggle />
              <Button
                asChild
                variant='ghost'
                className='w-full text-sm font-medium text-[#b3b8c5] hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:w-auto'
              >
                <Link href='/login'>Login</Link>
              </Button>
              <Button
                asChild
                className='w-full bg-[#22d3ee] text-sm font-medium text-white hover:bg-[#0ea5e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:w-auto'
              >
                <Link href='/register'>Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
