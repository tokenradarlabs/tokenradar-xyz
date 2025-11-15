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

interface UrlFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const UrlField: React.FC<UrlFieldProps> = ({
  name,
  label,
  placeholder,
  disabled,
  className,
}) => {
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
              type="url"
              placeholder={placeholder}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
