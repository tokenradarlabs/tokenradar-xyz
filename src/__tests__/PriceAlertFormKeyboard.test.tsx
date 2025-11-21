import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PriceAlertForm } from '../components/price-alert/price-alert-form';

describe('PriceAlertForm keyboard navigation', () => {
  it('navigates and selects coin using keyboard', async () => {
    render(<PriceAlertForm />);

    const coinDropdownTrigger = screen.getByRole('button', { name: /BTC/i });
    fireEvent.click(coinDropdownTrigger);

    // Wait for the dropdown content to appear
    await waitFor(() => {
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('DEV')).toBeInTheDocument();
    });

    const dropdownContent = screen.getByRole('menu');

    // Initial state: no item highlighted
    expect(screen.getByText('BTC')).not.toHaveAttribute(
      'data-highlighted',
      'true'
    );
    expect(screen.getByText('ETH')).not.toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown to highlight BTC
    fireEvent.keyDown(dropdownContent, { key: 'ArrowDown' });
    expect(screen.getByText('BTC')).toHaveAttribute(
      'data-highlighted',
      'true'
    );
    expect(screen.getByText('ETH')).not.toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown to highlight ETH
    fireEvent.keyDown(dropdownContent, { key: 'ArrowDown' });
    expect(screen.getByText('BTC')).not.toHaveAttribute(
      'data-highlighted',
      'true'
    );
    expect(screen.getByText('ETH')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown to highlight DEV
    fireEvent.keyDown(dropdownContent, { key: 'ArrowDown' });
    expect(screen.getByText('ETH')).not.toHaveAttribute(
      'data-highlighted',
      'true'
    );
    expect(screen.getByText('DEV')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowDown again (should stay on DEV)
    fireEvent.keyDown(dropdownContent, { key: 'ArrowDown' });
    expect(screen.getByText('DEV')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press ArrowUp to highlight ETH
    fireEvent.keyDown(dropdownContent, { key: 'ArrowUp' });
    expect(screen.getByText('DEV')).not.toHaveAttribute(
      'data-highlighted',
      'true'
    );
    expect(screen.getByText('ETH')).toHaveAttribute(
      'data-highlighted',
      'true'
    );

    // Press Enter to select ETH
    fireEvent.keyDown(dropdownContent, { key: 'Enter' });

    // Dropdown should close and selected token should be ETH
    await waitFor(() => {
      expect(screen.queryByText('ETH')).not.toBeInTheDocument(); // ETH item in dropdown
      expect(screen.getByRole('button', { name: /ETH/i })).toBeInTheDocument(); // Selected ETH in trigger
    });
  });
});
