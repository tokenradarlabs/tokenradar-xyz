import * as React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  value?: number;
  max?: number;
}

const Spinner = ({ className, value, max = 100, ...props }: SpinnerProps) => {
  const isDeterminate = value != null;
  const safeMax = max > 0 ? max : 1;
  const safeValue = Math.min(Math.max(Number(value ?? 0), 0), safeMax);
  const ariaValueText = isDeterminate ? `${Math.round((safeValue / safeMax) * 100)}%` : undefined;

  return (
    <svg
      className={cn('h-4 w-4 animate-spin', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-label={isDeterminate ? 'Loading progress' : 'Loading'}
      role='progressbar'
      aria-valuemin={isDeterminate ? 0 : undefined}
      aria-valuenow={isDeterminate ? safeValue : undefined}
      aria-valuemax={isDeterminate ? safeMax : undefined}
      aria-valuetext={ariaValueText}
      {...props}
    >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
  );
};

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const VisuallyHidden = ({ children, ...props }: VisuallyHiddenProps) => (
  <span
    style={{
      position: 'absolute',
      width: '1px',
      height: '1px',
      margin: '-1px',
      padding: '0',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    }}
    {...props}
  >
    {children}
  </span>
);

export { Spinner, VisuallyHidden };
