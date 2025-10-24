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

export function PriceAlertForm() {
  const [priceError, setPriceError] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("btc");
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
    
    if (Number(value) < 0) {
      setPriceError("Price cannot be negative");
    } else {
      setPriceError("");
    }
  };

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    setPrice(CURRENT_PRICES[value as keyof typeof CURRENT_PRICES].toString());
  };

  const handleSetAlert = () => {
    if (!priceError && price) {
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
        <div className="p-2.5 rounded-lg bg-pink-500/10">
          <svg
            className="w-6 h-6 text-pink-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 17L9 11L13 15L21 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-pink-500">Price Alert</h1>
      </div>
      
      <p className="text-gray-400 mb-8 text-center">
        Real-time price tracking with high-precision alerts for your crypto assets.
      </p>

      <div className="grid grid-cols-1 gap-6 w-full max-w-lg mb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <span className="text-gray-300 min-w-[100px] md:min-w-[120px] mb-2 md:mb-0">Send me an</span>
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

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <span className="text-gray-300 min-w-[100px] md:min-w-[120px] mb-2 md:mb-0">as soon as</span>
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

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <span className="text-gray-300 min-w-[100px] md:min-w-[120px] mb-2 md:mb-0">goes</span>
          <Select defaultValue="above">
            <SelectTrigger className="w-full h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
              <SelectItem value="above" className="text-white">above</SelectItem>
              <SelectItem value="below" className="text-white">below</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <span className="text-gray-300 min-w-[100px] md:min-w-[120px] mb-2 md:mb-0">the price of</span>
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <Input 
                type="number"
                value={price}
                onChange={handlePriceChange}
                placeholder="0.00"
                className={`h-10 bg-[#1a1f2e] border-[#2a3042] text-white placeholder:text-gray-500 w-full ${priceError ? 'border-red-500' : ''}`}
              />
              {priceError && (
                <p className="text-red-500 text-sm mt-1">{priceError}</p>
              )}
            </div>
            <Select defaultValue="usd">
              <SelectTrigger className="w-[120px] h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
                <SelectItem value="usd" className="text-white">$ (USD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 flex items-center gap-2 mb-4">
        <span>⚡</span>
        <span>The price of <span className="text-green-400">{selectedToken.toUpperCase()}</span> is currently <span className="text-green-400">{CURRENT_PRICES[selectedToken as keyof typeof CURRENT_PRICES].toLocaleString()} USD</span>.</span>
      </div>

      <Button 
        onClick={handleSetAlert}
        disabled={!!priceError || !price}
        className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-2 rounded-md text-base font-medium h-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        SET ALERT
      </Button>
    </div>
  );
}