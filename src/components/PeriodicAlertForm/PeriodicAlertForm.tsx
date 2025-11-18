"use client";
import React from "react";
import { useDebouncedCallback } from 'use-debounce';
import { PlugZap, Bot, DollarSign } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { sanitizeInput, isValidUrl, isWithinRange } from "../../utils/validation";

type Option = { label: string; value: string };

type Props = {
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
  currencies: Option[];
  exchanges: Option[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
};

const selectClass = "w-full rounded-lg bg-[#23263c] py-2 px-3 text-gray-100 outline-none";
const labelClass = "block text-gray-300 mb-1 text-sm";

// Generic, typed select
function SelectField({ label, value, setValue, options }: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: Option[];
}) {
  const debouncedSetValue = useDebouncedCallback(setValue, 300);
  return (
    <div className="w-full">
      <label className={labelClass}>{label}</label>
      <select value={value} onChange={e => debouncedSetValue(e.target.value)} className={selectClass}>
        {options.map(opt =>
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
    </div>
  );
}

// Typed, generic input
function InputField({ label, type, value, onChange, icon, placeholder, min, error, errorMessage }: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  min?: string | number;
  error?: boolean;
  errorMessage?: string;
}) {
  const debouncedOnChange = useDebouncedCallback(onChange, 300);
  return (
    <div className="w-full">
      <label className={labelClass}>{label}</label>
      <div className={`flex items-center rounded-lg bg-[#23263c] px-3 ${error ? 'border border-red-500' : ''}`}>
        {icon}
        <input
          type={type}
          value={value}
          onChange={e => debouncedOnChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          required
          className="w-full py-2 bg-transparent text-gray-100 outline-none"
        />
      </div>
      {error && errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}

const PeriodicAlertForm: React.FC<Props> = ({
  channel, setChannel, webhook, setWebhook, discordBot, setDiscordBot,
  coin, setCoin, condition, setCondition, price, setPrice,
  currency, setCurrency, exchange, setExchange,
  channels, coins, conditions, currencies, exchanges, onSubmit, isLoading, error,
}) => {
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [discordBotError, setDiscordBotError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const handleSetWebhook = (v: string) => {
    const sanitized = sanitizeInput(v);
    setWebhook(sanitized);
    if (!isValidUrl(sanitized)) {
      setWebhookError("Please enter a valid URL.");
    } else {
      setWebhookError(null);
    }
  };

  const handleSetDiscordBot = (v: string) => {
    const sanitized = sanitizeInput(v);
    setDiscordBot(sanitized);
    // No specific validation for Discord Bot Token format yet, just sanitization
    setDiscordBotError(null);
  };

  const handleSetPrice = (v: string) => {
    setPrice(v);
    const numValue = parseFloat(v);
    if (isNaN(numValue) || !isWithinRange(numValue, 0, 1_000_000_000)) {
      setPriceError("Price must be a number between 0 and 1 billion.");
    } else {
      setPriceError(null);
    }
  };

  const handleSubmitWithValidation = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger all validations manually before submission
    const isWebhookValid = webhook ? isValidUrl(webhook) : true; // Optional field
    const isDiscordBotValid = discordBot ? true : true; // No specific validation for token yet
    const isPriceValid = !isNaN(parseFloat(price)) && isWithinRange(parseFloat(price), 0, 1_000_000_000);

    if (!isWebhookValid) setWebhookError("Please enter a valid URL.");
    if (!isDiscordBotValid) setDiscordBotError("Please enter a valid Discord Bot Token."); // Placeholder error
    if (!isPriceValid) setPriceError("Price must be a number between 0 and 1 billion.");

    if (!isWebhookValid || !isDiscordBotValid || !isPriceValid) {
      return; // Stop submission if any validation fails
    }

    onSubmit(e); // Call the original onSubmit if all validations pass
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmitWithValidation}>
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
      <SelectField label="Currency" value={currency} setValue={setCurrency} options={currencies} />
    </div>
    <SelectField label="Exchange" value={exchange} setValue={setExchange} options={exchanges} />
    {error && <p className="text-red-500 text-center">{error}</p>}
    <button type="submit" className="w-full py-3 mt-3 rounded-lg font-bold text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:brightness-110 shadow transition flex items-center justify-center"
      disabled={isLoading}>
      {isLoading ? <Spinner /> : "Set Alert"}
    </button>
  </form>
);

export default PeriodicAlertForm;
