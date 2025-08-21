"use client";
import React from "react";

type AlertFormState = {
  channel: string;
  webhook: string;
  discordBot: string;
  coin: string;
  exchange: string;
};
type Props = {
  form: AlertFormState;
  handleChange: (key: keyof AlertFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  channels: { label: string; value: string }[];
  coins: string[];
  exchanges: string[];
};

export default function CoinListingAlertForm({
  form, handleChange, handleSubmit,
  channels, coins, exchanges,
}: Props) {
  return (
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

      {/* Last coin detected */}
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
  );
}
