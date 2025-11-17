"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StepIndicator from '../ui/step-indicator';
import { zodResolver } from "@hookform/resolvers/zod";
import { priceAlertSchema, PriceAlertFormValues } from "../../lib/schemas/priceAlert";
import { SelectField } from "../ui/select-field";
import { UrlField } from "../ui/url-field";
import { NumberField } from "../ui/number-field";
import { Spinner } from "../ui/spinner";
import { useToast } from "@/lib/contexts/toast-context";

export default function PriceAlertForm() {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Channel', 'Details', 'Review'];
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    trigger,
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
      <div className="mb-8">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {currentStep === 0 && (
          <>
            <SelectField
              name="channel"
              label="Channel"
              placeholder="Select where to receive alerts"
              options={[
                { label: "Webhook", value: "webhook" },
                { label: "Discord Bot", value: "discord" },
              ]}
              control={control}
            />
            {channel === "webhook" && (
              <UrlField
                name="webhookUrl"
                label="Webhook URL"
                placeholder="Enter your webhook URL"
                control={control}
              />
            )}
            {channel === "discord" && (
              <UrlField
                name="discordWebhookUrl"
                label="Discord Webhook URL"
                placeholder="Enter your Discord webhook URL"
                control={control}
              />
            )}
          </>
        )}

        {currentStep === 1 && (
          <>
            <SelectField
              name="coins.0.coinId"
              label="Coin"
              placeholder="Select a coin"
              options={[
                { label: "Bitcoin", value: "bitcoin" },
                { label: "Ethereum", value: "ethereum" },
                { label: "Ripple", value: "ripple" },
              ]} // Placeholder options
              control={control}
            />
            <SelectField
              name="coins.0.condition"
              label="Condition"
              placeholder="Select a condition"
              options={[
                { label: "Above", value: "above" },
                { label: "Below", value: "below" },
              ]}
              control={control}
            />
            <NumberField
              name="threshold"
              label="Threshold"
              placeholder="Enter threshold price"
              step={0.01}
              control={control}
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
              control={control}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <SelectField
              name="exchange"
              label="Exchange"
              options={[
                { label: "CoinGecko", value: "CoinGecko" },
                { label: "Uniswap", value: "Uniswap" },
              ]}
              control={control}
            />
            <div className="mt-5 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">Review Your Alert</h3>
              <p><strong>Channel:</strong> {watch("channel")}</p>
              {watch("channel") === "webhook" && <p><strong>Webhook URL:</strong> {watch("webhookUrl")}</p>}
              {watch("channel") === "discord" && <p><strong>Discord Webhook URL:</strong> {watch("discordWebhookUrl")}</p>}
              <p><strong>Coin:</strong> {watch("coins.0.coinId")}</p>
              <p><strong>Condition:</strong> {watch("coins.0.condition")}</p>
              <p><strong>Threshold:</strong> {watch("threshold")} {watch("currency")}</p>
              <p><strong>Exchange:</strong> {watch("exchange")}</p>
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
            >
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 && (
            <button
              type="button"
              onClick={async () => {
                let isValid = false;
                if (currentStep === 0) {
                  isValid = await trigger(["channel", channel === "webhook" ? "webhookUrl" : "discordWebhookUrl"]);
                } else if (currentStep === 1) {
                  isValid = await trigger(["coins.0.coinId", "coins.0.condition", "threshold", "currency"]);
                }

                if (isValid) {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
              className="ml-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all duration-200"
            >
              Next
            </button>
          )}

          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="ml-auto w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Set Alert"}
            </button>
          )}
        </div>
      </form>
      </form>
    </div>
  );
}
