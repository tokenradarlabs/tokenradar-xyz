'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from "@/components/ui/spinner";
import { SelectField } from "@/components/ui/select-field";
import { UrlField } from "@/components/ui/url-field";
import { coinListingAlertSchema, CoinListingAlertFormValues } from "@/lib/schemas/coinListingAlert";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const coins = ["BTC", "ETH", "USDT"]; // Placeholder, ideally fetched from an API
const exchanges = ["CoinGecko", "Uniswap"]; // Placeholder, ideally fetched from an API

export default function CoinListingAlertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CoinListingAlertFormValues>({
    resolver: zodResolver(coinListingAlertSchema),
    defaultValues: {
      channel: "webhook",
      webhook: "",
      discordBot: "",
      coin: "BTC",
      exchange: "CoinGecko",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { watch, handleSubmit } = form;
  const channel = watch("channel");

  const onSubmit = async (data: CoinListingAlertFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      // TODO: Implement actual API call to set Coin Listing alert
      form.reset();
    } catch (err: any) {
      setError(err.message || "Failed to set Coin Listing alert.");
      console.error("Failed to set Coin Listing alert:", err);
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
            placeholder="XXXXXX"
            disabled={isLoading}
          />
        )}

        <SelectField
          name="coin"
          label="as soon as"
          options={coins.map(c => ({ label: c, value: c }))}
          disabled={isLoading}
        />

        <SelectField
          name="exchange"
          label="gets listed on"
          options={exchanges.map(ex => ({ label: ex, value: ex }))}
          disabled={isLoading}
        />

        <p className='mb-2 mt-6 text-center text-xs text-green-400'>
          ⚡ Last coin detected:{' '}
          <span className='font-mono text-green-300'>ALKIMI</span> listed on{' '}
          <span className='text-blue-400'>Gate.io</span> on{' '}
          <span className='text-green-200'>August 20 16:00</span>.
        </p>

        {error && <p role="alert" aria-live="polite" className="text-red-500 text-center">{error}</p>}
        <button
          type='submit'
          className='mt-6 w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-blue-600 flex items-center justify-center'
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? <Spinner /> : "Set Alert"}
        </button>
      </form>
    </FormProvider>
  );
}