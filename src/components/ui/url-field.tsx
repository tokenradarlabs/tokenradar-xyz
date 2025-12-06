import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { useState, useCallback } from 'react';
import { useToast } from '@/lib/contexts/toast-context';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface UrlFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const UrlField = React.forwardRef<HTMLInputElement, UrlFieldProps>(
  (
    { name, label, placeholder, disabled, className },
    ref
  ) => {
  const { control, getValues } = useFormContext();
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);

  const testWebhook = useCallback(async () => {
    const url = getValues(name);
    if (!url) {
      toast({
        title: 'Error',
        description: 'Please enter a URL to test.',
        variant: 'destructive',
      });
      return;
    }

    setIsTesting(true);
    try {
      const response = await fetch(url, {
        method: 'POST', // Using POST as a common method for webhook testing
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true, timestamp: new Date().toISOString() }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Webhook test successful! Status: ${response.status}`,
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: `Webhook test failed. Status: ${response.status} - ${response.statusText}`,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Webhook test failed: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  }, [name, toast, getValues]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>{label}</FormLabel>
          <div className="flex w-full items-end gap-2">
            <FormControl>
              <Input
                ref={ref}
                type='url'
                placeholder={placeholder}
                {...field}
                disabled={disabled || isTesting}
                className="flex-grow"
              />
            </FormControl>
            <Button
              type="button"
              onClick={testWebhook}
              disabled={!field.value || disabled || isTesting}
              className="shrink-0"
            >
              {isTesting ? 'Testing...' : 'Test Webhook'}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
