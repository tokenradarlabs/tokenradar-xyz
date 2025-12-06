import React, { useState } from "react";
import { PlugZap, Bot, DollarSign } from "lucide-react";

import { InputField } from "@/components/ui/input-field";

import { SelectField } from "@/components/ui/select-field";
import { CurrencySelector } from "@/components/ui/currency-selector";
import { isValidUrl, isWithinRange } from "@/lib/utils/validation";

type Option = { label: string; value: string };

type SchedulePickerProps = {
  channel: string; setChannel: (v: string) => void;
  webhook: string; setWebhook: (v: string) => void;
  discordBot: string; setDiscordBot: (v: string) => void;
  coin: string; setCoin: (v: string) => void;
  condition: string; setCondition: (v: string) => void;
  price: string; setPrice: (v: string) => void;
  currency: string; setCurrency: (v: string) => void;
  exchange: string; setExchange: (v: string) => void;
  channels: Option[];
  coins: Option[];
  conditions: Option[];
  exchanges: Option[];
  webhookError: string | null; setWebhookError: (v: string | null) => void;
  discordBotError: string | null; setDiscordBotError: (v: string | null) => void;
  priceError: string | null; setPriceError: (v: string | null) => void;
};

export const SchedulePicker: React.FC<SchedulePickerProps> = ({
  channel, setChannel, webhook, setWebhook, discordBot, setDiscordBot,
  coin, setCoin, condition, setCondition, price, setPrice,
  currency, setCurrency, exchange, setExchange,
  channels, coins, conditions, exchanges,
  webhookError, setWebhookError, discordBotError, setDiscordBotError, priceError, setPriceError,
}) => {

  const handleSetWebhook = (v: string) => {
    setWebhook(v);
    if (!isValidUrl(v)) {
      setWebhookError("Please enter a valid URL.");
    } else {
      setWebhookError(null);
    }
  };

  const handleSetDiscordBot = (v: string) => {
    setDiscordBot(v);
    // No specific validation for Discord Bot Token format yet, just sanitization
    setDiscordBotError(null);
  };

  const handleSetPrice = (v: string) => {
    setPrice(v);
    const numValue = parseFloat(v);
    if (isNaN(numValue) || !isWithinRange(isNaN(numValue) ? undefined : numValue, 0, 1_000_000_000)) {
      setPriceError("Price must be a number between 0 and 1 billion.");
    } else {
      setPriceError(null);
    }
  };

  return (
    <div className="space-y-6">
      <SelectField label="Channel" value={channel} setValue={setChannel} options={channels} />
      {channel === "webhook" && (
        <InputField
          label="Webhook URL"
          type="url"
          value={webhook}
          onChange={handleSetWebhook}
          icon={<PlugZap className="mr-2 text-purple-400" size={18} />}
          placeholder="https://webhook.site/..."
          error={!!webhookError}
          errorMessage={webhookError || undefined}
        />
      )}
      {channel === "discord" && (
        <InputField
          label="Discord Bot Token"
          type="text"
          value={discordBot}
          onChange={handleSetDiscordBot}
          icon={<Bot className="mr-2 text-purple-400" size={18} />}
          placeholder="Paste Discord Bot Token"
          error={!!discordBotError}
          errorMessage={discordBotError || undefined}
        />
      )}
      <div className="flex gap-4">
        <SelectField label="Coin" value={coin} setValue={setCoin} options={coins} />
        <SelectField label="Condition" value={condition} setValue={setCondition} options={conditions} />
      </div>
      <div className="flex gap-4">
        <InputField
          label="Price"
          type="number"
          value={price}
          onChange={handleSetPrice}
          icon={<DollarSign className="mr-2 text-blue-300" size={16} />}
          placeholder="0.00"
          min="0"
          error={!!priceError}
          errorMessage={priceError || undefined}
        />
        <CurrencySelector value={currency} onValueChange={setCurrency} />
      </div>
      <SelectField label="Exchange" value={exchange} setValue={setExchange} options={exchanges} />
    </div>
  );
};
