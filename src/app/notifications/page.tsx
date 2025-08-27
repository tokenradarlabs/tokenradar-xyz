'use client';
import React from 'react';

export default function NotificationPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 p-8 dark:from-gray-900 dark:to-indigo-900'>
      <div className='grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-2'>
        {/* Email Alerts Card */}
        <div className='flex min-h-[190px] flex-col justify-center rounded-2xl border border-pink-500 bg-white p-12 shadow-xl dark:bg-gray-950'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Email</span>{' '}
            Alerts
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300'>
            Email is the most basic yet effective way to receive an alert. As
            long as your email address is confirmed, you&apos;re good to go.
          </p>
        </div>
        {/* SMS Alerts Card */}
        <div className='flex min-h-[190px] flex-col justify-center rounded-2xl border border-pink-500 bg-white p-12 shadow-xl dark:bg-gray-950'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>SMS</span> Alerts
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300'>
            Receive text message (SMS) alerts by simply verifying your phone
            number. Standard SMS rates apply. We now support&nbsp;
            <span className='text-green-500'>over 200 countries</span>.
          </p>
        </div>
        {/* Phone Calls Card */}
        <div className='flex min-h-[190px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Phone</span>{' '}
            Calls
          </h3>
          <p className='text-lg text-gray-200'>
            We allow you to receive direct phone calls for alerts that require
            immediate attention. An automated recording will read your alert out
            loud when you answer. Never miss an urgent event in crypto.
          </p>
        </div>
        {/* Push Notifications Card */}
        <div className='flex min-h-[190px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Push</span>{' '}
            Notifications
          </h3>
          <p className='text-lg text-gray-200'>
            Push notifications can be sent to any iOS or Android device by
            simply downloading our app. You can also manage your alerts and view
            your notification history from the app itself.
          </p>
        </div>
        {/* Browser Notifications Card */}
        <div className='flex min-h-[190px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Browser</span>{' '}
            Notifications
          </h3>
          <p className='text-lg text-gray-200'>
            Browser notifications allow you to receive alerts right on your
            desktop — even if this tab is closed! Visit our{' '}
            <span className='text-green-400'>FAQ</span> to learn more.
          </p>
        </div>
        {/* Telegram Bot Card */}
        <div className='flex min-h-[190px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Telegram</span>{' '}
            Bot
          </h3>
          <p className='text-lg text-gray-200'>
            Use our Telegram bot to receive unlimited customizable crypto
            alerts. We support both Telegram groups and individual users.
          </p>
        </div>
        {/* Discord Bot Card */}
        <div className='flex min-h-[150px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Discord</span>{' '}
            Bot
          </h3>
          <p className='text-lg text-gray-200'>
            Integrate your account with any Discord server. You&apos;ll just
            need to provide us with a specific URL to send you messages. Read
            our <span className='text-green-400'>quick guide</span> to learn
            more.
          </p>
        </div>
        {/* Slack Bot Card */}
        <div className='flex min-h-[150px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Slack</span>{' '}
            Bot
          </h3>
          <p className='text-lg text-gray-200'>
            Integrate your account with any Slack channel in seconds. Once
            logged in, simply click &quot;Add to Slack&quot;, then select a
            workspace and channel. View us directly on the{' '}
            <span className='text-green-400'>Slack App Directory</span>.
          </p>
        </div>
        {/* Webhook Notifications Card */}
        <div className='flex min-h-[150px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Webhook</span>{' '}
            Notifications
          </h3>
          <p className='text-lg text-gray-200'>
            A webhook allows users to programmatically react to an alert.
            It&apos;s a way to automate, extend and combine our platform with
            other services. Visit our{' '}
            <span className='text-green-400'>FAQ</span> to learn more about
            webhooks, or check out the{' '}
            <span className='text-green-400'>quick start guide</span>.
          </p>
        </div>
        {/* Developer API Card */}
        <div className='flex min-h-[150px] flex-col justify-center rounded-2xl border border-pink-500 bg-gray-950 p-12 shadow-xl'>
          <h3 className='mb-3 text-2xl font-bold text-pink-600 dark:text-pink-300'>
            <span className='text-pink-500 dark:text-pink-300'>Developer</span>{' '}
            API
          </h3>
          <p className='text-lg text-gray-200'>
            Our REST API empowers developers to automate, extend and combine our
            platform with other services. The interface aims to be as user
            friendly as possible, using JSON responses and HTTP codes to
            indicate errors.
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
