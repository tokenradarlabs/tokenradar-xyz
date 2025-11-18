import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

import { Spinner } from './spinner';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  const spinner = loading && (
    <Spinner
      className={cn(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        size === 'sm' && 'size-3',
        size === 'lg' && 'size-5',
        (size === 'icon' || size === 'default') && 'size-4'
      )}
      aria-hidden='true'
    />
  );

  if (asChild) {
    if (!React.isValidElement(children)) {
      return (
        <span
          data-slot='button'
          className={cn(
            buttonVariants({ variant, size, className }),
            'relative',
            (isDisabled || loading) && 'pointer-events-none'
          )}
          aria-disabled={isDisabled}
          aria-busy={loading}
          {...props}
        >
          <span className={cn(loading && 'opacity-0')}>{children}</span>
          {spinner}
        </span>
      );
    }

    const child = React.Children.only(children);
    const childProps = child.props as React.ComponentPropsWithoutRef<'button'> &
      React.ComponentPropsWithoutRef<'a'>;

    const newProps: React.HTMLAttributes<HTMLElement> &
      Record<string, unknown> = {
      ...props,
      className: cn(
        buttonVariants({ variant, size, className }),
        childProps.className,
        'relative',
        (isDisabled || loading) && 'pointer-events-none'
      ),
      'aria-disabled': isDisabled || undefined,
      'aria-busy': loading || undefined,
    };

    if (isDisabled) {
      newProps.tabIndex = -1;
      newProps.onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };
      if (child.type === 'a') {
        newProps.href = undefined;
      }
    }

    return React.cloneElement(
      child,
      newProps,
      <>
        <span className={cn(loading && 'opacity-0')}>
          {childProps.children}
        </span>
        {spinner}
      </>
    );
  }

  return (
    <button
      data-slot='button'
      type={(props as React.ComponentProps<'button'>).type ?? 'button'}
      className={cn(
        buttonVariants({ variant, size, className }),
        'relative',
        (isDisabled || loading) && 'pointer-events-none'
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      <span className={cn(loading && 'opacity-0')}>{children}</span>
      {spinner}
    </button>
  );
}

export { Button, buttonVariants };
