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

export function PriceAlertForm() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
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
          <span className="text-gray-300 min-w-[100px]">as soon as</span>
          <Select defaultValue="btc">
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
          <span className="text-gray-300 min-w-[100px]">goes</span>
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

        <div className="flex items-center gap-3">
          <span className="text-gray-300 min-w-[100px]">the price of</span>
          <div className="flex gap-3 flex-1">
            <Input 
              type="number" 
              placeholder="0.00"
              className="flex-1 h-10 bg-[#1a1f2e] border-[#2a3042] text-white placeholder:text-gray-500"
            />
            <Select defaultValue="usd">
              <SelectTrigger className="w-[120px] h-10 bg-[#1a1f2e] border-[#2a3042] text-white [&>*]:text-white">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f2e] border-[#2a3042]">
                <SelectItem value="usd" className="text-white">Dollars (USD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 flex items-center gap-2 mb-4">
        <span>⚡</span>
        <span>The price of <span className="text-green-400">BTC</span> is currently <span className="text-green-400">116,238.21 USD</span>.</span>
      </div>

      <Button 
        className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-2 rounded-md text-base font-medium h-auto"
      >
        SET ALERT
      </Button>
    </div>
  );
}