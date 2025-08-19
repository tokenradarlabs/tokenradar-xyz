"use client";
import React from "react";
import { PlugZap, Bot, DollarSign } from "lucide-react";

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
  return (
    <div className="w-full">
      <label className={labelClass}>{label}</label>
      <select value={value} onChange={e => setValue(e.target.value)} className={selectClass}>
        {options.map(opt =>
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
    </div>
  );
}

// Typed, generic input
function InputField({ label, type, value, onChange, icon, placeholder, min }: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  min?: string | number;
}) {
  return (
    <div className="w-full">
      <label className={labelClass}>{label}</label>
      <div className="flex items-center rounded-lg bg-[#23263c] px-3">
        {icon}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          required
          className="w-full py-2 bg-transparent text-gray-100 outline-none"
        />
      </div>
    </div>
  );
}

const PeriodicAlertForm: React.FC<Props> = ({
  channel, setChannel, webhook, setWebhook, discordBot, setDiscordBot,
  coin, setCoin, condition, setCondition, price, setPrice,
  currency, setCurrency, exchange, setExchange,
  channels, coins, conditions, currencies, exchanges, onSubmit,
}) => (
  <form className="space-y-6" onSubmit={onSubmit}>
    <SelectField label="Channel" value={channel} setValue={setChannel} options={channels} />
    {channel === "webhook" && (
      <InputField
        label="Webhook URL"
        type="url"
        value={webhook}
        onChange={setWebhook}
        icon={<PlugZap className="mr-2 text-purple-400" size={18} />}
        placeholder="https://webhook.site/..."
      />
    )}
    {channel === "discord" && (
      <InputField
        label="Discord Bot Token"
        type="text"
        value={discordBot}
        onChange={setDiscordBot}
        icon={<Bot className="mr-2 text-purple-400" size={18} />}
        placeholder="Paste Discord Bot Token"
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
        onChange={setPrice}
        icon={<DollarSign className="mr-2 text-blue-300" size={16} />}
        placeholder="0.00"
        min="0"
      />
      <SelectField label="Currency" value={currency} setValue={setCurrency} options={currencies} />
    </div>
    <SelectField label="Exchange" value={exchange} setValue={setExchange} options={exchanges} />
    <button type="submit" className="w-full py-3 mt-3 rounded-lg font-bold text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:brightness-110 shadow transition">
      Set Alert
    </button>
  </form>
);

export default PeriodicAlertForm;
