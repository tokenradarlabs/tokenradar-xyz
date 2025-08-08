import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { NextSeo } from "next-seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<NextSeo
  title="Tokenradar-xyz"
  description="Real-Time Crypto Market Intelligence"
  openGraph={{
    images: [
      {
        url:'https://raw.githubusercontent.com/tokenradarlabs/tokenradar-xyz/main/public/logo.png',
        width: 800,
        height: 600,
        alt: 'Tokenradar-xyz image alt',
        type: 'logo.png',
      }
    ]
  }}
/>

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
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
