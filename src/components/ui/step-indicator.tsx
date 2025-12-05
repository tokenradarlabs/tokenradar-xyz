import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);


  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (index < steps.length - 1) {
        stepRefs.current[index + 1]?.focus();
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (index > 0) {
        stepRefs.current[index - 1]?.focus();
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onStepClick(index);
    }
  };

  return (
    <div
      className='flex w-full items-center justify-between'
      role='tablist'
      aria-label='Form Steps'
    >
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            ref={el => (stepRefs.current[index] = el)}
            className={cn(
              'flex cursor-pointer flex-col items-center outline-none',
              index === currentStep && 'rounded-md ring-2 ring-blue-500 ring-offset-2' // Visual focus indicator
            )}
            onClick={() => onStepClick(index)}
            onKeyDown={e => handleKeyDown(e, index)}
            tabIndex={index === currentStep ? 0 : -1}
            role='tab'
            aria-selected={index === currentStep}
            aria-controls={`panel-step-${index}`}
            id={`tab-step-${index}`}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              )}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span
              className={cn(
                'mt-2 text-xs',
                index === currentStep
                  ? 'text-primary font-medium'
                  : 'text-gray-500'
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'mx-2 h-0.5 flex-1',
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
