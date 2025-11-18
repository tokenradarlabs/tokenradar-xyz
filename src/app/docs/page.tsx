import React from 'react';

export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center">
        Welcome to the TokenRadar Labs documentation. Here you can find guides, API references, and tutorials.
      </p>
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Getting Started</h2>
        <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>
            <a href="#installation" className="text-blue-600 hover:underline">Installation Guide</a>
          </li>
          <li>
            <a href="#api-reference" className="text-blue-600 hover:underline">API Reference</a>
          </li>
          <li>
            <a href="#discord-bot" className="text-blue-600 hover:underline">Discord Bot Setup</a>
          </li>
        </ul>
        <p className="mt-6 text-md text-gray-600 dark:text-gray-400 text-center">
          More documentation coming soon!
        </p>
      </div>
    </div>
  );
}
