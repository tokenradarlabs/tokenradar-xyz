import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  id?: string;
  'aria-describedby'?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => (
    <input
      id={id}
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        error &&
          'border-destructive aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:ring-destructive/40',
        className
      )}
      ref={ref}
      aria-invalid={error}
      aria-describedby={ariaDescribedBy}
      {...props}
    />
  )
);

Input.displayName = 'Input';
