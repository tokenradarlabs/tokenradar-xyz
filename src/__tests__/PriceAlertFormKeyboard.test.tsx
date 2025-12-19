import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PriceAlertForm from '../components/PriceAlertForm/PriceAlertForm';

// Mock the useCoinAndExchangeData hook
jest.mock('@/lib/hooks/useCoinAndExchangeData', () => ({
  useCoinAndExchangeData: () => ({
    coins: ['BTC', 'ETH', 'DEV'],
    exchanges: ['CoinGecko', 'Binance'],
    isLoading: false,
    error: null,
  }),
}));

// Mock the useToast hook
jest.mock('@/lib/contexts/toast-context', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}));

// Mock the global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  }) as Promise<Response>
);

describe('PriceAlertForm keyboard navigation and shortcuts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates and selects coin using keyboard', async () => {
    render(<PriceAlertForm />);

    const coinDropdownTrigger = screen.getByRole('combobox', { name: /Coin/i });
    userEvent.click(coinDropdownTrigger);

    // Wait for the dropdown content to appear
    await waitFor(() => {
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('DEV')).toBeInTheDocument();
    });

    // Press ArrowDown to highlight BTC
    fireEvent.keyDown(coinDropdownTrigger, { key: 'ArrowDown' });
    expect(screen.getByText('BTC')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown to highlight ETH
    fireEvent.keyDown(coinDropdownTrigger, { key: 'ArrowDown' });
    expect(screen.getByText('ETH')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown to highlight DEV
    fireEvent.keyDown(coinDropdownTrigger, { key: 'ArrowDown' });
    expect(screen.getByText('DEV')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown again (should stay on DEV)
    fireEvent.keyDown(coinDropdownTrigger, { key: 'ArrowDown' });
    expect(screen.getByText('DEV')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowUp to highlight ETH
    fireEvent.keyDown(coinDropdownTrigger, { key: 'ArrowUp' });
    expect(screen.getByText('ETH')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press Enter to select ETH
    fireEvent.keyDown(coinDropdownTrigger, { key: 'Enter' });

    // Dropdown should close and selected token should be ETH
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(); // Dropdown menu should be removed
      expect(screen.getByRole('combobox', { name: /Coin/i })).toHaveValue('ETH'); // Selected ETH in trigger
    });
  });

  it('submits the form on Ctrl+Enter', async () => {
    render(<PriceAlertForm />);

    // Navigate to the last step
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Simulate Ctrl+Enter
    fireEvent.keyDown(document, { key: 'Enter', ctrlKey: true });

    // Confirm dialog should appear
    await waitFor(() => {
      expect(screen.getByRole('alertdialog', { name: /Confirm Alert Submission/i })).toBeInTheDocument();
    });

    // Confirm submission
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('closes the confirm dialog on Escape', async () => {
    render(<PriceAlertForm />);

    // Navigate to the last step to enable submission
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Trigger submission to open confirm dialog
    fireEvent.click(screen.getByRole('button', { name: /Set Alert/i }));

    await waitFor(() => {
      expect(screen.getByRole('alertdialog', { name: /Confirm Alert Submission/i })).toBeInTheDocument();
    });

    // Simulate Escape key press
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog', { name: /Confirm Alert Submission/i })).not.toBeInTheDocument();
    });
  });

  it('opens and closes keyboard shortcuts modal', async () => {
    render(<PriceAlertForm />);

    // Open modal via button
    fireEvent.click(screen.getByRole('button', { name: /Keyboard Shortcuts/i }));

    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /Keyboard Shortcuts/i })).toBeInTheDocument();
    });

    // Close modal via Escape key
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Keyboard Shortcuts/i })).not.toBeInTheDocument();
    });
  });

  it('blurs an active input on Escape if no dialogs are open', async () => {
    render(<PriceAlertForm />);

    const webhookUrlInput = screen.getByLabelText(/Webhook URL/i);
    userEvent.type(webhookUrlInput, 'test.com');

    await waitFor(() => {
        expect(webhookUrlInput).toHaveFocus();
    })

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(webhookUrlInput).not.toHaveFocus();
    });
  });
});

