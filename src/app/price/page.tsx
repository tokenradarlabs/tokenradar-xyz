import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import PriceAlertForm from "@/components/PriceAlertForm/PriceAlertForm";
import { useState, useEffect } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <Card isLoading={loading} className="w-full max-w-md">
        <PriceAlertForm />
      </Card>
    </div>
  );
}
