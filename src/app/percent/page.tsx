"use client";
import React, { useState } from "react";
import { PlugZap, Bot, Percent, Clock, ArrowUp, ArrowDown, Bitcoin } from "lucide-react";

const channels = [
  { label: "Webhook", value: "webhook", icon: <PlugZap className="mr-1 text-indigo-600" size={20} /> },
  { label: "Discord Bot", value: "discord", icon: <Bot className="mr-1 text-purple-600" size={20} /> },
];

const coins = [
  { label: "BTC", icon: <Bitcoin className="inline mr-1 text-yellow-500" size={18} /> },
  { label: "ETH", icon: <span className="inline-block mr-1 w-4 h-4 bg-blue-500 rounded-full"></span> },
  { label: "USDT", icon: <span className="inline-block mr-1 w-4 h-4 bg-green-500 rounded-full"></span> },
];

const directions = [
  { label: "goes up", value: "up", icon: <ArrowUp className="inline mr-1 text-green-600" size={18} /> },
  { label: "goes down", value: "down", icon: <ArrowDown className="inline mr-1 text-red-600" size={18} /> },
];

const intervals = [
  { label: "5 minutes", value: "5m" },
  { label: "15 minutes", value: "15m" },
  { label: "1 hour", value: "1h" },
  { label: "24 hours", value: "24h" },
];

const exchanges = [
  { label: "CoinGecko", value: "coingecko" },
  { label: "Uniswap", value: "uniswap" },
];

export default function PercentPage() {
  const [channel, setChannel] = useState(channels[0].value);
  const [webhook, setWebhook] = useState("");
  const [discordBot, setDiscordBot] = useState("");
  const [coin, setCoin] = useState(coins[0].label);
  const [direction, setDirection] = useState(directions[0].value);
  const [percent, setPercent] = useState("");
  const [interval, setInterval] = useState(intervals[0].value);
  const [exchange, setExchange] = useState(exchanges[0].value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-blue-100 dark:border-indigo-800">
        <h2 className="text-3xl font-bold mb-2 text-center text-fuchsia-600 dark:text-pink-300">
          Percentage Price Alert
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Get notified when a coin changes in value by a specific percent.</p>
        <form className="space-y-5">
          {/* --- Channel Dropdown --- */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Channel
            </label>
            <select
              value={channel}
              onChange={e => setChannel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
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
                <input
                  type="url"
                  value={webhook}
                  onChange={e => setWebhook(e.target.value)}
                  placeholder="https://webhook.site/..."
                  className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
          )}
          {channel === "discord" && (
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Discord Bot Token</label>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                <Bot className="mr-2 text-purple-600" />
                <input
                  type="text"
                  value={discordBot}
                  onChange={e => setDiscordBot(e.target.value)}
                  placeholder="Paste Discord Bot Token"
                  className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
                />
              </div>
            </div>
          )}
          {/* --- Row 1: Coin + Direction --- */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Coin</label>
              <select
                value={coin}
                onChange={e => setCoin(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {coins.map(c => (
                  <option key={c.label}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Direction</label>
              <select
                value={direction}
                onChange={e => setDirection(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {directions.map(dir => (
                  <option key={dir.value} value={dir.value}>{dir.label}</option>
                ))}
              </select>
            </div>
          </div>
          {/* --- Row 2: Percent + Interval --- */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Percent (%)</label>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                <Percent className="mr-2 text-pink-500" />
                <input
                  type="number"
                  value={percent}
                  onChange={e => setPercent(e.target.value)}
                  min="0"
                  max="100"
                  placeholder="00"
                  className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Interval</label>
              <select
                value={interval}
                onChange={e => setInterval(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {intervals.map(i => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
            </div>
          </div>
          {/* --- Exchange --- */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Exchange</label>
            <select
              value={exchange}
              onChange={e => setExchange(e.target.value)}
              className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {exchanges.map(ex => (
                <option key={ex.value} value={ex.value}>{ex.label}</option>
              ))}
            </select>
          </div>
          {/* --- Current price note --- */}
          <div className="text-sm mt-3 text-gray-500 dark:text-gray-400">
            ⚡ The price of {coin} is currently <span className="text-green-600 font-bold">117,197.41 USD</span>.
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
          >
            Set Alert
          </button>
        </form>
      </div>
    </div>
  );
}
