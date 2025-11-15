'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from "@/components/ui/spinner";
import { SelectField } from "@/components/ui/select-field";
import { UrlField } from "@/components/ui/url-field";
import { NumberField } from "@/components/ui/number-field";
import { marketCapAlertSchema, MarketCapAlertFormValues } from "@/lib/schemas/marketCapAlert";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const coins = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Tether", value: "USDT" },
]; // Placeholder, ideally fetched from an API

const directions = [
  { label: "rises above", value: "above" },
  { label: "falls below", value: "below" },
];

export default function MarketCapAlertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<MarketCapAlertFormValues>({
    resolver: zodResolver(marketCapAlertSchema),
    defaultValues: {
      channel: "webhook",
      webhook: "",
      discordBot: "",
      coin: "BTC",
      direction: "above",
      cap: 0,
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { watch, handleSubmit } = form;
  const channel = watch("channel");

  const onSubmit = async (data: MarketCapAlertFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      // TODO: Implement actual API call to set Market Cap alert
      form.reset();
    } catch (err: any) {
      setError(err.message || "Failed to set Market Cap alert.");
      console.error("Failed to set Market Cap alert:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <SelectField
          name="channel"
          label="Send me an"
          options={channels}
          disabled={isLoading}
        />

        {channel === 'webhook' && (
          <UrlField
            name="webhook"
            label="Webhook URL"
            placeholder="https://webhook.site/..."
            disabled={isLoading}
          />
        )}
        {channel === 'discord' && (
          <UrlField
            name="discordBot"
            label="Discord Bot Webhook URL"
            placeholder="Bot Token"
            disabled={isLoading}
          />
        )}

        <SelectField
          name="coin"
          label="when the"
          options={coins}
          disabled={isLoading}
        />

        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-300 font-medium">marketcap</span>
          <SelectField
            name="direction"
            options={directions}
            disabled={isLoading}
          />
          <NumberField
            name="cap"
            placeholder="00"
            min={0}
            disabled={isLoading}
          />
          <span className='pl-2 text-gray-700 dark:text-gray-300'>
            billion USD.
          </span>
        </div>

        <p id="current-marketcap-helper" className='mb-2 mt-6 text-center text-xs text-green-400'>
          ⚡ For reference,{' '}
          <span className='font-mono text-yellow-300'>BTC marketcap</span> is
          currently{' '}
          <span className='font-mono text-green-300'>
            $-- billion
          </span>
          .
        </p>

        {error && <p role="alert" aria-live="polite" className="text-red-500 text-center">{error}</p>}
        <button type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center"
        disabled={isLoading}
        aria-busy={isLoading}>
        {isLoading ? <Spinner /> : "Set Alert"}
      </button>
      </form>
    </FormProvider>
  );
}