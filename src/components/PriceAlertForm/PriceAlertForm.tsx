"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceAlertSchema, PriceAlertFormValues } from "../../lib/schemas/priceAlert";
import ChannelSelect from "./ChannelSelect";
import WebhookField from "./WebhookField";
import DiscordField from "./DiscordField";
import CoinConditionRow from "./CoinConditionRow";
import PriceCurrencyRow from "./PriceCurrencyRow";
import ExchangeSelect from "./ExchangeSelect";
import { useToast } from "../ui/use-toast";

export default function PriceAlertForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<PriceAlertFormValues>({
    resolver: zodResolver(priceAlertSchema),
    defaultValues: {
      coins: [{ coinId: "", condition: "above" }],
      threshold: 0,
      currency: "USD",
      channel: "webhook",
      discordWebhookUrl: "",
      webhookUrl: "",
    },
  });

  const { toast } = useToast();
  const channel = watch("channel");
  const coins = watch("coins");
  const [exchange, setExchange] = useState("CoinGecko");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: PriceAlertFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/price-alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create price alert.");
      }

      toast({
        title: "Success!",
        description: "Price alert created successfully.",
      });
      reset(); // Reset form fields
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      console.error("Failed to create price alert:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white dark:bg-gray-950 shadow-xl rounded-3xl p-10 relative border border-blue-100 dark:border-indigo-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-purple-300">
        Price Alert
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Controller
          name="channel"
          control={control}
          render={({ field }) => (
            <ChannelSelect value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.channel && (
          <p className="text-red-500 text-sm">{errors.channel.message}</p>
        )}
        {channel === "webhook" && (
          <>
            <Controller
              name="webhookUrl"
              control={control}
              render={({ field }) => (
                <WebhookField value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.webhookUrl && (
              <p className="text-red-500 text-sm">{errors.webhookUrl.message}</p>
            )}
          </>
        )}
        {channel === "discord" && (
          <>
            <Controller
              name="discordWebhookUrl"
              control={control}
              render={({ field }) => (
                <DiscordField value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.discordWebhookUrl && (
              <p className="text-red-500 text-sm">{errors.discordWebhookUrl.message}</p>
            )}
          </>
        )}
        <Controller
          name="coins.0.coinId"
          control={control}
          render={({ field }) => (
            <CoinConditionRow
              coin={field.value}
              setCoin={field.onChange}
              condition={coins[0]?.condition || "above"}
              setCondition={(newCondition) => {
                control.setValue("coins.0.condition", newCondition);
              }}
            />
          )}
        />
        {errors.coins?.[0]?.coinId && (
          <p className="text-red-500 text-sm">{errors.coins[0].coinId.message}</p>
        )}
        <Controller
          name="coins.0.condition"
          control={control}
          render={({ field }) => (
            <CoinConditionRow
              coin={coins[0]?.coinId || ""}
              setCoin={(newCoinId) => {
                control.setValue("coins.0.coinId", newCoinId);
              }}
              condition={field.value}
              setCondition={field.onChange}
            />
          )}
        />
        {errors.coins?.[0]?.coinId && (
          <p className="text-red-500 text-sm">{errors.coins[0].coinId.message}</p>
        )}
        {errors.coins?.[0]?.condition && (
          <p className="text-red-500 text-sm">{errors.coins[0].condition.message}</p>
        )}
        <Controller
          name="threshold"
          control={control}
          render={({ field }) => (
            <PriceCurrencyRow
              price={field.value}
              setPrice={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              currency={watch("currency")}
              setCurrency={(newCurrency) => {
                control.setValue("currency", newCurrency);
              }}
            />
          )}
        />
        {errors.threshold && (
          <p className="text-red-500 text-sm">{errors.threshold.message}</p>
        )}
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <PriceCurrencyRow
              price={watch("threshold")}
              setPrice={(e) => control.setValue("threshold", parseFloat(e.target.value) || 0)}
              currency={field.value}
              setCurrency={field.onChange}
            />
          )}
        />
        <ExchangeSelect value={exchange} onChange={setExchange} />
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Set Alert"}
        </button>
      </form>
    </div>
  );
}
