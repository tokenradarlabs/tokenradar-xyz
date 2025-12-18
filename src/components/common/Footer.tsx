'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-gradient-to-br from-slate-50 to-blue-50 py-12 text-slate-800 dark:bg-black dark:from-transparent dark:to-transparent dark:text-white'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Logo and Description */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg'>
                <div className='relative h-6 w-6 rounded-full border-2 border-white'>
                  <div className='absolute inset-1 rounded-full bg-white'></div>
                </div>
              </div>
              <div className='font-display gradient-text text-2xl font-bold'>
                TokenRadar Labs
              </div>
            </div>
            <p className='max-w-xs text-sm text-slate-600 dark:text-gray-300'>
              Real-time token price tracking and market insights for your crypto
              community. Empowering blockchain communities with cutting-edge
              web3 tools.
            </p>
          </div>

          {/* Features Column */}
          <nav className='space-y-4' aria-labelledby='features-heading'>
            <h3
              id='features-heading'
              className='text-lg font-medium text-slate-900 dark:text-white'
            >
              Features
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/features/discord-bot'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Learn more about Discord Bot feature'
                >
                  Discord Bot
                </Link>
              </li>
              <li>
                <Link
                  href='/features/price-tracking'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Learn more about Price Tracking feature'
                >
                  Price Tracking
                </Link>
              </li>
              <li>
                <Link
                  href='/features/smart-alerts'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Learn more about Smart Alerts feature'
                >
                  Smart Alerts
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav className='space-y-4' aria-labelledby='company-heading'>
            <h3
              id='company-heading'
              className='text-lg font-medium text-slate-900 dark:text-white'
            >
              Company
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Go to Home page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Learn more About Us'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Contact us'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/docs'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Read our Documentation'
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href='/api'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='Explore our API'
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
                  title='View our Privacy Policy'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect Column */}
          <nav className='space-y-4' aria-labelledby='connect-heading'>
            <h3
              id='connect-heading'
              className='text-lg font-medium text-slate-900 dark:text-white'
            >
              Connect
            </h3>
            <div className='flex space-x-4'>
              <Link
                href='https://github.com/tokenradarlabs'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'
                className='text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200'
              >
                <Image
                  src='/github.svg'
                  alt='GitHub'
                  width={24}
                  height={24}
                  className='h-6 w-6'
                />
              </Link>
              <Link
                href='https://discord.gg/tokenradar'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Discord'
                className='text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200'
              >
                <Image
                  src='/discord.svg'
                  alt='Discord'
                  width={24}
                  height={24}
                  className='h-6 w-6'
                />
              </Link>
              <Link
                href='https://twitter.com/tokenradarlabs'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Twitter/X'
                className='text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200'
              >
                <Image
                  src='/x.svg'
                  alt='Twitter/X'
                  width={24}
                  height={24}
                  className='h-6 w-6'
                />
              </Link>
            </div>
          </nav>
        </div>

        <div className='relative mb-8 mt-10 overflow-hidden'>
          <div className='flex justify-center'>
            <div className='grid grid-cols-7 gap-2'>
              {[...Array(7)].map((_, i) => (
                <div key={i} className='flex flex-col gap-2'>
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className={`h-4 w-4 rounded-full bg-gradient-to-r ${(i + j) % 3 === 0 ? 'from-blue-400 to-cyan-300' : (i + j) % 3 === 1 ? 'from-indigo-500 to-purple-400' : 'from-blue-600 to-cyan-500'} animate-pulse`}
                      style={{ animationDelay: `${i * 0.1 + j * 0.2}s`, opacity: (50 + ((i + j) % 5) * 10) / 100 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='absolute inset-x-0 -bottom-4 h-12 bg-gradient-to-t from-slate-50 to-transparent dark:from-black dark:to-transparent'></div>
        </div>

        <div className='mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-gray-800 dark:text-gray-400'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <form className='flex gap-2' onSubmit={handleSubscribe}>
              <input
                type='email'
                name='email'
                placeholder='Your email'
                className='rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              <button
                type='submit'
                className='rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Subscribe
              </button>
            </form>
            <p>
              © {new Date().getFullYear()} TokenRadar Labs. All rights
              reserved. Forging next-generation open-source web3 tools.
            </p>
          </div>
        </div>
        <script
          type='application/ld+json'
        >
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'TokenRadar Labs',
            url: 'https://tokenradar.xyz',
            logo: 'https://tokenradar.xyz/logo.png',
            sameAs: [
              'https://twitter.com/tokenradarlabs',
              'https://github.com/tokenradarlabs',
              'https://discord.gg/tokenradar',
            ],
          })}
        </script>
      </div>
    </footer>
  );
}

async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const emailInput = form.elements.namedItem('email') as HTMLInputElement;
  const email = emailInput.value;

  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  // Placeholder for API call
  console.log('Subscribing with email:', email);
  alert('Subscription successful! (Placeholder)');
  // In a real application, you would send the email to your subscription service
  // try {
  //   const response = await fetch('/api/subscribe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   });
  //   if (response.ok) {
  //     alert('Subscription successful!');
  //   } else {
  //     alert('Subscription failed. Please try again.');
  //   }
  // } catch (error) {
  //   console.error('Subscription error:', error);
  //   alert('Subscription failed. Please try again later.');
  // }

}
