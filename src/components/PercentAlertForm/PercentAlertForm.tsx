"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { SelectField } from "@/components/ui/select-field";
import { UrlField } from "@/components/ui/url-field";
import { NumberField } from "@/components/ui/number-field";
import { percentageAlertSchema, PercentageAlertFormValues } from "@/lib/schemas/percentageAlert";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const coins = [
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Ethereum", value: "ethereum" },
  { label: "Ripple", value: "ripple" },
];

const directions = [
  { label: "rises", value: "rises" },
  { label: "drops", value: "drops" },
];

const intervals = [
  { label: "1h", value: "1h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
];

const exchanges = [
  { label: "CoinGecko", value: "CoinGecko" },
  { label: "Uniswap", value: "Uniswap" },
];

export default function PercentAlertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PercentageAlertFormValues>({
    resolver: zodResolver(percentageAlertSchema),
    defaultValues: {
      channel: "webhook",
      webhookUrl: "",
      discordWebhookUrl: "",
      coin: "bitcoin",
      direction: "rises",
      percentage: 0,
      interval: "24h",
      exchange: "CoinGecko",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { watch, handleSubmit } = form;
  const channel = watch("channel");
  const coin = watch("coin");

  const onSubmit = async (data: PercentageAlertFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      // TODO: Implement actual API call to set Percentage alert
      form.reset();
    } catch (err: any) {
      setError(err.message || "Failed to set Percentage alert.");
      console.error("Failed to set Percentage alert:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          name="channel"
          label="Channel"
          options={channels}
          disabled={isLoading}
        />
        {channel === "webhook" && (
          <UrlField
            name="webhookUrl"
            label="Webhook URL"
            placeholder="https://webhook.site/..."
            disabled={isLoading}
          />
        )}
        {channel === "discord" && (
          <UrlField
            name="discordWebhookUrl"
            label="Discord Bot Webhook URL"
            placeholder="https://discord.com/api/webhooks/..."
            disabled={isLoading}
          />
        )}
    <div className="grid grid-cols-2 gap-5">
      <SelectField
        name="coin"
        label="Coin"
        options={coins}
        disabled={isLoading}
      />
      <SelectField
        name="direction"
        label="Direction"
        options={directions}
        disabled={isLoading}
      />
    </div>
    <div className="grid grid-cols-2 gap-5">
      <NumberField
        name="percentage"
        label="Percent (%)"
        placeholder="00"
        min={0}
        max={100}
        step={0.01}
        disabled={isLoading}
      />
      <SelectField
        name="interval"
        label="Interval"
        options={intervals}
        disabled={isLoading}
      />
    </div>
    <SelectField
      name="exchange"
      label="Exchange"
      options={exchanges}
      disabled={isLoading}
    />
    {/* Price Note */}
    <div className="text-sm mt-3 text-gray-400">
      ⚡ The price of {coin} is currently <span className="text-green-400 font-bold">--</span>.
    </div>
    {error && <p className="text-red-500 text-center">{error}</p>}
    <button type="submit"
      className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      disabled={isLoading}>
      {isLoading ? <Spinner /> : "Set Alert"}
    </button>
  </form>
);

export default PercentAlertForm;
