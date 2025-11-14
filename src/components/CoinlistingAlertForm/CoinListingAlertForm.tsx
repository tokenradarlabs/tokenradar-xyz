'use client';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
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
  const debouncedChannelChange = useDebouncedCallback(handleChange('channel'), 500);
  const debouncedWebhookChange = useDebouncedCallback(handleChange('webhook'), 500);
  const debouncedDiscordBotChange = useDebouncedCallback(handleChange('discordBot'), 500);
  const debouncedCoinChange = useDebouncedCallback(handleChange('coin'), 500);
  const debouncedExchangeChange = useDebouncedCallback(handleChange('exchange'), 500);

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {/* Channel select */}
      <div>
        <label className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          Send me an
        </label>
        <select
          value={form.channel}
          onChange={debouncedChannelChange}
          className='w-full rounded-lg border-pink-500 p-2 focus:border-pink-600 dark:bg-gray-800 dark:text-white'
          disabled={isLoading}
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
            onChange={debouncedWebhookChange}
            placeholder='https://webhook.site/...'
            className='w-full rounded-lg border border-pink-300 p-2 dark:bg-gray-800 dark:text-white'
            disabled={isLoading}
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
            onChange={debouncedDiscordBotChange}
            placeholder='XXXXXX'
            className='w-full rounded-lg border border-pink-300 p-2 dark:bg-gray-800 dark:text-white'
            disabled={isLoading}
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
          onChange={debouncedCoinChange}
          className='w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white'
          disabled={isLoading}
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
          onChange={debouncedExchangeChange}
          className='w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white'
          disabled={isLoading}
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
