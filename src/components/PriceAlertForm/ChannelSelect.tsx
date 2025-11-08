import React from "react";
import { PlugZap, Bot } from "lucide-react";

const channels = [
  { label: "Webhook", value: "webhook", icon: <PlugZap className="mr-1 text-indigo-600" size={20} /> },
  { label: "Discord Bot", value: "discord", icon: <Bot className="mr-1 text-purple-600" size={20} /> },
];

export default function ChannelSelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
        Channel <span className="text-sm text-gray-500 dark:text-gray-400">(Select where to receive alerts)</span>
      </label>
      {channels.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No channels available.</div>
      ) : (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {channels.map(ch => (
            <option key={ch.value} value={ch.value}>{ch.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}
