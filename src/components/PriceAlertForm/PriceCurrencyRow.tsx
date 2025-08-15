import React from "react";
import { DollarSign } from "lucide-react";
const currencies = ["USD", "EUR"];

export default function PriceCurrencyRow({
  price, setPrice, currency, setCurrency
}: {
  price: string; setPrice: (val: string) => void;
  currency: string; setCurrency: (val: string) => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Price</label>
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
          <DollarSign className="mr-2 text-blue-500" />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="0.00"
            className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
            min="0"
          />
        </div>
      </div>
      <div className="w-1/2">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Currency</label>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {currencies.map(cur => <option key={cur}>{cur}</option>)}
        </select>
      </div>
    </div>
  );
}
