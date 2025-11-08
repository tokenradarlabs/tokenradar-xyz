"use client";
import React, { useState } from "react";
import MarketCapAlertForm from "@/components/MarketCapAlertForm/MarketCapAlertForm";
import { Card } from "@/components/ui/card";


const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" }
];
const coins = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Tether", value: "USDT" }
];
const directions = [
  { label: "goes above", value: "above" },
  { label: "goes below", value: "below" }
];

type MarketCapFormState = {
  channel: string;
  webhook: string;
  discordBot: string;
  coin: string;
  direction: string;
  cap: string;
};

export default function MarketCapAlertPage() {
  const [form, setForm] = useState<MarketCapFormState>({
    channel: channels[0].value,
    webhook: "",
    discordBot: "",
    coin: coins[0].value,
    direction: directions[0].value,
    cap: "",
  });

  const handleChange = (key: keyof MarketCapFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Backend API call here
  };

  // Demo placeholder
  const currentMarketCap = "2,257.0068";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <Card className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-pink-600">
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-300">
            Crypto MarketCap Alert
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Monitor the market capitalization of the entire crypto space.
          </p>
          <MarketCapAlertForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            channels={channels}
            coins={coins}
            directions={directions}
            currentMarketCap={currentMarketCap}
          />
      </Card>
    </div>
  );
}
