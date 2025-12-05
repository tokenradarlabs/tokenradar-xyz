"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"; // Assuming these are existing UI components
import { Label } from "./label"; // Assuming this is an existing UI component

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string; // Emoji flag or path to an SVG
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
];

interface CurrencySelectorProps
  extends React.ComponentPropsWithoutRef<typeof SelectTrigger> {
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const CurrencySelector = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  CurrencySelectorProps
>(({ value, onValueChange, label, placeholder = "Select a currency", ...props }, ref) => {
  return (
    <div className="grid gap-1.5">
      {label && <Label>{label}</Label>}
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger ref={ref} className="w-[180px]" {...props}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <span className="mr-2">{currency.flag}</span>
              {currency.code} - {currency.name} ({currency.symbol})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

CurrencySelector.displayName = "CurrencySelector";

export { CurrencySelector };
