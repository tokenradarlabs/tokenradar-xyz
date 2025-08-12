import Image from 'next/image';
import Link from 'next/link';

export function AuthSide() {
  return (
    <div className='hidden h-full flex-col items-center justify-center bg-gray-900 p-8 text-white lg:flex'>
      <Link href='/' className='mb-8 flex items-center gap-2'>
        <Image src='/logo.png' alt='TokenRadar.xyz' width={150} height={150} />
      </Link>
      <div className='text-center'>
        <h2 className='mb-4 text-3xl font-bold'>
          <span className='animate-gradient bg-gradient-to-r from-pink-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent'>
            Welcome to TokenRadar.xyz
          </span>
        </h2>

        <p className='text-gray-300'>
          Your one-stop solution for tracking cryptocurrency prices and setting
          up alerts.
        </p>
      </div>
    </div>
  );
}
