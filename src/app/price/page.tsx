'use client';
import { Card } from '@/components/ui/card';
import PriceAlertForm from '@/components/PriceAlertForm/PriceAlertForm';

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-violet-50 p-8 dark:from-gray-900 dark:to-indigo-900'>
      <Card className='w-full max-w-md'>
        <PriceAlertForm />
      </Card>
    </div>
  );
}
