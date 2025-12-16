import { z } from 'zod';
import { zodSanitizeString } from '@/utils/validation';

export const priceAlertSchema = z
  .object({
    coins: z
      .array(
        z.object({
          coinId: zodSanitizeString.min(1, { message: 'Coin ID is required.' }),
          condition: z.enum(['above', 'below'], {
            message: 'Condition is required.',
          }),
        })
      )
      .min(1, { message: 'At least one coin is required.' }),
    threshold: z.coerce
      .number()
      .min(0, { message: 'Threshold must be non-negative.' }),
    currency: zodSanitizeString.min(1, { message: 'Currency is required.' }),
    channel: z.enum(['discord', 'webhook'], {
      message: 'Channel is required.',
    }),
    discordWebhookUrl: zodSanitizeString
      .url({ message: 'Invalid Discord webhook URL.' })
      .optional()
      .or(z.literal('')),
    webhookUrl: zodSanitizeString
      .url({ message: 'Invalid webhook URL.' })
      .optional()
      .or(z.literal('')),
    exchange: zodSanitizeString.min(1, { message: 'Exchange is required.' }),
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

export type PriceAlertFormValues = z.infer<typeof priceAlertSchema>;
