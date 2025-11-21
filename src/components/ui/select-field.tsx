import React from "react";

type Option = { label: string; value: string };

const selectClass = "w-full rounded-lg bg-[#23263c] py-2 px-3 text-gray-100 outline-none";
const labelClass = "block text-gray-300 mb-1 text-sm";

export function SelectField({ label, value, setValue, options }: {
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