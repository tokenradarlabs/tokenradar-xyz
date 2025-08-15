"use client";
import React, { useState } from "react";
import ChannelSelect from "./ChannelSelect";
import WebhookField from "./WebhookField";
import DiscordField from "./DiscordField";
import CoinConditionRow from "./CoinConditionRow";
import PriceCurrencyRow from "./PriceCurrencyRow";
import ExchangeSelect from "./ExchangeSelect";

export default function PriceAlertForm() {
  const [channel, setChannel] = useState("webhook");
  const [webhook, setWebhook] = useState("");
  const [discordBot, setDiscordBot] = useState("");
  const [coin, setCoin] = useState("BTC");
  const [condition, setCondition] = useState("above");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [exchange, setExchange] = useState("CoinGecko");

  return (
    <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-blue-100 dark:border-indigo-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-purple-300">
        Price Alert
      </h2>
      <form className="space-y-5">
        <ChannelSelect value={channel} onChange={setChannel} />
        {channel === "webhook" && (
          <WebhookField value={webhook} onChange={setWebhook} />
        )}
        {channel === "discord" && (
          <DiscordField value={discordBot} onChange={setDiscordBot} />
        )}
        <CoinConditionRow coin={coin} setCoin={setCoin} condition={condition} setCondition={setCondition} />
        <PriceCurrencyRow price={price} setPrice={setPrice} currency={currency} setCurrency={setCurrency} />
        <ExchangeSelect value={exchange} onChange={setExchange} />
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
        >
          Set Alert
        </button>
      </form>
    </div>
  );
}
