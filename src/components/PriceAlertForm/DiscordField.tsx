import React from "react";
import { Bot } from "lucide-react";

export default function DiscordField({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Discord Bot Token</label>
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
        <Bot className="mr-2 text-purple-600" />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste Discord Bot Token"
          className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
}
