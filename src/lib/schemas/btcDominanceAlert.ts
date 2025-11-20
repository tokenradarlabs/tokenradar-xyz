import { z } from 'zod';

export const btcDominanceAlertSchema = z
  .object({
    channel: z.enum(['discord', 'webhook'], {
      message: 'Channel is required.',
    }),
    discordWebhookUrl: z
      .string()
      .url({ message: 'Invalid Discord webhook URL.' })
      .optional()
      .or(z.literal('')),
    webhook: z
      .string()
      .url({ message: 'Invalid webhook URL.' })
      .optional()
      .or(z.literal('')), // This will be refactored to UrlField
    direction: z.enum(['above', 'below'], {
      message: 'Direction is required.',
    }),
    level: z
      .string()
      .min(1, { message: 'Dominance level is required.' })
      .refine(val => !isNaN(parseFloat(val)), {
        message: 'Dominance level must be a valid number.',
      })
      .transform(val => parseFloat(val))
      .refine(val => val >= 0, {
        message: 'Dominance level must be non-negative.',
      })
      .refine(val => val <= 100, {
        message: 'Dominance level must be at most 100.',
      }),
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
        ? Boolean(data.webhook && data.webhook.trim())
        : true,
    {
      message: 'Webhook URL is required for webhook channel',
      path: ['webhook'],
    }
  );

export type BTCDominanceAlertFormValues = z.infer<
  typeof btcDominanceAlertSchema
>;
