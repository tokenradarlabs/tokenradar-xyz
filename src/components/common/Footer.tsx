'use client';

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-transparent dark:to-transparent dark:bg-black text-slate-800 dark:text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 border-2 border-white rounded-full relative">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="font-display font-bold text-2xl gradient-text">TokenRadar Labs</div>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-300 max-w-xs">
              Real-time token price tracking and market insights for your crypto community. 
              Empowering blockchain communities with cutting-edge web3 tools.
            </p>
          </div>

          {/* Features Column */}
          <nav className="space-y-4" aria-labelledby="features-heading">
            <h3 id="features-heading" className="font-medium text-lg text-slate-900 dark:text-white">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features/discord-bot" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Discord Bot
                </Link>
              </li>
              <li>
                <Link href="/features/price-tracking" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Price Tracking
                </Link>
              </li>
              <li>
                <Link href="/features/smart-alerts" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Smart Alerts
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav className="space-y-4" aria-labelledby="company-heading">
            <h3 id="company-heading" className="font-medium text-lg text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect Column */}
          <nav className="space-y-4" aria-labelledby="connect-heading">
            <h3 id="connect-heading" className="font-medium text-lg text-slate-900 dark:text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://discord.gg/tokenradar" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm" target="_blank" rel="noopener noreferrer" title="Join our Discord community">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/tokenradarlabs" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://github.com/tokenradarlabs" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm" target="_blank" rel="noopener noreferrer" title="Check out our GitHub">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://t.me/tokenradar" className="text-slate-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 text-sm" target="_blank" rel="noopener noreferrer" title="Join us on Telegram">
                  Telegram
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="relative mt-10 mb-8 overflow-hidden">
          <div className="flex justify-center">
            <div className="grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div 
                      key={j} 
                      className={`w-4 h-4 rounded-full bg-gradient-to-r 
                      ${(i+j) % 3 === 0 ? 'from-blue-400 to-cyan-300' : (i+j) % 3 === 1 ? 'from-indigo-500 to-purple-400' : 'from-blue-600 to-cyan-500'} 
                      opacity-${50 + ((i+j) % 5) * 10} animate-pulse`} 
                      style={{animationDelay: `${(i*0.1) + (j*0.2)}s`}}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 -bottom-4 h-12 bg-gradient-to-t from-slate-50 to-transparent dark:from-black dark:to-transparent"></div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-gray-800 text-center text-sm text-slate-500 dark:text-gray-400">
          <div className="flex flex-col items-center justify-center space-y-4">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-slate-100 dark:bg-gray-700 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
            <p>
              © {new Date().getFullYear()} TokenRadar Labs. All rights reserved. Forging next-generation open-source web3 tools.
            </p>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "TokenRadar Labs",
              "url": "https://tokenradar.xyz",
              "logo": "https://tokenradar.xyz/logo.png",
              "sameAs": [
                "https://twitter.com/tokenradarlabs",
                "https://github.com/tokenradarlabs",
                "https://discord.gg/tokenradar",
                "https://t.me/tokenradar"
              ]
            })
          }}
        />
      </div>
    </footer>
  );
} 