'use client';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ConfirmDialog } from '../ui/confirm-dialog';
import { useAutoSave } from '@/lib/utils/auto-save';
import StepIndicator from '../ui/step-indicator';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  priceAlertSchema,
  PriceAlertFormValues,
} from '../../lib/schemas/priceAlert';

import { SelectField } from '../ui/select-field';
import { UrlField } from '../ui/url-field';
import { NumberField } from '../ui/number-field';
import { CurrencySelector } from '../ui/currency-selector';
import { FormSkeleton } from './FormSkeleton';
import { Spinner } from '../ui/spinner';
import { useToast } from '@/lib/contexts/toast-context';
import { useCoinAndExchangeData } from '@/lib/hooks/useCoinAndExchangeData';
import { useFormSubmission } from '@/lib/hooks/useFormSubmission';

export default function PriceAlertForm() {
  const { showToast } = useToast();
  const {
    coins,
    exchanges,
    isLoading: isLoadingData,
    error: dataError,
  } = useCoinAndExchangeData();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Channel', 'Details', 'Review'];
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const AUTO_SAVE_KEY = 'priceAlertForm';

  const methods = useForm<PriceAlertFormValues>({
    resolver: zodResolver(priceAlertSchema),
    defaultValues: {
      coins: [{ coinId: '', condition: 'above' }],
      threshold: 0,
      currency: 'USD',
      channel: 'webhook',
      discordWebhookUrl: '',
      webhookUrl: '',
      exchange: 'CoinGecko',
    },
  });

  const { isSaving, lastSaved, restore, clearSavedData, isDirty } =
    useAutoSave<PriceAlertFormValues>({
      key: AUTO_SAVE_KEY,
      data: methods.watch(),
      initialData: methods.getValues(), // Use current form values as initial data
      onRestore: savedData => {
        methods.reset(savedData);
        showToast('Unsaved data restored.', 'info');
      },
      onSave: () => {
        // Optional: show a subtle toast or log when data is saved
      },
    });

  // New: Handle browser beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    if (isDirty) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const channelRef = useRef<HTMLSelectElement>(null);
  const webhookUrlRef = useRef<HTMLInputElement>(null);
  const discordWebhookUrlRef = useRef<HTMLInputElement>(null);
  const coinIdRef = useRef<HTMLSelectElement>(null);

  useLayoutEffect(() => {
    if (currentStep === 0) {
      const currentChannel = methods.getValues('channel');
      if (currentChannel === 'webhook') {
        webhookUrlRef.current?.focus();
      } else if (currentChannel === 'discord') {
        discordWebhookUrlRef.current?.focus();
      } else {
        channelRef.current?.focus();
      }
    } else if (currentStep === 1) {
      coinIdRef.current?.focus();
    }
  }, [currentStep]);


  const onConfirmSubmit = async (data: PriceAlertFormValues) => {
    const response = await fetch('/api/price-alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create price alert.');
    }

    methods.reset(); // Reset form fields
    clearSavedData(); // Clear auto-saved data
  };

  const { handleSubmit: submitHandler, isSubmitting } =
    useFormSubmission<PriceAlertFormValues>({
      onSubmit: onConfirmSubmit,
      successMessage: 'Price alert created successfully.',
      errorMessage: 'Failed to create price alert.',
      onSuccess: () => {
        // Any additional logic on success, if needed
      },
      onError: error => {
        console.error('Failed to create price alert:', error);
      },
    });
  
  const handlePreSubmit = () => {
    setShowConfirmDialog(true);
  };

  const formDisabled = isSubmitting || isLoadingData;

  if (isLoadingData) {
    return (
      <div className='flex h-48 items-center justify-center'>
        <FormSkeleton currentStep={currentStep} />
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

  return (
    <div className='relative w-full max-w-xl rounded-3xl border border-blue-100 bg-white p-10 shadow-xl dark:border-indigo-800 dark:bg-gray-950'>
      <h2 className='mb-6 text-center text-3xl font-bold text-blue-600 dark:text-purple-300'>
        Price Alert
      </h2>
      <div className='mb-8'>
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>
      <form onSubmit={methods.handleSubmit(handlePreSubmit)} className='space-y-5'>
        <FormProvider {...methods}>
          {currentStep === 0 && (
            <>
              <SelectField
                ref={channelRef}
                name='channel'
                label='Channel'
                placeholder='Select where to receive alerts'
                options={[
                  { label: 'Webhook', value: 'webhook' },
                  { label: 'Discord Bot', value: 'discord' },
                ]}
                disabled={formDisabled}
              />
              {channel === 'webhook' && (
                <UrlField
                  ref={webhookUrlRef}
                  name='webhookUrl'
                  label='Webhook URL'
                  placeholder='Enter your webhook URL'
                  disabled={formDisabled}
                />
              )}
              {channel === 'discord' && (
                <UrlField
                  ref={discordWebhookUrlRef}
                  name='discordWebhookUrl'
                  label='Discord Webhook URL'
                  placeholder='Enter your Discord webhook URL'
                  disabled={formDisabled}
                />
              )}
            </>
          )}

          {currentStep === 1 && (
            <>
              <SelectField
                ref={coinIdRef}
                name='coins.0.coinId'
                label='Coin'
                placeholder='Select a coin'
                options={coins.map(c => ({ label: c, value: c }))}
                disabled={formDisabled}
              />
              <NumberField
                name='threshold'
                label='Threshold'
                placeholder='Enter threshold price'
                step={0.01}
                disabled={formDisabled}
              />
              <CurrencySelector
                name='currency'
                label='Currency'
                placeholder='Select currency'
                value={methods.watch('currency')}
                onValueChange={(value) => methods.setValue('currency', value)}
                disabled={formDisabled}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <SelectField
                name='exchange'
                label='Exchange'
                options={exchanges.map(ex => ({ label: ex, value: ex }))}
                disabled={formDisabled}
              />
              <div className='mt-5 rounded-md border bg-gray-50 p-4 dark:bg-gray-800'>
                <h3 className='mb-2 text-lg font-semibold'>
                  Review Your Alert
                </h3>
                <p>
                  <strong>Channel:</strong> {methods.watch('channel')}
                </p>
                {methods.watch('channel') === 'webhook' && (
                  <p>
                    <strong>Webhook URL:</strong> {methods.watch('webhookUrl')}
                  </p>
                )}
                {methods.watch('channel') === 'discord' && (
                  <p>
                    <strong>Discord Webhook URL:</strong>{' '}
                    {methods.watch('discordWebhookUrl')}
                  </p>
                )}
                <p>
                  <strong>Coin:</strong> {methods.watch('coins.0.coinId')}
                </p>
                <p>
                  <strong>Condition:</strong>{' '}
                  {methods.watch('coins.0.condition')}
                </p>
                <p>
                  <strong>Threshold:</strong> {methods.watch('threshold')}{' '}
                  {methods.watch('currency')}
                </p>
                <p>
                  <strong>Exchange:</strong> {methods.watch('exchange')}
                </p>
              </div>
            </>
          )}

          <div className='mt-6 flex justify-between'>
            {currentStep > 0 && (
              <button
                type='button'
                onClick={() => setCurrentStep(prev => prev - 1)}
                className='rounded-xl bg-gray-200 px-4 py-2 text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                disabled={formDisabled}
              >
                Previous
              </button>
            )}

            {currentStep < steps.length - 1 && (
              <button
                type='button'
                onClick={async () => {
                  let isValid = false;
                  if (currentStep === 0) {
                    isValid = await methods.trigger([
                      'channel',
                      channel === 'webhook'
                        ? 'webhookUrl'
                        : 'discordWebhookUrl',
                    ]);
                  } else if (currentStep === 1) {
                    isValid = await methods.trigger([
                      'coins.0.coinId',
                      'coins.0.condition',
                      'threshold',
                      'currency',
                    ]);
                  }

                  if (isValid) {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
                className='ml-auto rounded-xl bg-blue-600 px-4 py-2 font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-700'
                disabled={formDisabled}
              >
                Next
              </button>
            )}

            {currentStep === steps.length - 1 && (
              <button
                type='submit'
                className='ml-auto w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-blue-600'
                disabled={formDisabled}
              >
                {isSubmitting ? <Spinner /> : 'Set Alert'}
              </button>
            )}
          </div>
        </FormProvider>
        <div className='mt-4 text-center text-sm text-gray-500 dark:text-gray-400'>
          {isSaving && <p>Saving...</p>}
          {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}
        </div>
      </form>
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Confirm Alert Submission"
        description="Are you sure you want to create this price alert?"
        onConfirm={methods.handleSubmit(submitHandler)}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </div>
  );
}
