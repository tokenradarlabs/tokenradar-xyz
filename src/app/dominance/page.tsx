'use client';
import React, { useState } from 'react';
import BTCDominanceAlertForm from '@/components/BTCDominanceAlertForm/BTCDominanceAlertForm';

const channels = [
  { label: 'Discord Bot', value: 'discord' },
  { label: 'Webhook', value: 'webhook' },
];

const directions = [
  { label: 'goes above', value: 'above' },
  { label: 'goes below', value: 'below' },
];

type FormState = {
  channel: string;
  discordBot: string;
  webhook: string;
  direction: string;
  level: string;
};

export default function BTCDominanceAlertPage() {
  const [form, setForm] = useState<FormState>({
    channel: channels[0].value,
    discordBot: '',
    webhook: '',
    direction: directions[0].value,
    level: '',
  });

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call, debug, etc.
    console.log(form);
  };

  // Demo BTC dominance value
  const btcDominance = '57.7903';

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8'>
      <div className='relative w-full max-w-lg rounded-3xl border border-pink-600 bg-white dark:bg-gray-950 p-10 shadow-xl'>
        <div className='mb-4 flex flex-col items-center'>
          <span className='mb-2'>
            {/* Icon */}
            <svg
              width='40'
              height='40'
              className='text-pink-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zm3.25 10.25a3.25 3.25 0 1 1-6.5 0h6.5zm-6.5-1.5v-2.25h6.5v2.25h-6.5z' />
            </svg>
          </span>
          <h2 className='mb-1 text-3xl font-bold tracking-tight text-pink-500 dark:text-pink-300'>
            BTC Dominance Alert
          </h2>
        </div>
        <p className='mb-6 text-center text-base text-gray-400'>
          Track the ebb &amp; flow of Bitcoin&apos;s marketcap vs altcoins.
        </p>

        <BTCDominanceAlertForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          channels={channels}
          directions={directions}
          btcDominance={btcDominance}
        />
      </div>
    </div>
  );
}
