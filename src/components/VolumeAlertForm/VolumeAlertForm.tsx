"use client";
import React from "react";
import { useDebouncedCallback } from 'use-debounce';
import { PlugZap, Bot } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/lib/contexts/toast-context";
import { isValidUrl } from "../../utils/validation";

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
};

const selectClass =
  "w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-700 transition outline-none";

const labelClass =
  "block font-medium text-gray-300 mb-1 text-sm";

const VolumeAlertForm: React.FC<Props> = ({
  channel, setChannel, webhook, setWebhook, discordBot, setDiscordBot,
  coin, setCoin, exchange, setExchange, multiplier, setMultiplier, interval, setInterval,
  onSubmit, channels, coins, exchanges, multipliers, intervals, isLoading
}) => {
  const { showToast } = useToast();

  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [discordBotError, setDiscordBotError] = useState<string | null>(null);

  const debouncedSetChannel = useDebouncedCallback((value: string) => setChannel(value), 300);
  const debouncedSetWebhook = useDebouncedCallback((value: string) => {
    setWebhook(value);
    if (!isValidUrl(value)) {
      setWebhookError("Please enter a valid URL.");
    } else {
      setWebhookError(null);
    }
  }, 300);
  const debouncedSetDiscordBot = useDebouncedCallback((value: string) => {
    setDiscordBot(value);
    if (!isValidUrl(value)) {
      setDiscordBotError("Please enter a valid URL.");
    } else {
      setDiscordBotError(null);
    }
  }, 300);
  const debouncedSetCoin = useDebouncedCallback((value: string) => setCoin(value), 300);
  const debouncedSetExchange = useDebouncedCallback((value: string) => setExchange(value), 300);
  const debouncedSetMultiplier = useDebouncedCallback((value: string) => setMultiplier(value), 300);
  const debouncedSetInterval = useDebouncedCallback((value: string) => setInterval(value), 300);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger all validations manually before submission
    const isWebhookValid = webhook ? isValidUrl(webhook) : true; // Optional field
    const isDiscordBotValid = discordBot ? isValidUrl(discordBot) : true; // Optional field

    if (!isWebhookValid) setWebhookError("Please enter a valid URL.");
    if (!isDiscordBotValid) setDiscordBotError("Please enter a valid URL.");

    if (!isWebhookValid || !isDiscordBotValid) {
      return; // Stop submission if any validation fails
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      // TODO: Implement actual API call to set Volume alert
      const result = { ok: true, message: "Volume alert set successfully!" };

      if (!result.ok) {
        showToast(result.message || "Failed to set volume alert.", "error");
        return;
      }
      showToast("Volume alert set successfully!", "success");
      onSubmit(e);
    } catch (err: any) {
      showToast(err.message || "Failed to set volume alert.", "error");
      console.error("Failed to set volume alert:", err);
    }
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>
      {/* Channel Selector */}
      <div>
        <label className={labelClass}>Channel</label>
        <select value={channel} onChange={e => debouncedSetChannel(e.target.value)}
          className={selectClass}>
          {channels.map(ch => <option key={ch.value} value={ch.value}>{ch.label}</option>)}
        </select>
      </div>
      {/* Conditional Inputs */}
      {channel === "webhook" && (
        <div>
          <label className={labelClass}>Webhook URL</label>
          <div className={`flex items-center bg-gray-800 rounded-lg px-4 py-2 border ${webhookError ? 'border-red-500' : 'border-gray-700'}`}>
            <PlugZap className="mr-2 text-blue-400" />
            <input
              type="url" value={webhook} onChange={debouncedSetWebhook}
              placeholder="https://webhook.site/..." required
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400" />
          </div>
          {webhookError && <p className="text-red-500 text-xs mt-1">{webhookError}</p>}
        </div>
      )}
      {channel === "discord" && (
        <div>
          <label className={labelClass}>Discord Bot Token</label>
          <div className={`flex items-center bg-gray-800 rounded-lg px-4 py-2 border ${discordBotError ? 'border-red-500' : 'border-gray-700'}`}>
            <Bot className="mr-2 text-purple-400" />
            <input
              type="text" value={discordBot} onChange={debouncedSetDiscordBot}
              placeholder="Paste Discord Bot Token"
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400"
            />
          </div>
          {discordBotError && <p className="text-red-500 text-xs mt-1">{discordBotError}</p>}
        </div>
      )}
      {/* TWO ROWS: Coin/Exchange, Multiplier/Interval */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Coin</label>
          <select value={coin} onChange={debouncedSetCoin} className={selectClass}>
            {coins.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Exchange</label>
          <select value={exchange} onChange={debouncedSetExchange} className={selectClass}>
            {exchanges.map(ex => <option key={ex} value={ex}>{ex}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Multiplier</label>
          <select value={multiplier} onChange={debouncedSetMultiplier} className={selectClass}>
            {multipliers.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Interval</label>
          <select value={interval} onChange={debouncedSetInterval} className={selectClass}>
            {intervals.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <button type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center"
        disabled={isLoading}>
        {isLoading ? <Spinner /> : "Set Alert"}
      </button>
    </form>
  );
};

export default VolumeAlertForm;
