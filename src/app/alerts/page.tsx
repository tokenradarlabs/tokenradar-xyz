import { PriceAlertForm } from "@/components/price-alert/price-alert-form";

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a] flex items-center">
      <div className="w-full max-w-5xl mx-auto px-4">  
        <PriceAlertForm />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        <div className="bg-[#181c2a] border border-[#23273a] rounded-xl p-6 flex flex-col items-center text-center shadow-md">
          <div className="bg-pink-500/10 p-3 rounded-full mb-3">
            <svg className="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">1000+ Tokens Supported</h3>
          <p className="text-gray-400 text-sm">Track and set alerts for all major cryptocurrencies and tokens.</p>
        </div>
        <div className="bg-[#181c2a] border border-[#23273a] rounded-xl p-6 flex flex-col items-center text-center shadow-md">
          <div className="bg-blue-500/10 p-3 rounded-full mb-3">
            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Real-Time Price Tracking</h3>
          <p className="text-gray-400 text-sm">Get instant updates and never miss a market move.</p>
        </div>
        <div className="bg-[#181c2a] border border-[#23273a] rounded-xl p-6 flex flex-col items-center text-center shadow-md">
          <div className="bg-green-500/10 p-3 rounded-full mb-3">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">High-Precision Alerts</h3>
          <p className="text-gray-400 text-sm">Customizable notifications for your preferred price points.</p>
        </div>
      </div>
      </div>
    </div>
  );
}