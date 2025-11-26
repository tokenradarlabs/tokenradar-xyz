import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number for compact display, e.g., 1234 becomes "1.2K", 1000000 becomes "1M".
 * Uses `Intl.NumberFormat` for locale-aware formatting.
 *
 * @param num The number to format.
 * @param locale The locale to use for formatting (defaults to 'en-US').
 * @returns The compactly formatted string.
 * @example
 * formatNumberCompact(1234); // "1.2K"
 * formatNumberCompact(1000000); // "1M"
 */
export function formatNumberCompact(
  num: number,
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  } catch (error) {
    // Only treat invalid-locale (RangeError) as recoverable; rethrow others
    if (
      error instanceof RangeError ||
      (error &&
        typeof error === 'object' &&
        'name' in error &&
        error.name === 'RangeError')
    ) {
      // Optional: log a warning so the issue can be diagnosed
      try {
        console.warn(
          `formatNumberCompact: invalid locale "${locale}"; falling back to 'en-US'.`
        );
      } catch {
        // ignore logging errors
      }
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(num);
    }
    throw error;
  }
}

/**
 * Parses a locale-formatted number string into a number.
 * It attempts to determine the decimal separator based on the current locale
 * and then normalizes the string before parsing to ensure correct conversion
 * of large numbers with thousands separators.
 *
 * @param numStr The number string to parse.
 * @param locale The locale to use for parsing (defaults to 'en-US').
 * @returns The parsed number, or NaN if parsing fails.
 */
export function parseLocaleNumber(numStr: string, locale: string = 'en-US'): number {
  if (!numStr) {
    return NaN;
  }

  // Determine the actual decimal separator for the given locale
  const numberWithDecimal = new Intl.NumberFormat(locale).format(1.1);
  const decimalSeparator = numberWithDecimal.charAt(1);

  // Remove all thousands separators and replace the locale-specific decimal separator with a dot
  let cleanedNumStr = numStr.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
  
  // Remove any other non-digit characters that are not a dot (decimal separator)
  cleanedNumStr = cleanedNumStr.replace(/[^\d.]/g, '');

  return parseFloat(cleanedNumStr);
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const isValidEmail = (email: string): boolean => {
  // Basic email regex for demonstration. A more comprehensive regex might be needed for production.
  const emailRegex = /^[^\s@]+@[^\s@]+\\.[^\s@]+$/;
  return emailRegex.test(email);
};

