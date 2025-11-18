"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center font-sans px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex items-center gap-2">
          <div className="rounded-full p-2">
            <Image src="/logo.png" alt="TokenRadar Labs Logo" width={40} height={40} />
          </div>
          <span className="text-xl font-semibold text-[#6ee7ff]">TokenRadar Labs</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight">
          <span className="bg-gradient-to-r from-[#a78bfa] via-[#6ee7ff] to-white bg-clip-text text-transparent">Real-Time</span> Crypto<br />Market Intelligence
        </h1>
        <p className="text-lg text-[#b3b8c5] text-center max-w-xl mt-2">
          TokenRadar delivers real-time token price tracking and market insights for your crypto community.<br />Stay ahead with instant alerts and comprehensive market data.
        </p>
        <div className="flex gap-4 mt-6 flex-col sm:flex-row relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#22d3ee] hover:bg-[#0ea5e9] text-white font-semibold px-6 py-3 rounded-lg shadow transition-all flex items-center gap-2 justify-center focus:outline-none">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M3 17l6-6 4 4 8-8"/></svg>
                Start Tracking
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-[#10172a] border-slate-700">
              <DropdownMenuItem asChild>
                <Link href="/price" className="px-4 py-2 hover:bg-[#a78bfa]/20 text-white flex items-center gap-2 rounded-t-lg transition-colors cursor-pointer">
                  <Image src="/dollar.svg" alt="Dollar icon" width={18} height={18} />
                  Price Alerts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/percentageAlerts" className="px-4 py-2 hover:bg-[#6ee7ff]/20 text-white flex items-center gap-2 rounded-b-lg transition-colors cursor-pointer">
                  <Image src="/percent.svg" alt="Percent icon" width={18} height={18} />
                  Percentage Alerts
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/10 flex items-center gap-2 justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#fff" strokeWidth="2"/><path stroke="#fff" strokeWidth="2" d="M4 10h16"/></svg>
            View Features
          </button>
        </div>
      </div>
      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
        <div className="bg-white/5 rounded-xl p-8 flex flex-col items-center text-center shadow">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-3 animate-bounce"><path d="M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="#3b82f6" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
          <h3 className="text-lg font-semibold text-white mb-1">Live Alerts</h3>
          <p className="text-[#b3b8c5] text-sm">Real-time price alerts and market notifications</p>
        </div>
        <div className="bg-white/5 rounded-xl p-8 flex flex-col items-center text-center shadow">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-3 animate-bounce"><path d="M3 17l6-6 4 4 8-8" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="text-lg font-semibold text-white mb-1">Market Insights</h3>
          <p className="text-[#b3b8c5] text-sm">Comprehensive market analysis and trends</p>
        </div>
        <div className="bg-white/5 rounded-xl p-8 flex flex-col items-center text-center shadow">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-3 animate-bounce"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" stroke="#a78bfa" strokeWidth="2"/></svg>
          <h3 className="text-lg font-semibold text-white mb-1">Community Tools</h3>
          <p className="text-[#b3b8c5] text-sm">Discord bots and community integrations</p>
        </div>
      </div>
    </div>
  );
}