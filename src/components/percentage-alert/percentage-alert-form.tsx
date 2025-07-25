"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

const CURRENT_PRICES = {
  btc: 116238.21,
  eth: 2250.75,
  "scout-protocol-token": 0.32800
};

const TIME_PERIODS = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "30m", label: "30 Minutes" },
  { value: "1h", label: "1 Hour" },
  { value: "4h", label: "4 Hours" },
  { value: "12h", label: "12 Hours" },
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
];

export function PercentageAlertForm() {
  const [percentageError, setPercentageError] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("btc");
  const [timePeriod, setTimePeriod] = useState<string>("24h");
  const [direction, setDirection] = useState<string>("up");
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPercentage(value);
    
    if (Number(value) < 0) {
      setPercentageError("Percentage cannot be negative");
    } else if (Number(value) > 100) {
      setPercentageError("Percentage cannot exceed 100");
    } else {
      setPercentageError("");
    }
  };

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
  };

  const handleSetAlert = () => {
    if (!percentageError && percentage) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative">
      {showSuccess && (
        <div className="absolute top-0 left-0 right-0 bg-green-500/10 text-green-500 p-4 rounded-lg text-center transform -translate-y-full mb-4">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Alert set successfully!</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-purple-500/10">
          <svg
            className="w-6 h-6 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-purple-500">Percentage Alert</h1>
      </div>
      
      <p className="text-gray-400 mb-8 text-center">
        Get notified when a token's price changes by a specific percentage within a time period.
      </p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-lg mb-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-300 min-w-[100px]">Send me an</span>
          <Select defaultValue="email">
            <SelectTrigger className="w-full h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
              <SelectValue placeholder="Select notification" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
              <SelectItem value="email" className="text-white">Email</SelectItem>
              <SelectItem value="telegram" className="text-white">Telegram</SelectItem>
              <SelectItem value="discord" className="text-white">Discord</SelectItem>
              <SelectItem value="slack" className="text-white">Slack</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-300 min-w-[100px]">when</span>
          <Select value={selectedToken} onValueChange={handleTokenChange}>
            <SelectTrigger className="w-full h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
              <SelectValue placeholder="Select coin" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
              <SelectItem value="btc" className="text-white">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/btc.svg" 
                    alt="BTC" 
                    width={16} 
                    height={16} 
                  />
                  BTC
                </div>
              </SelectItem>
              <SelectItem value="eth" className="text-white">ETH</SelectItem>
              <SelectItem value="scout-protocol-token" className="text-white">DEV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-300 min-w-[100px]">moves</span>
          <Select value={direction} onValueChange={setDirection}>
            <SelectTrigger className="w-full h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
              <SelectItem value="up" className="text-white">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Up
                </div>
              </SelectItem>
              <SelectItem value="down" className="text-white">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Down
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-300 min-w-[100px]">by</span>
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <Input 
                type="number"
                value={percentage}
                onChange={handlePercentageChange}
                placeholder="0.00"
                className={`h-10 bg-[#1a1f2e] border-[#2a3042] text-white placeholder:text-gray-500 w-full ${percentageError ? 'border-red-500' : ''}`}
              />
              {percentageError && (
                <p className="text-red-500 text-sm mt-1">{percentageError}</p>
              )}
            </div>
            <div className="w-[120px] h-10 bg-[#1a1f2e] border border-[#2a3042] rounded-md flex items-center justify-center text-white">
              <span>%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-300 min-w-[100px]">within</span>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-full h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
              {TIME_PERIODS.map(period => (
                <SelectItem key={period.value} value={period.value} className="text-white">
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-gray-400 flex items-center gap-2 mb-4">
        <span>⚡</span>
        <span>Alert will trigger if {selectedToken.toUpperCase()} moves {direction} by {percentage || '0'}% within {TIME_PERIODS.find(p => p.value === timePeriod)?.label.toLowerCase()}.</span>
      </div>

      <Button 
        onClick={handleSetAlert}
        disabled={!!percentageError || !percentage}
        className="bg-purple-500 hover:bg-purple-600 text-white px-12 py-2 rounded-md text-base font-medium h-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        SET ALERT
      </Button>
    </div>
  );
} 