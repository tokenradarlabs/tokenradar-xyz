import { PriceAlertForm } from '@/components/price-alert/price-alert-form';

export default function AlertsPage() {
  return (
    <div className='flex min-h-screen items-center bg-gradient-to-b from-[#0a0e1a] via-[#111827] to-[#0a0e1a]'>
      <div className='mx-auto w-full max-w-5xl px-4'>
        <PriceAlertForm />
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='flex flex-col items-center rounded-xl border border-[#23273a] bg-[#181c2a] p-6 text-center shadow-md'>
            <div className='mb-3 rounded-full bg-pink-500/10 p-3'>
              <svg
                className='h-7 w-7 text-pink-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M12 2v20M2 12h20'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='mb-1 text-lg font-semibold text-white'>
              1000+ Tokens Supported
            </h3>
            <p className='text-sm text-gray-400'>
              Track and set alerts for all major cryptocurrencies and tokens.
            </p>
          </div>
          <div className='flex flex-col items-center rounded-xl border border-[#23273a] bg-[#181c2a] p-6 text-center shadow-md'>
            <div className='mb-3 rounded-full bg-blue-500/10 p-3'>
              <svg
                className='h-7 w-7 text-blue-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <circle
                  cx='12'
                  cy='12'
                  r='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 6v6l4 2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='mb-1 text-lg font-semibold text-white'>
              Real-Time Price Tracking
            </h3>
            <p className='text-sm text-gray-400'>
              Get instant updates and never miss a market move.
            </p>
          </div>
          <div className='flex flex-col items-center rounded-xl border border-[#23273a] bg-[#181c2a] p-6 text-center shadow-md'>
            <div className='mb-3 rounded-full bg-green-500/10 p-3'>
              <svg
                className='h-7 w-7 text-green-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  d='M5 13l4 4L19 7'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='mb-1 text-lg font-semibold text-white'>
              High-Precision Alerts
            </h3>
            <p className='text-sm text-gray-400'>
              Customizable notifications for your preferred price points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
