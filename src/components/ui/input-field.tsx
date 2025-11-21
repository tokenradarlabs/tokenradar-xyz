import React from "react";
import { useDebouncedCallback } from 'use-debounce';

const labelClass = "block text-gray-300 mb-1 text-sm";

export function InputField({ label, type, value, onChange, icon, placeholder, min, error, errorMessage }: {
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
