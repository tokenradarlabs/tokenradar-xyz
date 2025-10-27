import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
export function formatNumberCompact(num: number, locale: string = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'short' }).format(num);
  } catch (error) {
    // Only treat invalid-locale (RangeError) as recoverable; rethrow others
    if (error instanceof RangeError || (error && (error as any).name === 'RangeError')) {
      // Optional: log a warning so the issue can be diagnosed
      try {
        console.warn(`formatNumberCompact: invalid locale "${locale}"; falling back to 'en-US'.`);
      } catch (_) {
        // ignore logging errors
      }
      return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
    }
    throw error;
  }
}