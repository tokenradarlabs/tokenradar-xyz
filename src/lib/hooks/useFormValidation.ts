import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, ZodError } from 'zod';
import { useEffect, useRef } from 'react';

export function useFormValidation<T extends object>(
  schema: ZodSchema<T>,
  defaultValues: T
) {
  const schemaRef = useRef(schema);

  useEffect(() => {
    if (schemaRef.current !== schema) {
      console.warn(
        'useFormValidation: Schema changed during component lifecycle. This may indicate a schema mismatch or an unstable schema definition. Please ensure your schema is stable and correctly defined.'
      );
      schemaRef.current = schema;
    }
  }, [schema]);

  let resolver;
  try {
    resolver = zodResolver(schema);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('useFormValidation: Zod schema error:', error.errors);
    } else {
      console.error('useFormValidation: Invalid schema provided:', error);
    }
    // Provide a fallback resolver to ensure a stable API shape
    resolver = () => ({ values: defaultValues, errors: {} });
  }

  const form = useForm<T>({
    resolver,
    defaultValues,
    mode: 'onChange',
    criteriaMode: 'all',
  });

  return form;
}
