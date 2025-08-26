'use client';
import React from "react";

type FormState = {
  channel: string;
  discordBot: string;
  webhook: string;
  direction: string;
  level: string;
};

type Option = { label: string; value: string };

type Props = {
  form: FormState;
  handleChange: (
    key: keyof FormState
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  channels: Option[];
  directions: Option[];
  btcDominance: string;
};

export default function BTCDominanceAlertForm({
  form, handleChange, handleSubmit, channels, directions, btcDominance
}: Props) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Channel select */}
      <div>
        <label className="block mb-2 text-gray-300 font-medium">
          Send me a
        </label>
        <select
          value={form.channel}
          onChange={handleChange("channel")}
          className="w-full rounded-xl border border-pink-500 bg-gray-900 text-white p-2 focus:border-pink-600"
        >
          {channels.map(ch => (
            <option key={ch.value} value={ch.value}>
              {ch.label}
            </option>
          ))}
        </select>
      </div>

      {/* Webhook/DiscordBot credentials field */}
      {form.channel === "webhook" && (
        <div>
          <label className="block mb-2 text-gray-300 font-medium">
            Webhook URL
          </label>
          <input
            type="text"
            value={form.webhook}
            onChange={handleChange("webhook")}
            placeholder="https://webhook.site/..."
            className="w-full rounded-xl border border-pink-300 bg-gray-900 text-white p-2"
          />
        </div>
      )}

      {form.channel === "discord" && (
        <div>
          <label className="block mb-2 text-gray-300 font-medium">
            Discord Bot Token
          </label>
          <input
            type="text"
            value={form.discordBot}
            onChange={handleChange("discordBot")}
            placeholder="Bot Token"
            className="w-full rounded-xl border border-pink-300 bg-gray-900 text-white p-2"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-300 font-medium">when the Bitcoin dominance level</span>
        <select
          value={form.direction}
          onChange={handleChange("direction")}
          className="rounded-xl border border-pink-500 bg-gray-900 text-white p-2"
        >
          {directions.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={form.level}
          onChange={handleChange("level")}
          placeholder="00"
          className="w-16 rounded-xl border border-pink-300 bg-gray-900 text-white p-2"
        />
        <span className="text-gray-300 font-medium">percent.</span>
      </div>

      {/* BTC dominance reference */}
      <p className="mt-2 text-center text-sm text-green-400">
        ⚡ For reference,{' '}
        <span className="text-green-400 font-mono">BTC Dominance</span> is currently <span className="text-green-300 font-mono">{btcDominance}%</span>.
      </p>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition"
      >
        SET ALERT
      </button>
    </form>
  );
}
