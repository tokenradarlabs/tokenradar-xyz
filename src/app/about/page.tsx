import React from 'react';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center">
        TokenRadar Labs is dedicated to providing real-time token price tracking and market insights for the crypto community.
        We empower blockchain communities with cutting-edge web3 tools.
      </p>
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          To build the most reliable and user-friendly platform for cryptocurrency enthusiasts and developers,
          offering unparalleled data accuracy and innovative alert systems.
        </p>
      </div>
    </div>
  );
}
