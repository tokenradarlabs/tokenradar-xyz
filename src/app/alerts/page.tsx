import { PriceAlertForm } from "@/components/price-alert/price-alert-form";

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a] flex items-center">
      <div className="w-full max-w-5xl mx-auto px-4">  
        <PriceAlertForm />
      </div>
    </div>
  );
}