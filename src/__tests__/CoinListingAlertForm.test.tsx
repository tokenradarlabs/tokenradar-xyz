import { render, screen, waitFor } from '@testing-library/react';
import CoinListingAlertForm from '../components/CoinlistingAlertForm/CoinListingAlertForm';
import '@testing-library/jest-dom';
import React from 'react';
import { useCoinAndExchangeData } from '@/lib/hooks/useCoinAndExchangeData';

// Mock the useCoinAndExchangeData hook
jest.mock('@/lib/hooks/useCoinAndExchangeData', () => ({
  useCoinAndExchangeData: jest.fn(),
}));

describe('CoinListingAlertForm', () => {
  beforeEach(() => {
    // Reset the mock before each test
    (useCoinAndExchangeData as jest.Mock).mockReturnValue({
      coins: ['Bitcoin', 'Ethereum', 'A Very Long Coin Name That Should Wrap'],
      exchanges: ['Binance', 'Coinbase', 'Kraken'],
      isLoading: false,
      coinsError: null,
      exchangesError: null,
    });
  });

  it('renders correctly with initial form state', async () => {
    render(<CoinListingAlertForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Send me an/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/as soon as/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/gets listed on/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Set Alert/i })).toBeInTheDocument();
    });
  });

  it('displays a long coin name that should wrap', async () => {
    render(<CoinListingAlertForm />);

    await waitFor(() => {
      // Open the coin select dropdown
      const coinSelectTrigger = screen.getByLabelText(/as soon as/i);
      coinSelectTrigger.click();
    });

    // Check if the long coin name is present in the dropdown options
    expect(screen.getByText('A Very Long Coin Name That Should Wrap')).toBeInTheDocument();
  });

  it('shows spinner when data is loading', () => {
    (useCoinAndExchangeData as jest.Mock).mockReturnValue({
      coins: [],
      exchanges: [],
      isLoading: true,
      error: null,
    });

    render(<CoinListingAlertForm />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner has role="status"
  });

  it('displays error message when data loading fails', () => {
    const errorMessage = 'Failed to load coin data.';
    (useCoinAndExchangeData as jest.Mock).mockReturnValue({
      coins: [],
      exchanges: [],
      isLoading: false,
      coinsError: new Error(errorMessage),
      exchangesError: null,
    });

    render(<CoinListingAlertForm />);
    expect(screen.getByText(`Error loading data: ${errorMessage}`)).toBeInTheDocument();
  });
});
