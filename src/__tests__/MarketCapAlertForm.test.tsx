import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MarketCapAlertForm from '../components/MarketCapAlertForm/MarketCapAlertForm';
import '@testing-library/jest-dom';
import React from 'react';
import { useCoinAndExchangeData } from '@/lib/hooks/useCoinAndExchangeData';

// Mock the useCoinAndExchangeData hook
jest.mock('@/lib/hooks/useCoinAndExchangeData', () => ({
  useCoinAndExchangeData: jest.fn(),
}));

const mockUseCoinAndExchangeData = useCoinAndExchangeData as jest.Mock;

describe('MarketCapAlertForm', () => {
  beforeEach(() => {
    mockUseCoinAndExchangeData.mockReturnValue({
      coins: ['BTC', 'ETH', 'XRP'],
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial form state', async () => {
    render(<MarketCapAlertForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/send me an/i)).toHaveValue('webhook');
    });
    expect(
      screen.getByPlaceholderText(/https:\/\/webhook.site\//i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/when the/i)).toHaveValue('BTC');
    expect(screen.getByLabelText(/marketcap/i)).toHaveValue('above');
    expect(screen.getByPlaceholderText('00')).toBeInTheDocument();
    expect(
      screen.getByText(/btc marketcap is currently \$-- billion/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /set alert/i })
    ).toBeInTheDocument();
  });

  it('conditionally renders Discord Bot Webhook URL field when channel is Discord', async () => {
    render(<MarketCapAlertForm />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/send me an/i), {
        target: { value: 'discord' },
      });
    });

    expect(screen.getByLabelText(/discord bot webhook url/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/webhook url/i)).not.toBeInTheDocument();
  });

  it('conditionally renders Webhook URL field when channel is Webhook', async () => {
    render(<MarketCapAlertForm />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/send me an/i), {
        target: { value: 'webhook' },
      });
    });

    expect(screen.getByLabelText(/webhook url/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/discord bot webhook url/i)
    ).not.toBeInTheDocument();
  });

  it('displays validation error for invalid webhook URL', async () => {
    render(<MarketCapAlertForm />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/send me an/i), {
        target: { value: 'webhook' },
      });
    });

    const webhookInput = screen.getByLabelText(/webhook url/i);
    fireEvent.change(webhookInput, { target: { value: 'invalid-url' } });

    fireEvent.click(screen.getByRole('button', { name: /set alert/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid webhook url./i)).toBeInTheDocument();
    });
  });

  it('displays validation error for negative market cap', async () => {
    render(<MarketCapAlertForm />);

    const capInput = screen.getByPlaceholderText('00');
    fireEvent.change(capInput, { target: { value: '-100' } });

    fireEvent.click(screen.getByRole('button', { name: /set alert/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/market cap must be non-negative./i)
      ).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<MarketCapAlertForm />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/send me an/i), {
        target: { value: 'webhook' },
      });
    });

    const webhookInput = screen.getByLabelText(/webhook url/i);
    fireEvent.change(webhookInput, { target: { value: 'https://valid.webhook.com' } });

    const coinSelect = screen.getByLabelText(/when the/i);
    fireEvent.change(coinSelect, { target: { value: 'ETH' } });

    const directionSelect = screen.getByLabelText(/marketcap/i);
    fireEvent.change(directionSelect, { target: { value: 'below' } });

    const capInput = screen.getByPlaceholderText('00');
    fireEvent.change(capInput, { target: { value: '5000000000' } });

    fireEvent.click(screen.getByRole('button', { name: /set alert/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          channel: 'webhook',
          webhook: 'https://valid.webhook.com',
          coin: 'ETH',
          direction: 'below',
          cap: 5000000000,
        })
      );
    });
    consoleSpy.mockRestore();
  });

  it('handles large numbers with locale-specific formatting correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<MarketCapAlertForm />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/send me an/i), {
        target: { value: 'webhook' },
      });
    });

    const webhookInput = screen.getByLabelText(/webhook url/i);
    fireEvent.change(webhookInput, { target: { value: 'https://test.webhook.com' } });

    const capInput = screen.getByPlaceholderText('00');

    // Test with a large number using comma as thousands separator (e.g., en-US style)
    fireEvent.change(capInput, { target: { value: '1,234,567,890.12' } });
    fireEvent.click(screen.getByRole('button', { name: /set alert/i }));
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          cap: 1234567890.12,
        })
      );
    });
    consoleSpy.mockClear();

    // Test with a large number using dot as thousands separator (e.g., de-DE style)
    fireEvent.change(capInput, { target: { value: '987.654.321,00' } });
    fireEvent.click(screen.getByRole('button', { name: /set alert/i }));
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          cap: 987654321,
        })
      );
    });
    consoleSpy.mockClear();

    // Test with a very large number without separators
    fireEvent.change(capInput, { target: { value: '1000000000000' } });
    fireEvent.click(screen.getByRole('button', { name: /set alert/i }));
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          cap: 1000000000000,
        })
      );
    });
    consoleSpy.mockRestore();
  });
});
