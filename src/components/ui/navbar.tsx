"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";

const NAV_ITEMS = [
  { label: "Price", icon: <span className="mr-1">📈</span> },
  { label: "Percent", icon: <span className="mr-1">%</span> },
  { label: "Periodic", icon: <span className="mr-1">⏱️</span> },
  { label: "Volume", icon: <span className="mr-1">📊</span> },
];

export function Navbar() {
  const [active, setActive] = useState(0);

  return (
    <div className="sticky top-0 z-50">
      <nav className="w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-opacity-60">
        {/* Flex-col on mobile, row on md+ */}
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
    <div className='sticky top-0 z-50'>
      <nav className='w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-opacity-60'>
        <div className='mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-12'>
          {/* Left Logo / Name */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src='/logo.png'
                alt='TokenRadar Logo'
                width={28}
                height={28}
                className='rounded-full'
              />
              <span className='bg-gradient-to-r from-[#a78bfa] via-[#6ee7ff] to-white bg-clip-text text-lg font-bold text-transparent'>
                TokenRadar-xyz
              </span>
            </Link>
          </div>
          
          {/* Center Tab Bar */}
          <div className="flex-1 flex justify-center w-full md:w-auto order-3 md:order-none">
            <div className="flex flex-row flex-wrap gap-0 px-0 py-0 rounded-lg">
              {NAV_ITEMS.map((item, idx) => (
                <button
                  key={item.label}
                  onClick={() => setActive(idx)}
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
          <div className="flex items-center min-w-max mt-1 md:mt-0">
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

          {/* Right Login / Signup */}
          <div className='flex items-center gap-2'>
            <Link href='/login'>
              <Button
                variant='ghost'
                className='text-sm font-medium text-[#b3b8c5] hover:bg-white/10 hover:text-white'
              >
                Login
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-[#22d3ee] text-sm font-medium text-white hover:bg-[#0ea5e9]'>
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
