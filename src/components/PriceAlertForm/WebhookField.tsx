import React from "react";
import { PlugZap } from "lucide-react";

export default function WebhookField({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Webhook URL</label>
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
        <PlugZap className="mr-2 text-indigo-600" />
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://webhook.site/..."
          className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
          required
        />
      </div>
    </div>
  );
}
