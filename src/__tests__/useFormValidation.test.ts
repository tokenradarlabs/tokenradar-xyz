import { renderHook } from '@testing-library/react-hooks';
import { z } from 'zod';
import { useFormValidation } from '../lib/hooks/useFormValidation';

describe('useFormValidation', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should initialize the form with a valid schema and default values', () => {
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      age: z.number().min(18, 'Must be at least 18'),
    });
    const defaultValues = { name: 'John Doe', age: 30 };

    const { result } = renderHook(() => useFormValidation({ schema, defaultValues }));

    expect(result.current.formState.defaultValues).toEqual(defaultValues);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should log an error and return a stable form when an invalid schema is provided', () => {
    const invalidSchema = { not: 'a zod schema' };
    const defaultValues = { name: 'John Doe', age: 30 };

    const { result } = renderHook(() => useFormValidation({ schema: invalidSchema as any, defaultValues }));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'useFormValidation: Invalid schema provided:',
      expect.any(Error) // Expecting a TypeError from zodResolver
    );
    expect(result.current).toBeDefined();
    expect(result.current.formState.defaultValues).toEqual(defaultValues);
  });

  it('should log a warning when the schema changes during component lifecycle', () => {
    const schema1 = z.object({ name: z.string() });
    const schema2 = z.object({ name: z.string(), email: z.string() });
    const defaultValues = { name: 'John Doe' };

    const { rerender } = renderHook(
      ({ schema }) => useFormValidation({ schema, defaultValues }),
      { initialProps: { schema: schema1 } }
    );

    rerender({ schema: schema2 });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'useFormValidation: Schema changed during component lifecycle. This may indicate a schema mismatch or an unstable schema definition. Please ensure your schema is stable and correctly defined.'
    );
  });
});
