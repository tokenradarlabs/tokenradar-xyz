"use client";
import React from "react";
import { PlugZap, Bot, Percent } from "lucide-react";

type Coin = { label: string; icon: React.ReactNode };
type Channel = { label: string; value: string; icon: React.ReactNode };
type Direction = { label: string; value: string; icon: React.ReactNode };
type Interval = { label: string; value: string };
type Exchange = { label: string; value: string };

type Props = {
  channel: string; setChannel: (v: string) => void;
  webhook: string; setWebhook: (v: string) => void;
  discordBot: string; setDiscordBot: (v: string) => void;
  coin: string; setCoin: (v: string) => void;
  direction: string; setDirection: (v: string) => void;
  percent: string; setPercent: (v: string) => void;
  interval: string; setInterval: (v: string) => void;
  exchange: string; setExchange: (v: string) => void;
  coins: Coin[]; channels: Channel[]; directions: Direction[];
  intervals: Interval[]; exchanges: Exchange[];
  onSubmit: (e: React.FormEvent) => void;
  price?: string;
};
const PercentAlertForm: React.FC<Props> = ({
  channel, setChannel, webhook, setWebhook,
  discordBot, setDiscordBot, coin, setCoin,
  direction, setDirection, percent, setPercent,
  interval, setInterval, exchange, setExchange,
  coins, channels, directions, intervals, exchanges,
  onSubmit, price
}) => (
  <form className="space-y-5" onSubmit={onSubmit}>
    {/* Channel */}
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Channel</label>
      <select value={channel} onChange={e => setChannel(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        {channels.map(ch => (
          <option key={ch.value} value={ch.value}>{ch.label}</option>
        ))}
      </select>
    </div>
    {/* Conditional Inputs */}
    {channel === "webhook" && (
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Webhook URL</label>
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
          <PlugZap className="mr-2 text-indigo-600" />
          <input type="url" value={webhook} onChange={e => setWebhook(e.target.value)}
            placeholder="https://webhook.site/..." required
            className="bg-transparent outline-none w-full text-gray-900 dark:text-white" />
        </div>
      </div>
    )}
    {channel === "discord" && (
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Discord Bot Token</label>
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
          <Bot className="mr-2 text-purple-600" />
          <input type="text" value={discordBot} onChange={e => setDiscordBot(e.target.value)}
            placeholder="Paste Discord Bot Token"
            className="bg-transparent outline-none w-full text-gray-900 dark:text-white" />
        </div>
      </div>
    )}
    {/* Coin + Direction */}
    <div className="grid grid-cols-2 gap-5">
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Coin</label>
        <select value={coin} onChange={e => setCoin(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          {coins.map(c => (
            <option key={c.label} value={c.label}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Direction</label>
        <select value={direction} onChange={e => setDirection(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          {directions.map(dir => (
            <option key={dir.value} value={dir.value}>{dir.label}</option>
          ))}
        </select>
      </div>
    </div>
    {/* Percent + Interval */}
    <div className="grid grid-cols-2 gap-5">
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Percent (%)</label>
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
          <Percent className="mr-2 text-pink-500" />
          <input type="number" value={percent} onChange={e => setPercent(e.target.value)}
            min="0" max="100" placeholder="00"
            className="bg-transparent outline-none w-full text-gray-900 dark:text-white" required />
        </div>
      </div>
      <div>
        <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Interval</label>
        <select value={interval} onChange={e => setInterval(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          {intervals.map(i => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>
      </div>
    </div>
    {/* Exchange */}
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Exchange</label>
      <select value={exchange} onChange={e => setExchange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        {exchanges.map(ex => (
          <option key={ex.value} value={ex.value}>{ex.label}</option>
        ))}
      </select>
    </div>
    {/* Price Note */}
    <div className="text-sm mt-3 text-gray-500 dark:text-gray-400">
      ⚡ The price of {coin} is currently <span className="text-green-600 font-bold">{price ?? '...'}</span>.
    </div>
    <button type="submit"
      className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200">
      Set Alert
    </button>
  </form>
);
export default PercentAlertForm;
