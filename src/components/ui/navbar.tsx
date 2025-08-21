"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";


const NAV_ITEMS = [
  { label: "Price", icon: <span className="mr-1">📈</span>, path: "/price" },
  { label: "Percentage", icon: <span className="mr-1">%</span>, path: "/priceAlert/percentage" },
  { label: "Periodic", icon: <span className="mr-1">⏱️</span>, path: "/priceAlert/periodic" },
  { label: "MarketCap", icon: <span className="mr-1">🏷️</span>, path: "/marketCap" },
  { label: "Volume", icon: <span className="mr-1">📊</span>, path: "/volume" },
  { label: "Coin Listing", icon: <span className="mr-1">🪙</span>, path: "/priceAlert/coin-listing" },
];

export function Navbar() {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const handleTabClick = (idx: number, path: string) => {
    setActive(idx);
    router.push(path);
  };

return (
    <div className="sticky top-0 z-50">
      <nav className="w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-opacity-60">
        <div className="
          flex flex-col md:flex-row
          h-auto md:h-16
          items-center
          px-3 sm:px-6 md:px-12 lg:px-20
          mx-auto max-w-7xl
          gap-y-2
        ">
          {/* Logo Section */}
          <div className="flex items-center min-w-max mb-1 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="TokenRadar Logo" width={28} height={28} className="rounded-full" />
              <span className="font-bold text-lg bg-gradient-to-r from-[#a78bfa] via-[#6ee7ff] to-white bg-clip-text text-transparent">
                TokenRadar-xyz
              </span>
            </Link>
          </div>
          
          {/* Center Tab Bar - navigation */}
          <div className="flex-1 flex justify-center w-full md:w-auto mb-1 md:mb-0">
            <div className="flex flex-row flex-wrap gap-0 px-0 py-0 rounded-lg">
              {NAV_ITEMS.map((item, idx) => (
                <button
                  key={item.label}
                  onClick={() => handleTabClick(idx, item.path)}
                  className={`flex items-center px-3 md:px-4 py-2 rounded-md font-medium focus:outline-none transition
                    ${active === idx
                      ? "bg-[#313440] text-white shadow"
                      : "text-[#b2b7be] hover:text-white hover:bg-[#313440]"}
                    `}
                  style={{ fontWeight: active === idx ? 600 : 400, fontSize: "0.95rem" }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Login/Signup Section */}
          <div className="flex items-center min-w-max">
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-medium text-[#b3b8c5] hover:text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm font-medium bg-[#22d3ee] hover:bg-[#0ea5e9] text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}