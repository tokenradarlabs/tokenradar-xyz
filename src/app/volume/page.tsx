"use client";
import React, { useState } from "react";
import { PlugZap, Bot } from "lucide-react";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];
const coins = ["BTC", "ETH", "USDT"];
const exchanges = ["CoinGecko", "Uniswap"];
const multipliers = ["1x", "2x", "3x", "4x", "5x", "6x"];
const intervals = ["5 minutes", "15 minutes", "1 hour", "24 hours"];

export default function VolumePage() {
  const [channel, setChannel] = useState<string>(channels[0].value);
  const [webhook, setWebhook] = useState<string>("");
  const [discordBot, setDiscordBot] = useState<string>("");
  const [coin, setCoin] = useState<string>(coins[0]);
  const [exchange, setExchange] = useState<string>(exchanges[0]);
  const [multiplier, setMultiplier] = useState<string>(multipliers[2]);
  const [interval, setInterval] = useState<string>(intervals[0]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-pink-600">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-300">
          Volume Alert
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Get notified of unusual trading volume on crypto exchanges.
        </p>
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
          {/* --- Conditional Input --- */}
          {channel === "webhook" && (
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Webhook URL
              </label>
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
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discord Bot Token
              </label>
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
          {/* --- Coin / Exchange --- */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Coin</label>
              <select
                value={coin}
                onChange={e => setCoin(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {coins.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Exchange</label>
              <select
                value={exchange}
                onChange={e => setExchange(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {exchanges.map(ex => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>
          </div>
          {/* --- Multiplier / Interval --- */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Multiplier</label>
              <select
                value={multiplier}
                onChange={e => setMultiplier(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {multipliers.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Interval</label>
              <select
                value={interval}
                onChange={e => setInterval(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {intervals.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
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
