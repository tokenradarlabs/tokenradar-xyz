import Image from "next/image";
import Link from "next/link";

export function AuthSide() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center h-full bg-gray-900 text-white p-8">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image src="/logo.png" alt="TokenRadar.xyz" width={40} height={40} />
        <h1 className="text-2xl font-bold">TokenRadar.xyz</h1>
      </Link>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to TokenRadar.xyz
        </h2>
        <p className="text-gray-300">
          Your one-stop solution for tracking cryptocurrency prices and
          setting up alerts.
        </p>
      </div>
    </div>
  );
}
