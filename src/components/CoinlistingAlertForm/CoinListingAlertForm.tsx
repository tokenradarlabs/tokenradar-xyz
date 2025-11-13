'use client';
import React from 'react';
import { Spinner } from "@/components/ui/spinner";

type AlertFormState = {
  channel: string;
  webhook: string;
  discordBot: string;
  coin: string;
  exchange: string;
};
type Props = {
  form: AlertFormState;
  handleChange: (
    key: keyof AlertFormState
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  channels: { label: string; value: string }[];
  coins: string[];
  exchanges: string[];
  isLoading: boolean;
  error: string | null;
};

export default function CoinListingAlertForm({
  form,
  handleChange,
  handleSubmit,
  channels,
  coins,
  exchanges,
  isLoading,
  error,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {/* Channel select */}
      <div>
        <label className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          Send me an
        </label>
        <select
          value={form.channel}
          onChange={handleChange('channel')}
          className='w-full rounded-lg border-pink-500 p-2 focus:border-pink-600 dark:bg-gray-800 dark:text-white'
        >
          {channels.map(ch => (
            <option key={ch.value} value={ch.value}>
              {ch.label}
            </option>
          ))}
        </select>
      </div>

      {/* Webhook/Discord bot input */}
      {form.channel === 'webhook' && (
        <div>
          <label className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
            Webhook URL
          </label>
          <input
            type='text'
            value={form.webhook}
            onChange={handleChange('webhook')}
            placeholder='https://webhook.site/...'
            className='w-full rounded-lg border border-pink-300 p-2 dark:bg-gray-800 dark:text-white'
          />
        </div>
      )}
      {form.channel === 'discord' && (
        <div>
          <label className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
            Discord Bot Token
          </label>
          <input
            type='text'
            value={form.discordBot}
            onChange={handleChange('discordBot')}
            placeholder='XXXXXX'
            className='w-full rounded-lg border border-pink-300 p-2 dark:bg-gray-800 dark:text-white'
          />
        </div>
      )}

      {/* Coin select */}
      <div>
        <label className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          as soon as
        </label>
        <select
          value={form.coin}
          onChange={handleChange('coin')}
          className='w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white'
        >
          {coins.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Exchange select */}
      <div>
        <label className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          gets listed on
        </label>
        <select
          value={form.exchange}
          onChange={handleChange('exchange')}
          className='w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white'
        >
          {exchanges.map(ex => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
      </div>

      {/* Last coin detected */}
      <p className='mb-2 mt-6 text-center text-xs text-green-400'>
        ⚡ Last coin detected:{' '}
        <span className='font-mono text-green-300'>ALKIMI</span> listed on{' '}
        <span className='text-blue-400'>Gate.io</span> on{' '}
        <span className='text-green-200'>August 20 16:00</span>.
      </p>

      {/* Submit Button */}
      {error && <p role="alert" aria-live="polite" className="text-red-500 text-center">{error}</p>}
      <button
        type='submit'
        className='mt-6 w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-blue-600 flex items-center justify-center'
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? <Spinner /> : "Set Alert"}
      </button>
    </form>
  );
}
