import React from "react";
const coins = ["BTC", "ETH", "USDT"];
const conditions = ["above", "below"];

export default function CoinConditionRow({
  coin, setCoin, condition, setCondition
}: {
  coin: string; setCoin: (val: string) => void;
  condition: string; setCondition: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex-grow min-w-[150px]">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Coin</label>
        <select
          value={coin}
          onChange={e => setCoin(e.target.value)}
          className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {coins.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex-grow min-w-[150px]">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Condition</label>
        <select
          value={condition}
          onChange={e => setCondition(e.target.value)}
          className="w-full px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {conditions.map(cond => <option key={cond}>{cond.toUpperCase()}</option>)}
        </select>
      </div>
    </div>
  );
}
