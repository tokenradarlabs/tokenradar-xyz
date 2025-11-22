'use client';
import React from 'react';
import { PlugZap, Bot } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
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

const VolumeAlertForm: React.FC = () => {
  const { showToast } = useToast();

  const { formData, updateField, resetForm } = useFormHandler<VolumeAlertFormValues>({
    channel: 'webhook',
    webhookUrl: '',
    discordWebhookUrl: '',
    coinId: '',
    exchange: '',
    threshold: 0,
    condition: 'above',
    currency: 'USD',
    interval: '',
  });

  const { errors, validateField, validateForm } = useFormValidation(volumeAlertSchema, formData);

  const { isLoading, submitForm } = useFormSubmission(async () => {
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
      resetForm();
    } catch (err: any) {
      showToast(err.message || 'Failed to set volume alert.', 'error');
      console.error('Failed to set volume alert:', err);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await submitForm();
    }
  };

  // Placeholder data for select options
  const channels = [
    { label: 'Webhook', value: 'webhook' },
    { label: 'Discord', value: 'discord' },
  ];
  const coins = ['BTC', 'ETH', 'XRP'];
  const exchanges = ['Binance', 'Coinbase', 'Kraken'];
  const multipliers = ['0', '0.5', '1', '2', '5', '10']; // Multiplier values as strings
  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

  return (
    <form className='space-y-7' onSubmit={handleSubmit}>
      {/* Channel Selector */}
      <div>
        <label className={labelClass}>Channel</label>
        <select
          value={formData.channel}
          onChange={e => updateField('channel', e.target.value)}
          onBlur={() => validateField('channel')}
          className={selectClass}
        >
          {channels.map(ch => (
            <option key={ch.value} value={ch.value}>
              {ch.label}
            </option>
          ))}
        </select>
        {errors.channel && (
          <p className='mt-1 text-xs text-red-500'>{errors.channel}</p>
        )}
      </div>
      {/* Conditional Inputs */}
      {formData.channel === 'webhook' && (
        <div>
          <label className={labelClass}>Webhook URL</label>
          <div
            className={`flex items-center rounded-lg border bg-gray-800 px-4 py-2 ${errors.webhookUrl ? 'border-red-500' : 'border-gray-700'}`}
          >
            <PlugZap className='mr-2 text-blue-400' />
            <input
              type='url'
              value={formData.webhookUrl}
              onChange={e => updateField('webhookUrl', e.target.value)}
              onBlur={() => validateField('webhookUrl')}
              placeholder='https://webhook.site/...'
              className='w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none'
            />
          </div>
          {errors.webhookUrl && (
            <p className='mt-1 text-xs text-red-500'>{errors.webhookUrl}</p>
          )}
        </div>
      )}
      {formData.channel === 'discord' && (
        <div>
          <label className={labelClass}>Discord Bot Token</label>
          <div
            className={`flex items-center rounded-lg border bg-gray-800 px-4 py-2 ${errors.discordWebhookUrl ? 'border-red-500' : 'border-gray-700'}`}
          >
            <Bot className='mr-2 text-purple-400' />
            <input
              type='text'
              value={formData.discordWebhookUrl}
              onChange={e => updateField('discordWebhookUrl', e.target.value)}
              onBlur={() => validateField('discordWebhookUrl')}
              placeholder='Paste Discord Bot Token'
              className='w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none'
            />
          </div>
          {errors.discordWebhookUrl && (
            <p className='mt-1 text-xs text-red-500'>{errors.discordWebhookUrl}</p>
          )}
        </div>
      )}
      {/* TWO ROWS: Coin/Exchange, Multiplier/Interval */}
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <label className={labelClass}>Coin</label>
          <select
            value={formData.coinId}
            onChange={e => updateField('coinId', e.target.value)}
            onBlur={() => validateField('coinId')}
            className={selectClass}
          >
            <option value=''>Select Coin</option>
            {coins.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.coinId && (
            <p className='mt-1 text-xs text-red-500'>{errors.coinId}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Exchange</label>
          <select
            value={formData.exchange}
            onChange={e => updateField('exchange', e.target.value)}
            onBlur={() => validateField('exchange')}
            className={selectClass}
          >
            <option value=''>Select Exchange</option>
            {exchanges.map(ex => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
          {errors.exchange && (
            <p className='mt-1 text-xs text-red-500'>{errors.exchange}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <label className={labelClass}>Multiplier</label>
          <select
            value={formData.threshold}
            onChange={e => updateField('threshold', parseFloat(e.target.value))}
            onBlur={() => validateField('threshold')}
            className={selectClass}
          >
            <option value=''>Select Multiplier</option>
            {multipliers.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.threshold && (
            <p className='mt-1 text-xs text-red-500'>{errors.threshold}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Interval</label>
          <select
            value={formData.interval}
            onChange={e => updateField('interval', e.target.value)}
            onBlur={() => validateField('interval')}
            className={selectClass}
          >
            <option value=''>Select Interval</option>
            {intervals.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {errors.interval && (
            <p className='mt-1 text-xs text-red-500'>{errors.interval}</p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-700 hover:to-blue-600'
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Set Alert'}
      </button>
    </form>
  );
};

export default VolumeAlertForm;
