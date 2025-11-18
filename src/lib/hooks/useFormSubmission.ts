import { useState } from 'react';
import { useToast } from '@/lib/contexts/toast-context';

interface UseFormSubmissionOptions<T> {
  onSubmit: (values: T) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useFormSubmission<T extends object>({
  onSubmit: submitFunction,
  successMessage = 'Operation successful!',
  errorMessage = 'An unexpected error occurred. Please try again.',
  onSuccess,
  onError,
}: UseFormSubmissionOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (values: T) => {
    setIsSubmitting(true);
    try {
      await submitFunction(values);
      showToast(successMessage, 'success');
      onSuccess?.();
    } catch (err: unknown) {
      console.error('Form submission error', err);
      let message = errorMessage;
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }
      showToast(message, 'error');
      onError?.(err instanceof Error ? err : new Error(message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
}
