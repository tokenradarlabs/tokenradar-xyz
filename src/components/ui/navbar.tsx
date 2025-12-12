'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from './button';
import { ThemeToggle } from './theme-toggle';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './drawer';
import { MenuIcon, XIcon } from 'lucide-react';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);


  const handleTabClick = (idx: number) => {
    setActive(idx);
    setIsDrawerOpen(false);
  };


  return (
    <div className='sticky top-0 z-50'>
      {isLoading && (
        <div className='fixed left-0 top-0 z-[9999] h-[3px] w-full animate-pulse bg-blue-500'></div>
      )}
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
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-white'
              onClick={() => setIsDrawerOpen(true)}
              aria-label='Open navigation menu'
            >
              <MenuIcon className='h-5 w-5' />
            </Button>
          </div>

          {/* Desktop Navigation Links */}
          <div className='hidden w-full md:flex md:w-auto md:items-center'>
            <ul
              className='mt-4 flex flex-1 flex-col items-center justify-center md:mt-0 md:flex-row md:space-x-4'
              role='list'
            >
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    onClick={() => handleTabClick(idx)}
                    className={`flex items-center rounded-md px-3 py-2 text-left text-[0.95rem] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      active === idx
                        ? 'bg-[#313440] font-semibold text-white shadow'
                        : 'font-normal text-[#b2b7be] hover:bg-[#282b38] hover:text-white'
                    }`}
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

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent className='w-64'>
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-4 top-4 h-8 w-8'
              onClick={() => setIsDrawerOpen(false)}
            >
              <XIcon className='h-5 w-5' />
            </Button>
          </DrawerHeader>
          <ul className='flex flex-col gap-1 p-4' role='list'>
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.label}>
                <Link
                  href={item.path}
                  onClick={() => handleTabClick(idx)}
                  className={`flex items-center rounded-md px-3 py-2 text-left text-[0.95rem] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    active === idx
                      ? 'bg-[#313440] font-semibold text-white shadow'
                      : 'font-normal text-[#b2b7be] hover:bg-[#282b38] hover:text-white'
                  }`}
                  aria-current={active === idx ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className='mt-auto flex flex-col items-center gap-2 p-4'>
            <ThemeToggle />
            <Button
              asChild
              variant='ghost'
              className='w-full text-sm font-medium text-[#b3b8c5] hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              <Link href='/login'>Login</Link>
            </Button>
            <Button
              asChild
              className='w-full bg-[#22d3ee] text-sm font-medium text-white hover:bg-[#0ea5e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              <Link href='/register'>Sign up</Link>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
