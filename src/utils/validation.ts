export const sanitizeInput = (input: string | null | undefined): string => {
  if (input === null || input === undefined) {
    return '';
  }
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const isWithinRange = (
  value: number | null | undefined,
  min: number | null | undefined,
  max: number | null | undefined
): boolean => {
  if (value === null || value === undefined || min === null || min === undefined || max === null || max === undefined) {
    return false;
  }
  return value >= min && value <= max;
};
