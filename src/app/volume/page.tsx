"use client";
import React, { useState } from "react";
import VolumeAlertForm from "@/components/VolumeAlertForm/VolumeAlertForm";
import { Card } from "@/components/ui/card";


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
  const [multiplier, setMultiplier] = useState<string>(multipliers[0]);
  const [interval, setInterval] = useState<string>(intervals[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form data
    const formData = {
      channel,
      webhook,
      discordBot,
      coin,
      exchange,
      multiplier,
      interval,
    };
    // Backend API call or next step here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <Card className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-pink-600">
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-300">
            Volume Alert
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Get notified of unusual trading volume on crypto exchanges.
          </p>
          <VolumeAlertForm
            channel={channel}
            setChannel={setChannel}
            webhook={webhook}
            setWebhook={setWebhook}
            discordBot={discordBot}
            setDiscordBot={setDiscordBot}
            coin={coin}
            setCoin={setCoin}
            exchange={exchange}
            setExchange={setExchange}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            interval={interval}
            setInterval={setInterval}
            onSubmit={handleSubmit}
            channels={channels}
            coins={coins}
            exchanges={exchanges}
            multipliers={multipliers}
            intervals={intervals}
          />
      </Card>
    </div>
  );
}
