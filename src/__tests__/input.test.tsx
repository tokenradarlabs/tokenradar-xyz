import { render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../components/ui/input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays character count when showCharCount and maxLength are provided', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('hello');
      return <Input showCharCount maxLength={10} value={value} onChange={(e) => setValue(e.target.value)} />;
    };
    render(<TestComponent />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(screen.getByText('5/10')).toBeInTheDocument();

    await user.type(inputElement, ' world');
    expect(screen.getByText('11/10')).toBeInTheDocument();
  });

  it('does not display character count when showCharCount is false', () => {
    render(<Input showCharCount={false} maxLength={10} defaultValue="hello" />);
    expect(screen.queryByText('5/10')).not.toBeInTheDocument();
  });

  it('does not display character count when maxLength is not provided', () => {
    render(<Input showCharCount defaultValue="hello" />);
    expect(screen.queryByText('5/')).not.toBeInTheDocument();
  });
});
