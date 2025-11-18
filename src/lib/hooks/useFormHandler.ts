import { ZodSchema } from "zod";
import { useFormValidation } from "./useFormValidation";
import { useFormSubmission } from "./useFormSubmission";

interface UseFormHandlerOptions<T> {
  schema: ZodSchema<T>;
  defaultValues: T;
  onSubmit: (values: T) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useFormHandler<T extends object>({
  schema,
  defaultValues,
  onSubmit,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: UseFormHandlerOptions<T>) {
  const form = useFormValidation(schema, defaultValues);
  const { handleSubmit, isSubmitting } = useFormSubmission({
    onSubmit,
    successMessage,
    errorMessage,
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
    onError,
  });

  return { form, handleSubmit: form.handleSubmit(handleSubmit), isSubmitting };
}
