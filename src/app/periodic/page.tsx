"use client";
import React, { useState } from "react";
import PeriodicAlertForm from "@/components/PeriodicAlertForm/PeriodicAlertForm";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];
const coins = [
  { label: "BTC", value: "BTC" },
  { label: "ETH", value: "ETH" },
  { label: "USDT", value: "USDT" },
];
const conditions = [
  { label: "above", value: "above" },
  { label: "below", value: "below" }
];
const currencies = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" }
];
const exchanges = [
  { label: "CoinGecko", value: "CoinGecko" },
  { label: "Uniswap", value: "Uniswap" }
];

export default function PeriodicPage() {
  const [coin, setCoin] = useState(coins[0].value);
  const [channel, setChannel] = useState(channels[0].value);
  const [webhook, setWebhook] = useState("");
  const [discordBot, setDiscordBot] = useState("");
  const [condition, setCondition] = useState(conditions[0].value);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState(currencies[0].value);
  const [exchange, setExchange] = useState(exchanges[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { channel, webhook, discordBot, coin, condition, price, currency, exchange };
    console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-[#aba6bb] to-[#d3ccea]">
      <div className="max-w-xl w-full bg-[#181a22] shadow-2xl rounded-2xl p-10 border border-[#22243a]">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-200 tracking-tight">
          Periodic Price Alert
        </h2>
        <PeriodicAlertForm
          channel={channel} setChannel={setChannel}
          webhook={webhook} setWebhook={setWebhook}
          discordBot={discordBot} setDiscordBot={setDiscordBot}
          coin={coin} setCoin={setCoin}
          condition={condition} setCondition={setCondition}
          price={price} setPrice={setPrice}
          currency={currency} setCurrency={setCurrency}
          exchange={exchange} setExchange={setExchange}
          channels={channels}
          coins={coins}
          conditions={conditions}
          currencies={currencies}
          exchanges={exchanges}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
