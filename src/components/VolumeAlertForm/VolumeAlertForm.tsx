"use client";
import React from "react";
import { useDebouncedCallback } from 'use-debounce';
import { PlugZap, Bot } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  channel: string; setChannel: (v: string) => void;
  webhook: string; setWebhook: (v: string) => void;
  discordBot: string; setDiscordBot: (v: string) => void;
  coin: string; setCoin: (v: string) => void;
  exchange: string; setExchange: (v: string) => void;
  multiplier: string; setMultiplier: (v: string) => void;
  interval: string; setInterval: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  channels: { label: string; value: string }[]; coins: string[];
  exchanges: string[]; multipliers: string[]; intervals: string[];
  isLoading: boolean;
  error: string | null;
};

const selectClass =
  "w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-700 transition outline-none";

const labelClass =
  "block font-medium text-gray-300 mb-1 text-sm";

const VolumeAlertForm: React.FC<Props> = ({
  channel, setChannel, webhook, setWebhook, discordBot, setDiscordBot,
  coin, setCoin, exchange, setExchange, multiplier, setMultiplier, interval, setInterval,
  onSubmit, channels, coins, exchanges, multipliers, intervals, isLoading, error
}) => {
  return (
    <form className="space-y-7" onSubmit={onSubmit}>
      {/* Channel Selector */}
      <div>
        <label className={labelClass}>Channel</label>
        <select value={channel} onChange={useDebouncedCallback(e => setChannel(e.target.value), 300)}
          className={selectClass}>
          {channels.map(ch => <option key={ch.value} value={ch.value}>{ch.label}</option>)}
        </select>
      </div>
      {/* Conditional Inputs */}
      {channel === "webhook" && (
        <div>
          <label className={labelClass}>Webhook URL</label>
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
            <PlugZap className="mr-2 text-blue-400" />
            <input
              type="url" value={webhook} onChange={useDebouncedCallback(e => setWebhook(e.target.value), 300)}
              placeholder="https://webhook.site/..." required
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400" />
          </div>
        </div>
      )}
      {channel === "discord" && (
        <div>
          <label className={labelClass}>Discord Bot Token</label>
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
            <Bot className="mr-2 text-purple-400" />
            <input
              type="text" value={discordBot} onChange={useDebouncedCallback(e => setDiscordBot(e.target.value), 300)}
              placeholder="Paste Discord Bot Token"
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>
      )}
      {/* TWO ROWS: Coin/Exchange, Multiplier/Interval */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Coin</label>
          <select value={coin} onChange={useDebouncedCallback(e => setCoin(e.target.value), 300)} className={selectClass}>
            {coins.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Exchange</label>
          <select value={exchange} onChange={useDebouncedCallback(e => setExchange(e.target.value), 300)} className={selectClass}>
            {exchanges.map(ex => <option key={ex} value={ex}>{ex}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Multiplier</label>
          <select value={multiplier} onChange={useDebouncedCallback(e => setMultiplier(e.target.value), 300)} className={selectClass}>
            {multipliers.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Interval</label>
          <select value={interval} onChange={useDebouncedCallback(e => setInterval(e.target.value), 300)} className={selectClass}>
            {intervals.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center"
        disabled={isLoading}>
        {isLoading ? <Spinner /> : "Set Alert"}
      </button>
    </form>
  );
};

export default VolumeAlertForm;
