"use client";
import React, { useState } from "react";
import PeriodicAlertForm from "@/components/PeriodicAlertForm/PeriodicAlertForm";
import { useCoinAndExchangeData } from "@/lib/hooks/useCoinAndExchangeData";
import { Spinner } from "@/components/ui/spinner";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];
const conditions = [
  { label: "above", value: "above" },
  { label: "below", value: "below" }
];
const currencies = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" }
];
export default function PeriodicPage() {
  const { coins: fetchedCoins, exchanges: fetchedExchanges, isLoading: isLoadingData, error: dataError } = useCoinAndExchangeData();

  const [coin, setCoin] = useState("");
  const [channel, setChannel] = useState(channels[0].value);
  const [webhook, setWebhook] = useState("");
  const [discordBot, setDiscordBot] = useState("");
  const [condition, setCondition] = useState(conditions[0].value);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState(currencies[0].value);
  const [exchange, setExchange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (fetchedCoins.length > 0 && !coin) {
      setCoin(fetchedCoins[0]);
    }
    if (fetchedExchanges.length > 0 && !exchange) {
      setExchange(fetchedExchanges[0]);
    }
  }, [fetchedCoins, fetchedExchanges, coin, exchange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = { channel, webhook, discordBot, coin, condition, price, currency, exchange };
      console.log("Form data:", data);
      // TODO: Implement actual API call to set Periodic Price alert
      // Reset form fields after successful submission
      setWebhook("");
      setDiscordBot("");
      setPrice("");
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to set Periodic Price alert.");
      console.error("Failed to set Periodic Price alert:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (dataError) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading data: {dataError.message}</div>;
  }

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
          coins={fetchedCoins.map(c => ({ label: c, value: c }))}
          conditions={conditions}
          currencies={currencies}
          exchanges={fetchedExchanges.map(ex => ({ label: ex, value: ex }))}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
