'use client';
import React from 'react';

export default function NotificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Email Alerts Card */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-pink-500 shadow-xl p-12 flex flex-col justify-center min-h-[190px]">
          <h3 className="text-2xl font-bold mb-3 text-pink-600 dark:text-pink-300">
            <span className="text-pink-500 dark:text-pink-300">Email</span> Alerts
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Email is the most basic yet effective way to receive an alert. As long as your email address is confirmed, you&apos;re good to go.
          </p>
        </div>
        {/* SMS Alerts Card */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl border border-pink-500 shadow-xl p-12 flex flex-col justify-center min-h-[190px]">
          <h3 className="text-2xl font-bold mb-3 text-pink-600 dark:text-pink-300">
            <span className="text-pink-500 dark:text-pink-300">SMS</span> Alerts
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Receive text message (SMS) alerts by simply verifying your phone number. Standard SMS rates apply. We now support&nbsp;
            <span className="text-green-500">over 200 countries</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
