import { render, screen } from '@testing-library/react';
import PasswordStrength from '@/components/ui/password-strength';
import '@testing-library/jest-dom';

describe('PasswordStrength', () => {
  it('should display no indicator for empty password', () => {
    render(<PasswordStrength password="" />);
    expect(screen.queryByText(/Weak|Medium|Strong/i)).not.toBeInTheDocument();
  });

  it('should display "Weak" for a weak password', () => {
    render(<PasswordStrength password="short" />);
    expect(screen.getByText('Weak')).toBeInTheDocument();
    expect(screen.getByText('Weak')).toHaveClass('text-red-500');
  });

  it('should display "Medium" for a medium password', () => {
    render(<PasswordStrength password="MediumPass1" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toHaveClass('text-yellow-500');
  });

  it('should display "Strong" for a strong password', () => {
    render(<PasswordStrength password="StrongPass1!" />);
    expect(screen.getByText('Strong')).toBeInTheDocument();
    expect(screen.getByText('Strong')).toHaveClass('text-green-500');
  });

  it('should display "Strong" for a very strong password', () => {
    render(<PasswordStrength password="VeryStrongPass123!@#" />);
    expect(screen.getByText('Strong')).toBeInTheDocument();
    expect(screen.getByText('Strong')).toHaveClass('text-green-500');
  });
});
