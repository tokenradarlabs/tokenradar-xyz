'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { SelectField } from '@/components/ui/select-field';
import { UrlField } from '@/components/ui/url-field';
import { NumberField } from '@/components/ui/number-field';
import {
  percentageAlertSchema,
  PercentageAlertFormValues,
} from '@/lib/schemas/percentageAlert';
import { useCoinAndExchangeData } from '@/lib/hooks/useCoinAndExchangeData';

const channels = [
  { label: 'Webhook', value: 'webhook' },
  { label: 'Discord Bot', value: 'discord' },
];

const directions = [
  { label: 'rises', value: 'rises' },
  { label: 'drops', value: 'drops' },
];

const intervals = [
  { label: '1 hour', value: '1h' },
  { label: '24 hours', value: '24h' },
  { label: '7 days', value: '7d' },
];

export default function PercentAlertForm() {
  const {
    coins,
    exchanges,
    isLoading: isLoadingData,
    coinsError,
    exchangesError,
  } = useCoinAndExchangeData();
  const dataError = coinsError || exchangesError;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const form = useForm<PercentageAlertFormValues>({
    resolver: zodResolver(percentageAlertSchema),

    defaultValues: {
      channel: 'webhook',

      webhookUrl: '',

      discordWebhookUrl: '',

      coin: '',

      direction: 'rises',

      percentage: 0,

      interval: '24h',

      exchange: '',
    },

    mode: 'onChange',

    criteriaMode: 'all',
  });

  React.useEffect(() => {
    if (coins.length > 0 && form.getValues('coin') === '') {
      form.setValue('coin', coins[0]);
    }
  }, [coins, form]);

  React.useEffect(() => {
    if (exchanges.length > 0 && form.getValues('exchange') === '') {
      form.setValue('exchange', exchanges[0]);
    }
  }, [exchanges, form]);

  const { watch, handleSubmit } = form;

  const channel = watch('channel');

  const coin = watch('coin');

  const onSubmit = async (data: PercentageAlertFormValues) => {
    setIsSubmitting(true);

    setError(null);

    try {
      // Simulate API call

      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form submitted:', sanitizedData);

      // TODO: Implement actual API call to set Percentage alert

      form.reset();
    } catch (err: any) {
      setError(err.message || 'Failed to set Percentage alert.');

      console.error('Failed to set Percentage alert:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formDisabled = isSubmitting;

  if (isLoadingData) {
    return (
      <div className='flex h-48 items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (dataError) {
    const errorMessage =
      dataError?.message ??
      (typeof dataError === 'string' ? dataError : JSON.stringify(dataError)) ??
      'Unknown error';
    return (
      <p className='text-center text-red-500'>
        Error loading data: {errorMessage}
      </p>
    );
  }

  const coinLabel = coin || 'the selected coin';

  return (
    <FormProvider {...form}>
      <form className='space-y-7' onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          name='channel'
          label='Channel'
          options={channels}
          disabled={formDisabled}
        />

        {channel === 'webhook' && (
          <UrlField
            name='webhookUrl'
            label='Webhook URL'
            placeholder='https://webhook.site/...'
            disabled={formDisabled}
          />
        )}

        {channel === 'discord' && (
          <UrlField
            name='discordWebhookUrl'
            label='Discord Bot Webhook URL'
            placeholder='https://discord.com/api/webhooks/...'
            disabled={formDisabled}
          />
        )}

        <div className='grid grid-cols-2 gap-5'>
          <SelectField
            name='coin'
            label='Coin'
            options={coins.map(c => ({ label: c, value: c }))}
            disabled={formDisabled}
          />

          <SelectField
            name='direction'
            label='Direction'
            options={directions}
            disabled={formDisabled}
          />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <NumberField
            name='percentage'
            label='Percent (%)'
            placeholder='00'
            min={0}
            max={100}
            step={0.01}
            disabled={formDisabled}
          />

          <SelectField
            name='interval'
            label='Interval'
            options={intervals}
            disabled={formDisabled}
          />
        </div>

        <SelectField
          name='exchange'
          label='Exchange'
          options={exchanges.map(ex => ({ label: ex, value: ex }))}
          disabled={formDisabled}
        />

        {/* Price Note */}

        <div className='mt-3 text-sm text-gray-400'>
          ⚡ The price of {coinLabel} is currently{' '}
          <span className='font-bold text-green-400'>--</span>.
        </div>

        {error && <p className='text-center text-red-500'>{error}</p>}

        <button
          type='submit'
          className='mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-blue-600'
          disabled={formDisabled}
        >
          {isSubmitting ? <Spinner /> : 'Set Alert'}
        </button>
      </form>
    </FormProvider>
  );
}
