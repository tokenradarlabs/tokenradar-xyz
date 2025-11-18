import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

export function useFormValidation<T extends object>(
  schema: ZodSchema<T>,
  defaultValues: T
) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
    criteriaMode: 'all',
  });

  return form;
}
