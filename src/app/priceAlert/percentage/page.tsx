'use client';
import React, { useState } from 'react';
import PercentAlertForm from '@/components/PercentAlertForm/PercentAlertForm';

const channels = [
  { label: 'Webhook', value: 'webhook' },
  { label: 'Discord Bot', value: 'discord' },
];
const coins = [
  { label: 'BTC', value: 'BTC' },
  { label: 'ETH', value: 'ETH' },
  { label: 'USDT', value: 'USDT' },
];
const directions = [
  { label: 'goes up', value: 'up' },
  { label: 'goes down', value: 'down' },
];
const intervals = [
  { label: '5 minutes', value: '5m' },
  { label: '15 minutes', value: '15m' },
  { label: '1 hour', value: '1h' },
  { label: '24 hours', value: '24h' },
];
const exchanges = [
  { label: 'CoinGecko', value: 'coingecko' },
  { label: 'Uniswap', value: 'uniswap' },
];

export default function PercentPage() {
  const [channel, setChannel] = useState(channels[0].value);
  const [webhook, setWebhook] = useState('');
  const [discordBot, setDiscordBot] = useState('');
  const [coin, setCoin] = useState(coins[0].value);
  const [direction, setDirection] = useState(directions[0].value);
  const [percent, setPercent] = useState('');
  const [interval, setInterval] = useState(intervals[0].value);
  const [exchange, setExchange] = useState(exchanges[0].value);

  const price = '117,197.41 USD';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      channel,
      webhook,
      discordBot,
      coin,
      direction,
      percent,
      interval,
      exchange,
    };
    console.log(formData);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 p-8 dark:from-gray-900 dark:to-indigo-900'>
      <div className='relative w-full max-w-xl rounded-3xl border border-blue-100 bg-white p-10 shadow-xl dark:border-indigo-800 dark:bg-gray-950'>
        <h2 className='mb-2 text-center text-3xl font-bold text-fuchsia-600 dark:text-pink-300'>
          Percentage Price Alert
        </h2>
        <p className='mb-6 text-center text-gray-500 dark:text-gray-400'>
          Get notified when a coin changes in value by a specific percent.
        </p>
        <PercentAlertForm
          channel={channel}
          setChannel={setChannel}
          webhook={webhook}
          setWebhook={setWebhook}
          discordBot={discordBot}
          setDiscordBot={setDiscordBot}
          coin={coin}
          setCoin={setCoin}
          direction={direction}
          setDirection={setDirection}
          percent={percent}
          setPercent={setPercent}
          interval={interval}
          setInterval={setInterval}
          exchange={exchange}
          setExchange={setExchange}
          channels={channels}
          coins={coins}
          directions={directions}
          intervals={intervals}
          exchanges={exchanges}
          onSubmit={handleSubmit}
          price={price}
        />
      </div>
    </div>
  );
}
