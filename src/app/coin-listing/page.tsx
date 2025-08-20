"use client";
import React, { useState } from "react";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const coins = ["Any Coin", "BTC", "ETH", "USDT"];
const exchanges = ["CoinGecko", "Uniswap"];

type AlertFormState = {
  channel: string;
  webhook: string;
  discordBot: string;
  coin: string;
  exchange: string;
};

export default function CoinListingAlertPage() {
  const [form, setForm] = useState<AlertFormState>({
    channel: channels[0].value,
    webhook: "",
    discordBot: "",
    coin: coins[0],
    exchange: exchanges[0],
  });

  // Generic handler for all fields
  const handleChange = (key: keyof AlertFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Backend API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-pink-600">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-300">
          Coin Listing Alert
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Get notified when a new coin is listed on an exchange.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Channel select */}
          <div>
            <label className="font-medium block mb-2 text-gray-700 dark:text-gray-300">
              Send me an
            </label>
            <select
              value={form.channel}
              onChange={handleChange("channel")}
              className="w-full rounded-lg border-pink-500 focus:border-pink-600 p-2 dark:bg-gray-800 dark:text-white"
            >
              {channels.map((ch) => (
                <option key={ch.value} value={ch.value}>{ch.label}</option>
              ))}
            </select>
          </div>

          {/* Webhook/Discord bot input */}
          {form.channel === "webhook" && (
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Webhook URL
              </label>
              <input
                type="text"
                value={form.webhook}
                onChange={handleChange("webhook")}
                placeholder="https://webhook.site/..."
                className="w-full rounded-lg border-pink-300 p-2 dark:bg-gray-800 dark:text-white border"
              />
            </div>
          )}
          {form.channel === "discord" && (
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Discord Bot Token
              </label>
              <input
                type="text"
                value={form.discordBot}
                onChange={handleChange("discordBot")}
                placeholder="XXXXXX"
                className="w-full rounded-lg border-pink-300 p-2 dark:bg-gray-800 dark:text-white border"
              />
            </div>
          )}

          {/* Coin select */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              as soon as
            </label>
            <select
              value={form.coin}
              onChange={handleChange("coin")}
              className="w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white"
            >
              {coins.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Exchange select */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              gets listed on
            </label>
            <select
              value={form.exchange}
              onChange={handleChange("exchange")}
              className="w-full rounded-lg border-pink-500 p-2 dark:bg-gray-800 dark:text-white"
            >
              {exchanges.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          {/* Last coin detected (dummy) */}
          <p className="mt-6 mb-2 text-xs text-green-400 text-center">
            ⚡ Last coin detected: <span className="text-green-300 font-mono">ALKIMI</span> listed on <span className="text-blue-400">Gate.io</span> on <span className="text-green-200">August 20 16:00</span>.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 mt-4 transition shadow"
          >
            SET ALERT
          </button>
        </form>
      </div>
    </div>
  );
}
