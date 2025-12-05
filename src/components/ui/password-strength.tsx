import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password?: string;
}

type Strength = 'weak' | 'medium' | 'strong' | 'none';

const getPasswordStrength = (password: string): Strength => {
  if (!password || password.length === 0) {
    return 'none';
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strength = getPasswordStrength(password || '');

  const strengthColor = {
    none: 'bg-gray-200',
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const strengthText = {
    none: '',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            strength === 'weak' && 'w-1/3',
            strength === 'medium' && 'w-2/3',
            strength === 'strong' && 'w-full',
            strength === 'none' && 'w-0',
            strengthColor[strength]
          )}
        ></div>
      </div>
      {strength !== 'none' && (
        <span className={cn('text-sm', {
          'text-red-500': strength === 'weak',
          'text-yellow-500': strength === 'medium',
          'text-green-500': strength === 'strong',
        })}>
          {strengthText[strength]}
        </span>
      )}
    </div>
  );
};

export default PasswordStrength;
