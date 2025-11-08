"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceAlertSchema, PriceAlertFormValues } from "../../lib/schemas/priceAlert";
import ChannelSelect from "./ChannelSelect";
import WebhookField from "./WebhookField";
import DiscordField from "./DiscordField";
import CoinConditionRow from "./CoinConditionRow";
import PriceCurrencyRow from "./PriceCurrencyRow";
import ExchangeSelect from "./ExchangeSelect";

export default function PriceAlertForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
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

  const channel = watch("channel");
  const coins = watch("coins");
  const [exchange, setExchange] = useState("CoinGecko");

  const onSubmit = (data: PriceAlertFormValues) => {
    console.log(data);
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
        )}
        {channel === "discord" && (
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
        )}
        <Controller
          name="coins.0.coinId"
          control={control}
          render={({ field: { onChange: setCoinId, value: coinId } }) => (
            <Controller
              name="coins.0.condition"
              control={control}
              render={({ field: { onChange: setCondition, value: condition } }) => (
                <CoinConditionRow
                  coin={coinId}
                  setCoin={setCoinId}
                  condition={condition}
                  setCondition={setCondition}
                />
              )}
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
          render={({ field: { onChange: setPrice, value: price } }) => (
            <Controller
              name="currency"
              control={control}
              render={({ field: { onChange: setCurrency, value: currency } }) => (
                <PriceCurrencyRow
                  price={price}
                  setPrice={setPrice}
                  currency={currency}
                  setCurrency={setCurrency}
                />
              )}
            />
          )}
        />
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
