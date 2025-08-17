import React from "react";
const exchanges = ["CoinGecko", "Uniswap"];

export default function ExchangeSelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 dark:text-gray-300">Exchange</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {exchanges.map(ex => <option key={ex}>{ex}</option>)}
      </select>
    </div>
  );
}
