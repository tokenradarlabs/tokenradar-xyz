import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceAlertForm from '../components/PriceAlertForm/PriceAlertForm';
import { useCoinAndExchangeData } from '../lib/hooks/useCoinAndExchangeData';
import { useToast } from '../lib/contexts/toast-context';
import { useAutoSave } from '../lib/utils/auto-save';

// Mock the hooks
jest.mock('../lib/hooks/useCoinAndExchangeData');
jest.mock('../lib/contexts/toast-context');
jest.mock('../lib/utils/auto-save');

describe('PriceAlertForm', () => {
  const mockShowToast = jest.fn();
  const mockClearSavedData = jest.fn();
  const mockRestore = jest.fn();

  beforeEach(() => {
    (useCoinAndExchangeData as jest.Mock).mockReturnValue({
      coins: ['Bitcoin', 'Ethereum'],
      exchanges: ['CoinGecko', 'Binance'],
      isLoading: false,
      error: null,
    });
    (useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
    (useAutoSave as jest.Mock).mockReturnValue({
      isSaving: false,
      lastSaved: null,
      restore: mockRestore,
      clearSavedData: mockClearSavedData,
    });

    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
      }) as Promise<Response>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('prevents double submission when clicking the submit button multiple times', async () => {
    render(<PriceAlertForm />);

    // Step 0: Channel
    fireEvent.change(screen.getByLabelText(/Channel/i), {
      target: { value: 'webhook' },
    });
    fireEvent.change(screen.getByLabelText(/Webhook URL/i), {
      target: { value: 'https://example.com/webhook' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Step 1: Details
    await waitFor(() => {
      expect(screen.getByLabelText(/Coin/i)).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/Coin/i), {
      target: { value: 'Bitcoin' },
    });
    fireEvent.change(screen.getByLabelText(/Threshold/i), {
      target: { value: '50000' },
    });
    fireEvent.change(screen.getByLabelText(/Currency/i), {
      target: { value: 'USD' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Step 2: Review
    await waitFor(() => {
      expect(screen.getByLabelText(/Exchange/i)).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/Exchange/i), {
      target: { value: 'CoinGecko' },
    });

    const submitButton = screen.getByRole('button', { name: /Set Alert/i });

    // Click the submit button multiple times quickly
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      'Price alert created successfully.',
      'success'
    );
    expect(mockClearSavedData).toHaveBeenCalledTimes(1);
  });
});
