'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { SelectField } from '@/components/ui/select-field';
import { UrlField } from '@/components/ui/url-field';
import {
  coinListingAlertSchema,
  CoinListingAlertFormValues,
} from '@/lib/schemas/coinListingAlert';

import { useCoinAndExchangeData } from '@/lib/hooks/useCoinAndExchangeData';

const channels = [
  { label: 'Webhook', value: 'webhook' },
  { label: 'Discord Bot', value: 'discord' },
];

export default function CoinListingAlertForm() {
  const {
    coins,
    exchanges,
    isLoading: isLoadingData,
    error: dataError,
  } = useCoinAndExchangeData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CoinListingAlertFormValues>({
    resolver: zodResolver(coinListingAlertSchema),
    defaultValues: {
      channel: 'webhook',
      webhook: '',
      discordBot: '',
      coin: 'BTC',
      exchange: 'CoinGecko',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const { watch, handleSubmit } = form;
  const channel = watch('channel');

  const onSubmit = async (data: CoinListingAlertFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      // TODO: Implement actual API call to set Coin Listing alert
      form.reset();
    } catch (err: any) {
      setError(err.message || 'Failed to set Coin Listing alert.');
      console.error('Failed to set Coin Listing alert:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formDisabled = isSubmitting || isLoadingData;

  if (isLoadingData) {
    return (
      <div className='flex h-48 items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (dataError) {
    return (
      <p className='text-center text-red-500'>
        Error loading data: {dataError.message}
      </p>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <SelectField
          name='channel'
          label='Send me an'
          options={channels}
          disabled={formDisabled}
        />

        {channel === 'webhook' && (
          <UrlField
            name='webhook'
            label='Webhook URL'
            placeholder='https://webhook.site/...'
            disabled={formDisabled}
          />
        )}
        {channel === 'discord' && (
          <UrlField
            name='discordBot'
            label='Discord Bot Webhook URL'
            placeholder='https://discord.com/api/webhooks/...'
            disabled={formDisabled}
          />
        )}

        <SelectField
          name='coin'
          label='as soon as'
          options={coins.map(c => ({ label: c, value: c }))}
          disabled={formDisabled}
        />

        <SelectField
          name='exchange'
          label='gets listed on'
          options={exchanges.map(ex => ({ label: ex, value: ex }))}
          disabled={formDisabled}
        />

        <p className='mb-2 mt-6 text-center text-xs text-green-400'>
          ⚡ Last coin detected:{' '}
          <span className='font-mono text-green-300'>ALKIMI</span> listed on{' '}
          <span className='text-blue-400'>Gate.io</span> on{' '}
          <span className='text-green-200'>August 20 16:00</span>.
        </p>

        {error && (
          <p
            role='alert'
            aria-live='polite'
            className='text-center text-red-500'
          >
            {error}
          </p>
        )}
        <button
          type='submit'
          className='mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-blue-600'
          disabled={formDisabled}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Set Alert'}
        </button>
      </form>
    </FormProvider>
  );
}
