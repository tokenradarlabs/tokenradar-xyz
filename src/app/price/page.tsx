'use client';
import { Card } from "@/components/ui/card";
import PriceAlertForm from "@/components/PriceAlertForm/PriceAlertForm";

export default function Page() {  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 dark:from-gray-900 dark:to-indigo-900 p-8">
      <Card className="w-full max-w-md">
        <PriceAlertForm />
      </Card>
    </div>
  );
}
