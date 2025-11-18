"use client";
import React, { useState } from "react";
import VolumeAlertForm from "@/components/VolumeAlertForm/VolumeAlertForm";
import { Card } from "@/components/ui/card";
import { useCoinAndExchangeData } from "@/lib/hooks/useCoinAndExchangeData";
import { Spinner } from "@/components/ui/spinner";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const multipliers = [
  "2x", "5x", "10x"
];

const intervals = [
  "1h", "24h", "7d"
];

export default function VolumePage() {
  const { coins: fetchedCoins, exchanges: fetchedExchanges, isLoading: isLoadingData, error: dataError } = useCoinAndExchangeData();

  const [channel, setChannel] = useState<string>(channels[0].value);
  const [webhook, setWebhook] = useState<string>("");
  const [discordBot, setDiscordBot] = useState<string>("");
  const [coin, setCoin] = useState<string>("");
  const [exchange, setExchange] = useState<string>("");
  const [multiplier, setMultiplier] = useState<string>(multipliers[0]);
  const [interval, setInterval] = useState<string>(intervals[0]);
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      // Reset form fields after successful submission
      setWebhook("");
      setDiscordBot("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Failed to set volume alert:", errorMessage);
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
            coins={fetchedCoins}
            exchanges={fetchedExchanges}
            multipliers={multipliers}
            intervals={intervals}
            isLoading={isLoading}
          />
      </Card>
    </div>
  );
}
