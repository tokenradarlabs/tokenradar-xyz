'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const CURRENT_PRICES = {
  btc: 116238.21,
  eth: 2250.75,
  'scout-protocol-token': 0.328,
};

const COINS = [
  { value: 'btc', label: 'BTC', icon: '/btc.svg' },
  { value: 'eth', label: 'ETH', icon: null },
  { value: 'scout-protocol-token', label: 'DEV', icon: null },
];

export function PriceAlertForm() {
  const [priceError, setPriceError] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<string>('btc');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);

    if (Number(value) < 0) {
      setPriceError('Price cannot be negative');
    } else {
      setPriceError('');
    }
  };

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    setPrice(CURRENT_PRICES[value as keyof typeof CURRENT_PRICES].toString());
    setIsDropdownOpen(false);
  };

  const handleSetAlert = () => {
    if (!priceError && price) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, COINS.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      event.preventDefault();
      handleTokenChange(COINS[highlightedIndex].value);
    }
  };

  React.useEffect(() => {
    if (highlightedIndex !== -1 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.focus();
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  return (
    <div className='relative mx-auto flex w-full max-w-2xl flex-col items-center'>
      {showSuccess && (
        <div className='absolute left-0 right-0 top-0 mb-4 -translate-y-full transform rounded-lg bg-green-500/10 p-4 text-center text-green-500'>
          <div className='flex items-center justify-center gap-2'>
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              />
            </svg>
            <span>Alert set successfully!</span>
          </div>
        </div>
      )}

      <div className='mb-4 flex items-center gap-3'>
        <div className='rounded-lg bg-pink-500/10 p-2.5'>
          <svg
            className='h-6 w-6 text-pink-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M3 17L9 11L13 15L21 7' />
          </svg>
        </div>
        <h1 className='text-2xl font-bold text-pink-500'>Price Alert</h1>
      </div>

      <p className='mb-8 text-center text-gray-400'>
        Real-time price tracking with high-precision alerts for your crypto
        assets.
      </p>

      <div className='mb-4 grid w-full max-w-lg grid-cols-1 gap-6'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3'>
          <span className='mb-2 min-w-[100px] text-gray-300 md:mb-0 md:min-w-[120px]'>
            Send me an
          </span>
          <Select defaultValue='email'>
            <SelectTrigger className='h-10 w-full border-[#2a3042] bg-[#1a1f2e] text-white [&>*]:text-white'>
              <SelectValue placeholder='Select notification' />
            </SelectTrigger>
            <SelectContent className='border-[#2a3042] bg-[#1a1f2e]'>
              <SelectItem value='email' className='text-white'>
                Email
              </SelectItem>
              <SelectItem value='telegram' className='text-white'>
                Telegram
              </SelectItem>
              <SelectItem value='discord' className='text-white'>
                Discord
              </SelectItem>
              <SelectItem value='slack' className='text-white'>
                Slack
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3'>
          <span className='mb-2 min-w-[100px] text-gray-300 md:mb-0 md:min-w-[120px]'>
            as soon as
          </span>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='h-10 w-full justify-between border-[#2a3042] bg-[#1a1f2e] text-white [&>*]:text-white'
              >
                <div className='flex items-center gap-2'>
                  {selectedToken === 'btc' && (
                    <Image src='/btc.svg' alt='BTC' width={16} height={16} />
                  )}
                  {selectedToken === 'eth' && 'ETH'}
                  {selectedToken === 'scout-protocol-token' && 'DEV'}
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-4 w-4 opacity-50'
                >
                  <path d='M6 9l6 6 6-6' />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width]'
              onKeyDown={handleKeyDown}
            >
              {COINS.map((coin, index) => (
                <DropdownMenuItem
                  key={coin.value}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onClick={() => handleTokenChange(coin.value)}
                  isHighlighted={highlightedIndex === index}
                  className='text-white'
                >
                  {coin.icon && (
                    <Image
                      src={coin.icon}
                      alt={coin.label}
                      width={16}
                      height={16}
                    />
                  )}
                  {coin.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3'>
          <span className='mb-2 min-w-[100px] text-gray-300 md:mb-0 md:min-w-[120px]'>
            goes
          </span>
          <Select defaultValue='above'>
            <SelectTrigger className='h-10 w-full border-[#2a3042] bg-[#1a1f2e] text-white [&>*]:text-white'>
              <SelectValue placeholder='Select direction' />
            </SelectTrigger>
            <SelectContent className='border-[#2a3042] bg-[#1a1f2e]'>
              <SelectItem value='above' className='text-white'>
                above
              </SelectItem>
              <SelectItem value='below' className='text-white'>
                below
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-3'>
          <span className='mb-2 min-w-[100px] text-gray-300 md:mb-0 md:min-w-[120px]'>
            the price of
          </span>
          <div className='flex flex-1 gap-3'>
            <div className='flex-1'>
              <Input
                type='number'
                value={price}
                onChange={handlePriceChange}
                placeholder='0.00'
                className={`h-10 w-full border-[#2a3042] bg-[#1a1f2e] text-white placeholder:text-gray-500 ${priceError ? 'border-red-500' : ''}`}
              />
              {priceError && (
                <p className='mt-1 text-sm text-red-500'>{priceError}</p>
              )}
            </div>
            <Select defaultValue='usd'>
              <SelectTrigger className='h-10 w-[120px] border-[#2a3042] bg-[#1a1f2e] text-white [&>*]:text-white'>
                <SelectValue placeholder='Currency' />
              </SelectTrigger>
              <SelectContent className='border-[#2a3042] bg-[#1a1f2e]'>
                <SelectItem value='usd' className='text-white'>
                  $ (USD)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='mb-4 flex items-center gap-2 text-sm text-gray-400'>
        <span>⚡</span>
        <span>
          The price of{' '}
          <span className='text-green-400'>{selectedToken.toUpperCase()}</span>{' '}
          is currently{' '}
          <span className='text-green-400'>
            {CURRENT_PRICES[
              selectedToken as keyof typeof CURRENT_PRICES
            ].toLocaleString()}{' '}
            USD
          </span>
          .
        </span>
      </div>

      <Button
        onClick={handleSetAlert}
        disabled={!!priceError || !price}
        className='h-auto rounded-md bg-pink-500 px-12 py-2 text-base font-medium text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50'
      >
        SET ALERT
      </Button>
    </div>
  );
}
