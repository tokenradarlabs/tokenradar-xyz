import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tokenradar-xyz",
  description: "Real-Time Crypto Market Intelligence",
  openGraph: {
    images: [
      {
        url:'https://raw.githubusercontent.com/tokenradarlabs/tokenradar-xyz/main/public/logo.png',
        width: 800,
        height: 600,
        alt: 'Tokenradar-xyz image alt',
        type: 'image/png',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-0 focus:left-0 focus:bg-white focus:text-black focus:p-3 focus:underline">Skip to main content</a>
        <header>
          <Navbar />
        </header>
        <main id="main-content">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
