import React from 'react';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center">
        Have questions, feedback, or need support? Reach out to us through the channels below.
      </p>
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Get in Touch</h2>
        <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong>Email:</strong> <a href="mailto:support@tokenradar.xyz" className="text-blue-600 hover:underline">support@tokenradar.xyz</a>
          </li>
          <li>
            <strong>Discord:</strong> <a href="https://discord.gg/tokenradar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Join our Discord</a>
          </li>
          <li>
            <strong>Twitter:</strong> <a href="https://twitter.com/tokenradarlabs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Follow us on Twitter</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
