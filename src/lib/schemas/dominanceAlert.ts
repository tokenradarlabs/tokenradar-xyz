import { z } from 'zod';

export const dominanceAlertSchema = z
  .object({
    threshold: z.coerce
      .number()
      .min(0, { message: 'Threshold must be a non-negative number.' })
      .max(100, { message: 'Threshold cannot exceed 100.' }),
    condition: z.enum(['above', 'below'], {
      message: 'Condition is required.',
    }),
    channel: z.enum(['discord', 'webhook'], {
      message: 'Channel is required.',
    }),
    discordWebhookUrl: z
      .string()
      .url({ message: 'Invalid Discord webhook URL.' })
      .optional()
      .or(z.literal('')),
    webhookUrl: z
      .string()
      .url({ message: 'Invalid webhook URL.' })
      .optional()
      .or(z.literal('')),
  })
  .refine(
    data =>
      data.channel === 'discord'
        ? Boolean(data.discordWebhookUrl && data.discordWebhookUrl.trim())
        : true,
    {
      message: 'Discord webhook URL is required for discord channel',
      path: ['discordWebhookUrl'],
    }
  )
  .refine(
    data =>
      data.channel === 'webhook'
        ? Boolean(data.webhookUrl && data.webhookUrl.trim())
        : true,
    {
      message: 'Webhook URL is required for webhook channel',
      path: ['webhookUrl'],
    }
  );

export type DominanceAlertFormValues = z.infer<typeof dominanceAlertSchema>;
