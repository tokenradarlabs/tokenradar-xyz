"use client";
import React, { useState } from "react";
import { PlugZap, Bot, DollarSign } from "lucide-react";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];
const coins = ["BTC", "ETH", "USDT"];
const conditions = ["above", "below"];
const currencies = ["USD", "EUR"];
const exchanges = ["CoinGecko", "Uniswap"];

export default function PriceAlertPage() {
  const [channel, setChannel] = useState<string>(channels[0].value);
  const [webhook, setWebhook] = useState<string>("");
  const [discordBot, setDiscordBot] = useState<string>("");
  const [coin, setCoin] = useState<string>(coins[0]);
  const [condition, setCondition] = useState<string>(conditions[0]);
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<string>(currencies[0]);
  const [exchange, setExchange] = useState<string>(exchanges[0]);

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-gray-800 via-[#aba6bb] to-[#d3ccea]">
      <div className="max-w-xl w-full bg-[#181a22] shadow-2xl rounded-2xl p-10 border border-[#22243a]">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-200 tracking-tight">
          Price Alert
        </h2>
        <form className="space-y-6">
          {/* Channel */}
          <div>
            <label className="block text-gray-300 mb-1">Channel</label>
            <select
              value={channel}
              onChange={e => setChannel(e.target.value)}
              className="w-full rounded-lg bg-[#23263c] py-2 pl-3 pr-8 text-gray-100 outline-none"
            >
              {channels.map(ch => (
                <option key={ch.value} value={ch.value}>{ch.label}</option>
              ))}
            </select>
          </div>
          {/* Webhook/Discord input */}
          {channel === "webhook" && (
            <div>
              <label className="block text-gray-300 mb-1">Webhook URL</label>
              <div className="flex items-center rounded-lg bg-[#23263c] px-3">
                <PlugZap className="mr-2 text-purple-400" size={20} />
                <input
                  type="url"
                  value={webhook}
                  onChange={e => setWebhook(e.target.value)}
                  className="w-full py-2 bg-transparent text-gray-100 outline-none"
                  placeholder="https://webhook.site/..."
                  required
                />
              </div>
            </div>
          )}
          {channel === "discord" && (
            <div>
              <label className="block text-gray-300 mb-1">Discord Bot Token</label>
              <div className="flex items-center rounded-lg bg-[#23263c] px-3">
                <Bot className="mr-2 text-purple-400" size={20} />
                <input
                  type="text"
                  value={discordBot}
                  onChange={e => setDiscordBot(e.target.value)}
                  className="w-full py-2 bg-transparent text-gray-100 outline-none"
                  placeholder="Paste Discord Bot Token"
                  required
                />
              </div>
            </div>
          )}
          {/* Coin/Condition */}
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300">Coin</label>
              <select
                value={coin}
                onChange={e => setCoin(e.target.value)}
                className="w-full rounded-lg bg-[#23263c] py-2 text-gray-100 outline-none"
              >
                {coins.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300">Condition</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full rounded-lg bg-[#23263c] py-2 text-gray-100 outline-none"
              >
                {conditions.map(cond => (
                  <option key={cond} value={cond}>
                    {cond.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Price/Currency */}
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300">Price</label>
              <div className="flex items-center rounded-lg bg-[#23263c] px-3">
                <DollarSign className="mr-2 text-blue-300" size={18} />
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full py-2 bg-transparent text-gray-100 outline-none"
                  placeholder="0.00"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300">Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full rounded-lg bg-[#23263c] py-2 text-gray-100 outline-none"
              >
                {currencies.map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Exchange */}
          <div>
            <label className="block text-gray-300">Exchange</label>
            <select
              value={exchange}
              onChange={e => setExchange(e.target.value)}
              className="w-full rounded-lg bg-[#23263c] py-2 text-gray-100 outline-none"
            >
              {exchanges.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-5 rounded-lg font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:brightness-110 shadow transition"
          >
            Set Alert
          </button>
        </form>
      </div>
    </div>
  );
}
