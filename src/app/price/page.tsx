"use client";
import React, { useState } from "react";
import { PlugZap, Bot, DollarSign } from "lucide-react";

const channels = [
  { label: "Webhook", value: "webhook", icon: <PlugZap className="mr-1 text-indigo-600" size={20} /> },
  { label: "Discord Bot", value: "discord", icon: <Bot className="mr-1 text-purple-600" size={20} /> },
];
const coins = ["BTC", "ETH", "USDT"];
const conditions = ["above", "below"];
const currencies = ["USD", "EUR"];
const exchanges = ["CoinGecko", "Uniswap"]; // Updated!

export default function PricePage() {
  // Dropdown state: Which channel?
  const [channel, setChannel] = useState(channels[0].value);
  const [webhook, setWebhook] = useState("");
  const [discordBot, setDiscordBot] = useState("");
  const [coin, setCoin] = useState(coins[0]);
  const [condition, setCondition] = useState(conditions[0]);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState(currencies[0]);
  const [exchange, setExchange] = useState(exchanges[0]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-blue-100 dark:border-indigo-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-purple-300">
          Price Alert
        </h2>
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
                <option key={ch.value} value={ch.value}>
                  {ch.label}
                </option>
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
          {/* --- Rest fields --- */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Coin</label>
              <select
                value={coin}
                onChange={e => setCoin(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {coins.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Condition</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {conditions.map(cond => (
                  <option key={cond}>{cond.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Price</label>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                <DollarSign className="mr-2 text-blue-500" />
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
                  min="0"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block font-medium text-gray-700 dark:text-gray-300">Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {currencies.map(cur => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Exchange</label>
            <select
              value={exchange}
              onChange={e => setExchange(e.target.value)}
              className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {exchanges.map(ex => (
                <option key={ex}>{ex}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
          >
            Set Alert
          </button>
        </form>
      </div>
    </div>
  );
}
