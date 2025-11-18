import React from 'react';

export default function AboutPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <h1 className='mb-6 text-4xl font-bold'>About Us</h1>
      <p className='max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300'>
        TokenRadar Labs is dedicated to providing real-time token price tracking
        and market insights for the crypto community. We empower blockchain
        communities with cutting-edge web3 tools.
      </p>
      <div className='mt-8 max-w-xl rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800'>
        <h2 className='mb-4 text-2xl font-semibold'>Our Mission</h2>
        <p className='text-md text-gray-700 dark:text-gray-300'>
          To build the most reliable and user-friendly platform for
          cryptocurrency enthusiasts and developers, offering unparalleled data
          accuracy and innovative alert systems.
        </p>
      </div>
    </div>
  );
}
