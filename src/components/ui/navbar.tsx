import Link from 'next/link';
import Image from 'next/image';
import { Button } from './button';

export function Navbar() {
  return (
    <div className='sticky top-0 z-50'>
      <nav className='w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-opacity-60'>
        <div className='mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-12'>
          {/* Left Logo / Name */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center gap-2'>
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

          {/* Right Login / Signup */}
          <div className='flex items-center gap-2'>
            <Link href='/login'>
              <Button
                variant='ghost'
                className='text-sm font-medium text-[#b3b8c5] hover:bg-white/10 hover:text-white'
              >
                Login
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-[#22d3ee] text-sm font-medium text-white hover:bg-[#0ea5e9]'>
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
