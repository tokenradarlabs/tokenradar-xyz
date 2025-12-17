'use client';
import React, { useState } from 'react';
import { PlugZap, Bot } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/lib/contexts/toast-context';
import { useFormHandler } from '@/lib/hooks/useFormHandler';
import { useFormValidation } from '@/lib/hooks/useFormValidation';
import { useFormSubmission } from '@/lib/hooks/useFormSubmission';
import {
  volumeAlertSchema,
  VolumeAlertFormValues,
} from '@/lib/schemas/volumeAlert';

const selectClass =
  'w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-700 transition outline-none';

const labelClass = 'block font-medium text-gray-300 mb-1 text-sm';

interface VolumeAlertFormProps {
  channels?: { label: string; value: string }[];
  coins?: string[];
  exchanges?: string[];
  multipliers?: string[];
  intervals?: string[];
}

const VolumeAlertForm: React.FC<VolumeAlertFormProps> = ({
  channels: propChannels,
  coins: propCoins,
  exchanges: propExchanges,
  multipliers: propMultipliers,
  intervals: propIntervals,
}) => {
  const { showToast } = useToast();

  // Default values for props
  const defaultChannels = [
    { label: 'Webhook', value: 'webhook' },
    { label: 'Discord', value: 'discord' },
  ];
  const defaultCoins = ['BTC', 'ETH', 'XRP'];
  const defaultExchanges = ['Binance', 'Coinbase', 'Kraken'];
  const defaultMultipliers = ['0', '0.5', '1', '2', '5', '10'];
  const defaultIntervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

  const channels = propChannels || defaultChannels;
  const coins = propCoins || defaultCoins;
  const exchanges = propExchanges || defaultExchanges;
  const multipliers = propMultipliers || defaultMultipliers;
  const intervals = propIntervals || defaultIntervals;

  const onSubmit = async (values: VolumeAlertFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      // TODO: Implement actual API call to set Volume alert
      const result = { ok: true, message: 'Volume alert set successfully!' };

      if (!result.ok) {
        showToast(result.message || 'Failed to set volume alert.', 'error');
        return;
      }
      showToast('Volume alert set successfully!', 'success');
      form.reset();
    } catch (err: any) {
      showToast(err.message || 'Failed to set volume alert.', 'error');
      console.error('Failed to set volume alert:', err);
    }
  };

  const {
    form,
    handleSubmit,
    isSubmitting,
  } = useFormHandler<VolumeAlertFormValues>({
    schema: volumeAlertSchema,
    defaultValues: {
      channel: 'webhook',
      webhookUrl: '',
      discordWebhookUrl: '',
      coinId: '',
      exchange: '',
      threshold: 0,
      condition: 'above',
      currency: 'USD',
      interval: '',
    },
    onSubmit: onSubmit,
  });

  // Access form state and methods directly from the 'form' object
  const { errors } = form.formState;
  const { trigger, watch, setValue } = form;

  return (
    <form className='space-y-7' onSubmit={handleSubmit}>
      {/* Channel Selector */}
      <div>
        <label className={labelClass}>Channel</label>
        <select
          value={watch('channel')}
          onChange={e => setValue('channel', e.target.value)}
          onBlur={() => trigger('channel')}
          className={selectClass}
        >
          {channels.map(ch => (
            <option key={ch.value} value={ch.value}>
              {ch.label}
            </option>
          ))}
        </select>
        {errors.channel?.message && (
          <p className='mt-1 text-xs text-red-500'>{errors.channel.message}</p>
        )}
      </div>
      {/* Conditional Inputs */}
      {watch('channel') === 'webhook' && (
        <div>
          <label className={labelClass}>Webhook URL</label>
          <div
            className={`flex items-center rounded-lg border bg-gray-800 px-4 py-2 ${errors.webhookUrl ? 'border-red-500' : 'border-gray-700'}`}
          >
            <PlugZap className='mr-2 text-blue-400' />
            <input
              type='url'
              value={watch('webhookUrl')}
              onChange={e => setValue('webhookUrl', e.target.value)}
              onBlur={() => trigger('webhookUrl')}
              placeholder='https://webhook.site/...'
              className='w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none'
            />
          </div>
          {errors.webhookUrl?.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.webhookUrl.message}</p>
          )}
        </div>
      )}
      {watch('channel') === 'discord' && (
        <div>
          <label className={labelClass}>Discord Webhook URL</label>
          <div
            className={`flex items-center rounded-lg border bg-gray-800 px-4 py-2 ${errors.discordWebhookUrl ? 'border-red-500' : 'border-gray-700'}`}
          >
            <Bot className='mr-2 text-purple-400' />
            <input
              type='text'
              value={watch('discordWebhookUrl')}
              onChange={e => setValue('discordWebhookUrl', e.target.value)}
              onBlur={() => trigger('discordWebhookUrl')}
              placeholder='https://discord.com/api/webhooks/...'
              className='w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none'
            />
          </div>
          {errors.discordWebhookUrl?.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.discordWebhookUrl.message}</p>
          )}
        </div>
      )}
      {/* TWO ROWS: Coin/Exchange, Multiplier/Interval */}
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <label className={labelClass}>Coin</label>
          <select
            value={watch('coinId')}
            onChange={e => setValue('coinId', e.target.value)}
            onBlur={() => trigger('coinId')}
            className={selectClass}
          >
            <option value=''>Select Coin</option>
            {coins.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.coinId?.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.coinId.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Exchange</label>
          <select
            value={watch('exchange')}
            onChange={e => setValue('exchange', e.target.value)}
            onBlur={() => trigger('exchange')}
            className={selectClass}
          >
            <option value=''>Select Exchange</option>
            {exchanges.map(ex => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
          {errors.exchange?.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.exchange.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <label className={labelClass}>Multiplier</label>
          <select
            value={watch('threshold')}
            onChange={e => setValue('threshold', parseFloat(e.target.value))}
            onBlur={() => trigger('threshold')}
            className={selectClass}
          >
            <option value=''>Select Multiplier</option>
            {multipliers.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.threshold?.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.threshold.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Interval</label>
          <select
            value={watch('interval')}
            onChange={e => setValue('interval', e.target.value)}
            onBlur={() => trigger('interval')}
            className={selectClass}
          >
            <option value=''>Select Interval</option>
            {intervals.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {errors.interval?.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.interval.message}</p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-blue-600'
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : 'Set Alert'}
      </button>
    </form>
  );
};

export default VolumeAlertForm;