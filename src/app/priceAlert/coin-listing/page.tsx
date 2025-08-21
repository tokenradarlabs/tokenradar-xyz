"use client";
import React, { useState } from "react";
import CoinListingAlertForm from "@/components/CoinlistingAlertForm/CoinListingAlertForm";

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
        <CoinListingAlertForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          channels={channels}
          coins={coins}
          exchanges={exchanges}
        />
      </div>
    </div>
  );
}
