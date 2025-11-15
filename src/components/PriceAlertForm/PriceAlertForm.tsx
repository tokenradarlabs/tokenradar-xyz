"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceAlertSchema, PriceAlertFormValues } from "../../lib/schemas/priceAlert";
import CoinConditionRow from "./CoinConditionRow";
import PriceCurrencyRow from "./PriceCurrencyRow";
import { SelectField } from "../ui/select-field";
import { UrlField } from "../ui/url-field";
import { NumberField } from "../ui/number-field";
import { Spinner } from "../ui/spinner";
import { useToast } from "@/lib/contexts/toast-context";

export default function PriceAlertForm() {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
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
      exchange: "CoinGecko",
    },
  });

  // const { toast } = useToast();
  const channel = watch("channel");
  const coins: PriceAlertFormValues['coins'] = watch("coins");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: PriceAlertFormValues) => {
    setIsLoading(true);
    // setError(null);
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

      showToast("Price alert created successfully.", "success");
      reset(); // Reset form fields
    } catch (err: any) {
      // setError(err.message);
      showToast(err.message || "Failed to create price alert.", "error");
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
        <SelectField
          name="channel"
          label="Channel"
          placeholder="Select where to receive alerts"
          options={[
            { label: "Webhook", value: "webhook" },
            { label: "Discord Bot", value: "discord" },
          ]}
        />
        {channel === "webhook" && (
          <>
          <UrlField
            name="webhookUrl"
            label="Webhook URL"
            placeholder="Enter your webhook URL"
          />
          </>
        )}
        {channel === "discord" && (
          <>
          <UrlField
            name="discordWebhookUrl"
            label="Discord Webhook URL"
            placeholder="Enter your Discord webhook URL"
          />
          </>
        )}
        <SelectField
          name="coins.0.coinId"
          label="Coin"
          placeholder="Select a coin"
          options={[
            { label: "Bitcoin", value: "bitcoin" },
            { label: "Ethereum", value: "ethereum" },
            { label: "Ripple", value: "ripple" },
          ]} // Placeholder options
        />
        <SelectField
          name="coins.0.condition"
          label="Condition"
          placeholder="Select a condition"
          options={[
            { label: "Above", value: "above" },
            { label: "Below", value: "below" },
          ]}
        />
        <NumberField
          name="threshold"
          label="Threshold"
          placeholder="Enter threshold price"
          step={0.01}
        />
        <SelectField
          name="currency"
          label="Currency"
          placeholder="Select currency"
          options={[
            { label: "USD", value: "USD" },
            { label: "EUR", value: "EUR" },
            { label: "GBP", value: "GBP" },
          ]} // Placeholder options
        />

        <SelectField
          name="exchange"
          label="Exchange"
          options={[
            { label: "CoinGecko", value: "CoinGecko" },
            { label: "Uniswap", value: "Uniswap" },
          ]}
        />
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
      </form>
    </div>
  );
}
