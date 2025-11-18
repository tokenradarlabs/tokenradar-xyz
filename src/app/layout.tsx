import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/ui/navbar";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/lib/contexts/toast-context";
import ReactQueryProvider from "@/components/ReactQueryProvider";



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
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
                  <ToastProvider>
                    <ReactQueryProvider>
                        <ThemeProvider
                          attribute="class"
                          defaultTheme="system"
                          enableSystem
                          disableTransitionOnChange
                        >
                          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-0 focus:left-0 focus:bg-white focus:text-black focus:p-3 focus:underline">Skip to main content</a>
                          <header>
                            <Navbar />
                          </header>
                          <main id="main-content">{children}</main>
                          <Footer/>
                        </ThemeProvider>
                    </ReactQueryProvider>
                  </ToastProvider>      </body>
    </html>
  );
}
