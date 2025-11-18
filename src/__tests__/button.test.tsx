import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders the button with children', () => {
    render(<Button>Test Button</Button>);
    expect(
      screen.getByRole('button', { name: /test button/i })
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Test Button</Button>);
    expect(screen.getByRole('button', { name: /test button/i })).toHaveClass(
      'custom-class'
    );
  });

  it('renders a disabled button when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders a disabled button when loading prop is true', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button', { name: /loading button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner has role="status"
  });

  it('renders a button with a specific variant', () => {
    render(<Button variant='destructive'>Destructive Button</Button>);
    const button = screen.getByRole('button', { name: /destructive button/i });
    expect(button).toHaveClass('bg-destructive'); // Check for a class specific to destructive variant
  });

  it('renders a button with a specific size', () => {
    render(<Button size='sm'>Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('h-8'); // Check for a class specific to sm size
  });

  it('does not render a spinner when loading is false', () => {
    render(<Button loading={false}>No Loading</Button>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders as a child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href='/test'>Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('disables the child element when asChild and disabled are true', () => {
    render(
      <Button asChild disabled>
        <a href='/test'>Disabled Link</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /disabled link/i });
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
    expect(link).not.toHaveAttribute('href'); // href should be removed when disabled
  });
});
