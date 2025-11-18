import React from 'react';

export default function ContactPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <h1 className='mb-6 text-4xl font-bold'>Contact Us</h1>
      <p className='max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300'>
        Have questions, feedback, or need support? Reach out to us through the
        channels below.
      </p>
      <div className='mt-8 max-w-xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
        <h2 className='mb-4 text-center text-2xl font-semibold'>
          Get in Touch
        </h2>
        <ul className='space-y-4 text-lg text-gray-700 dark:text-gray-300'>
          <li>
            <strong>Email:</strong>{' '}
            <a
              href='mailto:support@tokenradar.xyz'
              className='text-blue-600 hover:underline'
            >
              support@tokenradar.xyz
            </a>
          </li>
          <li>
            <strong>Discord:</strong>{' '}
            <a
              href='https://discord.gg/tokenradar'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline'
            >
              Join our Discord
            </a>
          </li>
          <li>
            <strong>Twitter:</strong>{' '}
            <a
              href='https://twitter.com/tokenradarlabs'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline'
            >
              Follow us on Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
