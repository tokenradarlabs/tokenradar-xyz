import React from 'react';

interface FormSkeletonProps {
  currentStep: number;
}

const SkeletonPlaceholder = ({ width = 'full', height = '10', className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md w-${width} h-${height} ${className}`}></div>
);

export const FormSkeleton: React.FC<FormSkeletonProps> = ({ currentStep }) => {
  return (
    <div className='space-y-5'>
      {currentStep === 0 && (
        <>
          <SkeletonPlaceholder height='10' /> {/* Channel SelectField */}
          <SkeletonPlaceholder height='10' /> {/* Webhook/Discord URL Field */}
        </>
      )}

      {currentStep === 1 && (
        <>
          <SkeletonPlaceholder height='10' /> {/* Coin SelectField */}
          <SkeletonPlaceholder height='10' /> {/* Threshold NumberField */}
          <SkeletonPlaceholder height='10' /> {/* Currency SelectField */}
        </>
      )}

      {currentStep === 2 && (
        <>
          <SkeletonPlaceholder height='10' /> {/* Exchange SelectField */}
          <div className='mt-5 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800'>
            <SkeletonPlaceholder width='3/4' height='6' className='mb-2' /> {/* Review Your Alert title */}
            <SkeletonPlaceholder width='full' height='4' className='mb-1' />
            <SkeletonPlaceholder width='full' height='4' className='mb-1' />
            <SkeletonPlaceholder width='full' height='4' className='mb-1' />
            <SkeletonPlaceholder width='full' height='4' className='mb-1' />
            <SkeletonPlaceholder width='full' height='4' className='mb-1' />
            <SkeletonPlaceholder width='full' height='4' className='mb-1' />
          </div>
        </>
      )}
    </div>
  );
};
