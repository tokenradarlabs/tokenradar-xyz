'use client';
import React from 'react';

type MarketCapFormState = {
  channel: string;
  webhook: string;
  discordBot: string;
  coin: string;
  direction: string;
  cap: string;
};
type Option = { label: string; value: string };

type Props = {
  form: MarketCapFormState;
  handleChange: (
    key: keyof MarketCapFormState
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  channels: Option[];
  coins: Option[];
  directions: Option[];
  currentMarketCap: string;
};

export default function MarketCapAlertForm({
  form,
  handleChange,
  handleSubmit,
  channels,
  coins,
  directions,
  currentMarketCap,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {/* Notification channel */}
      <div>
        <label htmlFor="channel-select" className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          Send me an
        </label>
        <select
          id="channel-select"
          aria-label="Notification channel"
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
      {/* Webhook/Discord bot */}
      {form.channel === 'webhook' && (
        <div>
          <label htmlFor="webhook-url" className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
            Webhook URL
          </label>
          <input
            id="webhook-url"
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
          <label htmlFor="discord-bot-token" className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
            Discord Bot Token
          </label>
          <input
            id="discord-bot-token"
            type='text'
            value={form.discordBot}
            onChange={handleChange('discordBot')}
            placeholder='Bot Token'
            className='w-full rounded-lg border border-pink-300 p-2 dark:bg-gray-800 dark:text-white'
          />
        </div>
      )}
      {/* Coin select */}
      <div>
        <label htmlFor="coin-select" className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          when the
        </label>
        <select
          id="coin-select"
          aria-label="Cryptocurrency"
          value={form.coin}
          onChange={handleChange('coin')}
          className='w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white'
        >
          {coins.map(c => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      {/* Direction + Marketcap */}
      <div>
        <label htmlFor="marketcap-input" className='mb-2 block font-medium text-gray-700 dark:text-gray-300'>
          marketcap
        </label>
        <select
          id="direction-select"
          aria-label="Market cap direction"
          value={form.direction}
          onChange={handleChange('direction')}
          className='w-40 rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white'
        >
          {directions.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <input
          id="marketcap-input"
          type='number'
          inputMode='decimal'
          value={form.cap}
          onChange={handleChange('cap')}
          placeholder='00'
          className='ml-2 w-24 rounded-lg border border-pink-300 p-2 dark:bg-gray-800 dark:text-white'
          aria-describedby="current-marketcap-helper"
        />
        <span className='pl-2 text-gray-700 dark:text-gray-300'>
          billion USD.
        </span>
      </div>
      {/* Current marketcap */}
      <p id="current-marketcap-helper" className='mb-2 mt-6 text-center text-xs text-green-400'>
        ⚡ For reference,{' '}
        <span className='font-mono text-yellow-300'>BTC marketcap</span> is
        currently{' '}
        <span className='font-mono text-green-300'>
          ${currentMarketCap} billion
        </span>
        .
      </p>
      {/* Submit button */}
      <button type="submit"
      className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition">
      Set Alert
    </button>
    </form>
  );
}
