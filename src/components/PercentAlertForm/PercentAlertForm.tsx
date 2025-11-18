"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { SelectField } from "@/components/ui/select-field";
import { UrlField } from "@/components/ui/url-field";
import { NumberField } from "@/components/ui/number-field";
import { percentageAlertSchema, PercentageAlertFormValues } from "@/lib/schemas/percentageAlert";
import { useCoinAndExchangeData } from "@/lib/hooks/useCoinAndExchangeData";

const channels = [
  { label: "Webhook", value: "webhook" },
  { label: "Discord Bot", value: "discord" },
];

const directions = [
  { label: "rises", value: "rises" },
  { label: "falls", value: "falls" },
];

const intervals = [
  { label: "24 hours", value: "24h" },
  { label: "1 hour", value: "1h" },
  { label: "30 minutes", value: "30m" },
  { label: "15 minutes", value: "15m" },
  { label: "5 minutes", value: "5m" },
  { label: "1 minute", value: "1m" },
];

export default function PercentAlertForm() {

  const { coins, exchanges, isLoading: isLoadingData, error: dataError } = useCoinAndExchangeData();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (coins.length > 0 && form.getValues("coin") === "") {
      form.setValue("coin", coins[0]);
    }
  }, [coins, form]);



  const form = useForm<PercentageAlertFormValues>({

    resolver: zodResolver(percentageAlertSchema),

    defaultValues: {

      channel: "webhook",

      webhookUrl: "",

      discordWebhookUrl: "",

      coin: "",

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

    setIsSubmitting(true);

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

      setIsSubmitting(false);

    }

  };



  const formDisabled = isSubmitting || isLoadingData;



  if (isLoadingData) {

    return <div className="flex justify-center items-center h-48"><Spinner /></div>;

  }



  if (dataError) {
    const errorMessage = dataError?.message ?? (typeof dataError === 'string' ? dataError : JSON.stringify(dataError)) ?? 'Unknown error';
    return <p className="text-red-500 text-center">Error loading data: {errorMessage}</p>;
  }



  return (

    <FormProvider {...form}>

      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>

        <SelectField

          name="channel"

          label="Channel"

          options={channels}

          disabled={formDisabled}

        />

        {channel === "webhook" && (

          <UrlField

            name="webhookUrl"

          label="Webhook URL"

            placeholder="https://webhook.site/..."

            disabled={formDisabled}

          />

        )}

        {channel === "discord" && (

          <UrlField

            name="discordWebhookUrl"

            label="Discord Bot Webhook URL"

            placeholder="https://discord.com/api/webhooks/..."

            disabled={formDisabled}

          />

        )}

        <div className="grid grid-cols-2 gap-5">

          <SelectField

            name="coin"

            label="Coin"

            options={coins.map(c => ({ label: c, value: c }))}

            disabled={formDisabled}

          />

          <SelectField

            name="direction"

            label="Direction"

            options={directions}

            disabled={formDisabled}

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

            disabled={formDisabled}

          />

          <SelectField

            name="interval"

            label="Interval"

            options={intervals}

            disabled={formDisabled}

          />

        </div>

        <SelectField

          name="exchange"

          label="Exchange"

          options={exchanges.map(ex => ({ label: ex, value: ex }))}

          disabled={formDisabled}

        />

        {/* Price Note */}

        <div className="text-sm mt-3 text-gray-400">

          ⚡ The price of {coin} is currently <span className="text-green-400 font-bold">--</span>.

        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button type="submit"

          className="w-full py-3 mt-6 bg-gradient-to-r from-pink-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center"

          disabled={formDisabled}>

          {isSubmitting ? <Spinner /> : "Set Alert"}

        </button>

      </form>

    </FormProvider>

  );

}
