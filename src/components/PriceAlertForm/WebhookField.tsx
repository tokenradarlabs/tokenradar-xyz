import React, { useState } from "react";
import { PlugZap } from "lucide-react";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export default function WebhookField({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (newValue && !isValidUrl(newValue)) {
      setError("Please enter a valid webhook URL.");
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
        Webhook URL <span className="text-sm text-gray-500 dark:text-gray-400">(e.g., Discord, Slack, Telegram)</span>
      </label>
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
        <PlugZap className="mr-2 text-indigo-600" />
        <input
          type="url"
          value={value}
          onChange={handleChange}
          placeholder="https://webhook.site/..."
          className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
