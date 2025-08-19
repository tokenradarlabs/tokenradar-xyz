"use client";
import React, { useState } from "react";
import { PlugZap, Bot, Percent, ArrowUp, ArrowDown, Bitcoin } from "lucide-react";
import PercentAlertForm from "@/components/PercentAlertForm/PercentAlertForm";

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

  // Demo static price, replace with real data if needed
  const price = "117,197.41 USD";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle logic here
    const formData = { channel, webhook, discordBot, coin, direction, percent, interval, exchange };
    console.log(formData);
    // API call, feedback etc. can be added
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-blue-100 dark:border-indigo-800">
        <h2 className="text-3xl font-bold mb-2 text-center text-fuchsia-600 dark:text-pink-300">
          Percentage Price Alert
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Get notified when a coin changes in value by a specific percent.
        </p>
        <PercentAlertForm
          channel={channel} setChannel={setChannel}
          webhook={webhook} setWebhook={setWebhook}
          discordBot={discordBot} setDiscordBot={setDiscordBot}
          coin={coin} setCoin={setCoin}
          direction={direction} setDirection={setDirection}
          percent={percent} setPercent={setPercent}
          interval={interval} setInterval={setInterval}
          exchange={exchange} setExchange={setExchange}
          coins={coins} channels={channels}
          directions={directions} intervals={intervals}
          exchanges={exchanges}
          onSubmit={handleSubmit}
          price={price}
        />
      </div>
    </div>
  );
}
