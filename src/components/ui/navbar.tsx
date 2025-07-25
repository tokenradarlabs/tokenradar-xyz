import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";

export function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <nav className="w-full border-b border-white/10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur supports-[backdrop-filter]:bg-opacity-60">
        <div className="flex h-14 items-center px-20 mx-auto max-w-7xl">
          <div className="flex">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="TokenRadar Logo" width={28} height={28} className="rounded-full" />
              <span className="font-bold text-lg bg-gradient-to-r from-[#a78bfa] via-[#6ee7ff] to-white bg-clip-text text-transparent">
                TokenRadar-xyz
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end">
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