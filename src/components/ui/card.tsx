import * as React from 'react';

import { cn } from '@/lib/utils';

interface CardProps extends React.ComponentProps<'div'> {
  isLoading?: boolean;
}

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

/**
 * Renders a card component with consistent spacing and padding.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card component.
 */
function Card({ className, isLoading = false, children, ...props }: CardProps) {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className='space-y-4'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Renders the header of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card header.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card header component.
 */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5',
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders the title of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card title.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card title component.
 */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}

/**
 * Renders the description of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card description.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card description component.
 */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * Renders an action section within a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card action.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card action component.
 */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders the content of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card content.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card content component.
 */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn(className)} {...props} />;
}

/**
 * Renders the footer of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card footer.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card footer component.
 */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('[.border-t]:pt-6 flex items-center', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
