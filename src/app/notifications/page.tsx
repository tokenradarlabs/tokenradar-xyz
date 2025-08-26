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
        {/* Phone Calls Card */}
        <div className="bg-gray-950 rounded-2xl border border-pink-500 shadow-xl p-12 flex flex-col justify-center min-h-[190px]">
         <h3 className="text-2xl font-bold mb-3 text-pink-600 dark:text-pink-300">
            <span className="text-pink-500 dark:text-pink-300">Phone</span> Calls
          </h3>
          <p className="text-gray-200 text-lg">
            We allow you to receive direct phone calls for alerts that require immediate attention. An automated recording will read your alert out loud when you answer. Never miss an urgent event in crypto.
          </p>
        </div>
        {/* Push Notifications Card */}
        <div className="bg-gray-950 rounded-2xl border border-pink-500 shadow-xl p-12 flex flex-col justify-center min-h-[190px]">
          <h3 className="text-2xl font-bold mb-3 text-pink-600 dark:text-pink-300">
            <span className="text-pink-500 dark:text-pink-300">Push</span> Notifications
          </h3>
          <p className="text-gray-200 text-lg">
            Push notifications can be sent to any iOS or Android device by simply downloading our app. You can also manage your alerts and view your notification history from the app itself.
          </p>
        </div>
        {/* Browser Notifications Card */}
        <div className="bg-gray-950 rounded-2xl border border-pink-500 shadow-xl p-12 flex flex-col justify-center min-h-[190px]">
          <h3 className="text-2xl font-bold mb-3 text-pink-600 dark:text-pink-300">
            <span className="text-pink-500 dark:text-pink-300">Browser</span> Notifications
          </h3>
          <p className="text-gray-200 text-lg">
            Browser notifications allow you to receive alerts right on your desktop — even if this tab is closed! Visit our <span className="text-green-400">FAQ</span> to learn more.
          </p>
        </div>
        {/* Telegram Bot Card */}
        <div className="bg-gray-950 rounded-2xl border border-pink-500 shadow-xl p-12 flex flex-col justify-center min-h-[190px]">
          <h3 className="text-2xl font-bold mb-3 text-pink-600 dark:text-pink-300">
            <span className="text-pink-500 dark:text-pink-300">Telegram</span> Bot
          </h3>
          <p className="text-gray-200 text-lg">
            Use our Telegram bot to receive unlimited customizable crypto alerts. We support both Telegram groups and individual users.
          </p>
        </div>
      </div>
    </div>
  );
}
