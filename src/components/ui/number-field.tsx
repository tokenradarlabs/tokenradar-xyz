import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface NumberFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    { name, label, placeholder, disabled, className, min, max, step },
    ref
  ) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              ref={ref}
              type='number'
              placeholder={placeholder}
              {...field}
              onChange={e => field.onChange(parseFloat(e.target.value))}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
