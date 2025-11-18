import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MarketCapAlertForm from '../components/MarketCapAlertForm/MarketCapAlertForm';
import '@testing-library/jest-dom';
import React from 'react';

const mockChannels = [
  { label: 'Webhook', value: 'webhook' },
  { label: 'Discord', value: 'discord' },
  { label: 'Email', value: 'email' },
];

const mockCoins = [
  { label: 'Bitcoin', value: 'BTC' },
  { label: 'Ethereum', value: 'ETH' },
];

const mockDirections = [
  { label: 'rises above', value: 'rises_above' },
  { label: 'drops below', value: 'drops_below' },
];

const initialFormState = {
  channel: 'webhook',
  webhook: 'https://example.com/webhook',
  discordBot: '',
  coin: 'BTC',
  direction: 'rises_above',
  cap: '1000',
};

const setup = (
  formState = initialFormState,
  handleChange = jest.fn(),
  handleSubmit = jest.fn(),
  isLoading = false,
  error = null,
  currentMarketCap = '1,234.56'
) => {
  render(
    <MarketCapAlertForm
      form={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      channels={mockChannels}
      coins={mockCoins}
      directions={mockDirections}
      currentMarketCap={currentMarketCap}
      isLoading={isLoading}
      error={error}
    />
  );
};

describe('MarketCapAlertForm', () => {
  it('renders correctly with initial form state', () => {
    setup();
    expect(screen.getByLabelText(/send me an/i)).toHaveValue('webhook');
    expect(
      screen.getByPlaceholderText(/https:\/\/webhook.site\//i)
    ).toHaveValue('https://example.com/webhook');
    expect(screen.getByLabelText(/when the/i)).toHaveValue('BTC');
    expect(screen.getByLabelText(/marketcap direction/i)).toHaveValue(
      'rises_above'
    );
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
    expect(
      screen.getByText(/btc marketcap is currently \$1,234.56 billion/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /set alert/i })
    ).toBeInTheDocument();
  });

  it('calls handleChange when channel is changed', () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    fireEvent.change(screen.getByLabelText(/send me an/i), {
      target: { value: 'discord' },
    });

    expect(handleChange).toHaveBeenCalledWith('channel');
  });

  it('calls handleChange when webhook URL is changed', () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    const webhookInput = screen.getByPlaceholderText(
      /https:\/\/webhook.site\//i
    );
    fireEvent.change(webhookInput, {
      target: { value: 'https://new.webhook.com' },
    });

    expect(handleChange).toHaveBeenCalledWith('webhook');
  });

  it('calls handleChange when coin is changed', () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    fireEvent.change(screen.getByLabelText(/cryptocurrency/i), {
      target: { value: 'ETH' },
    });

    expect(handleChange).toHaveBeenCalledWith('coin');
  });

  it('calls handleChange when direction is changed', () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    fireEvent.change(screen.getByLabelText(/market cap direction/i), {
      target: { value: 'drops_below' },
    });

    expect(handleChange).toHaveBeenCalledWith('direction');
  });

  it('calls handleChange when market cap is changed', () => {
    const handleChange = jest.fn(() => () => {});
    setup(initialFormState, handleChange);

    const capInput = screen.getByDisplayValue('1000');
    fireEvent.change(capInput, { target: { value: '2000' } });

    expect(handleChange).toHaveBeenCalledWith('cap');
  });

  it('conditionally renders Discord Bot Token field when channel is Discord', () => {
    const discordFormState = { ...initialFormState, channel: 'discord' };
    setup(discordFormState);

    expect(screen.getByLabelText(/discord bot token/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/webhook url/i)).not.toBeInTheDocument();
  });

  it('conditionally renders Webhook URL field when channel is Webhook', () => {
    const webhookFormState = { ...initialFormState, channel: 'webhook' };
    setup(webhookFormState);

    expect(screen.getByLabelText(/webhook url/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/discord bot token/i)
    ).not.toBeInTheDocument();
  });

  it('calls handleSubmit on form submission', () => {
    const handleSubmit = jest.fn();
    setup(
      initialFormState,
      jest.fn(() => () => {}),
      handleSubmit
    );

    userEvent.click(screen.getByRole('button', { name: /set alert/i }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button and shows spinner when isLoading is true', () => {
    setup(
      initialFormState,
      jest.fn(() => () => {}),
      jest.fn(),
      true
    );

    const submitButton = screen.getByRole('button', { name: /set alert/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner has role="status"
  });

  it('displays an error message when error prop is provided', () => {
    const errorMessage = 'Market cap alert failed!';
    setup(
      initialFormState,
      jest.fn(() => () => {}),
      jest.fn(),
      false,
      errorMessage
    );

    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
  });
});
