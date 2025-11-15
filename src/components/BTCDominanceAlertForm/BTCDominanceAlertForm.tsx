'use client';
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { SelectField } from "@/components/ui/select-field";
import { UrlField } from "@/components/ui/url-field";
import { NumberField } from "@/components/ui/number-field";
import { btcDominanceAlertSchema, BTCDominanceAlertFormValues } from "@/lib/schemas/btcDominanceAlert";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const directions = [
  { label: "rises above", value: "above" },
  { label: "falls below", value: "below" },
];

export default function BTCDominanceAlertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<BTCDominanceAlertFormValues>({
    resolver: zodResolver(btcDominanceAlertSchema),
    defaultValues: {
      channel: "webhook",
      webhook: "",
      discordBot: "",
      direction: "above",
      level: 0,
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { watch, handleSubmit } = form;
  const channel = watch("channel");

  const onSubmit = async (data: BTCDominanceAlertFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      // TODO: Implement actual API call to set BTC dominance alert
      form.reset();
    } catch (err: any) {
      setError(err.message || "Failed to set BTC dominance alert.");
      console.error("Failed to set BTC dominance alert:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SelectField
          name="channel"
          label="Send me a"
          options={channels}
          disabled={isLoading}
        />

        {channel === "webhook" && (
          <UrlField
            name="webhook"
            label="Webhook URL"
            placeholder="https://webhook.site/..."
            disabled={isLoading}
          />
        )}

        {channel === "discord" && (
          <UrlField
            name="discordBot"
            label="Discord Bot Webhook URL"
            placeholder="https://discord.com/api/webhooks/..."
            disabled={isLoading}
          />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-300 font-medium">when the Bitcoin dominance level</span>
          <SelectField
            name="direction"
            options={directions}
            disabled={isLoading}
          />
          <NumberField
            name="level"
            placeholder="00"
            min={0}
            max={100}
            step={0.01}
            disabled={isLoading}
          />
          <span className="text-gray-300 font-medium">percent.</span>
        </div>

        <p className="mt-2 text-center text-sm text-green-400">
          ⚡ For reference,{' '}
          <span className="text-green-400 font-mono">BTC Dominance</span> is currently <span className="text-green-300 font-mono">--%</span>.
        </p>

        {error && <p role="alert" aria-live="polite" className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? <Spinner /> : "Set Alert"}
        </button>
      </form>
    </FormProvider>
  );
}