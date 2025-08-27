'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Price', icon: <span className='mr-1'>📈</span>, path: '/price' },
  { label: 'Percentage', icon: <span className='mr-1'>%</span>, path: '/priceAlert/percentage' },
  { label: 'Periodic', icon: <span className='mr-1'>⏱️</span>, path: '/priceAlert/periodic' },
  { label: 'Dominance', icon: <span className='mr-1'>🏆</span>, path: '/dominance' },
  { label: 'MarketCap', icon: <span className='mr-1'>🏷️</span>, path: '/marketCap' },
  { label: 'Volume', icon: <span className='mr-1'>📊</span>, path: '/volume' },
  { label: 'Coin Listing', icon: <span className='mr-1'>🪙</span>, path: '/priceAlert/coin-listing' },
];

export function Navbar() {
  const [active, setActive] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleTabClick = (idx: number, path: string) => {
    setActive(idx);
    setDropdownOpen(false);
    router.push(path);
  };

  return (
    <div className='sticky top-0 z-50'>
      <nav className='w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-opacity-60'>
        <div className='mx-auto flex max-w-7xl flex-col md:flex-row items-center px-3 sm:px-6 md:h-16 md:px-12 lg:px-20 gap-y-2'>
          {/* Logo */}
          <div className='flex min-w-max items-center'>
            <Link href='/' className='flex items-center gap-2'>
              <Image src='/logo.png' alt='TokenRadar Logo' width={28} height={28} className='rounded-full' />
              <span className='bg-gradient-to-r from-[#a78bfa] via-[#6ee7ff] to-white bg-clip-text text-lg font-bold text-transparent'>TokenRadar-xyz</span>
            </Link>
          </div>
          {/* Dropdown Menu */}
          <div className='flex-1 flex justify-center'>
            <div className='relative'>
              <button
                className='flex items-center rounded-lg bg-[#0ea5e9] px-4 py-2 font-medium text-white shadow-lg transition hover:bg-[#22d3ee]'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className='mr-2'>Menu</span>
                <svg width='22' height='22' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' strokeWidth='2' d='M6 9l6 6 6-6' /></svg>
              </button>
              {dropdownOpen && (
                <div className='absolute left-0 top-12 z-50 flex min-w-max flex-col rounded-xl border border-[#313440] bg-[#20232f] shadow-md'>
                  {NAV_ITEMS.map((item, idx) => (
                    <button
                      key={item.label}
                      onClick={() => handleTabClick(idx, item.path)}
                      className={`flex w-full items-center rounded-md px-4 py-2 text-left font-medium text-[0.95rem] transition focus:outline-none
                        ${active === idx ? 'bg-[#313440] text-white shadow font-semibold' : 'text-[#b2b7be] hover:bg-[#282b38] hover:text-white font-normal'}`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Login/Signup */}
          <div className='flex min-w-max items-center gap-2'>
            <Link href='/login'>
              <Button variant='ghost' className='text-sm font-medium text-[#b3b8c5] hover:bg-white/10 hover:text-white'>Login</Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-[#22d3ee] text-sm font-medium text-white hover:bg-[#0ea5e9]'>Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
