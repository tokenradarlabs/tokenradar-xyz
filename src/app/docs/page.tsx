import React from 'react';

export default function DocsPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <h1 className='mb-6 text-4xl font-bold'>Documentation</h1>
      <p className='max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300'>
        Welcome to the TokenRadar Labs documentation. Here you can find guides,
        API references, and tutorials.
      </p>
      <div className='mt-8 max-w-xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
        <h2 className='mb-4 text-center text-2xl font-semibold'>
          Getting Started
        </h2>
        <ul className='list-inside list-disc space-y-3 text-lg text-gray-700 dark:text-gray-300'>
          <li>
            <a href='#installation' className='text-blue-600 hover:underline'>
              Installation Guide
            </a>
          </li>
          <li>
            <a href='#api-reference' className='text-blue-600 hover:underline'>
              API Reference
            </a>
          </li>
          <li>
            <a href='#discord-bot' className='text-blue-600 hover:underline'>
              Discord Bot Setup
            </a>
          </li>
        </ul>
        <p className='text-md mt-6 text-center text-gray-600 dark:text-gray-400'>
          More documentation coming soon!
        </p>
      </div>
    </div>
  );
}
