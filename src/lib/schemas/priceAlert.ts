
import { z } from 'zod';

export const priceAlertSchema = z.object({
  coins: z.array(
    z.object({
      coinId: z.string().min(1, { message: 'Coin ID is required.' }),
      condition: z.enum(['above', 'below'], { message: 'Condition is required.' }),
    })
  ).min(1, { message: 'At least one coin is required.' }),
  threshold: z.coerce.number().min(0, { message: 'Threshold must be a positive number.' }),
  currency: z.string().min(1, { message: 'Currency is required.' }),
  channel: z.enum(['discord', 'webhook'], { message: 'Channel is required.' }),
  discordWebhookUrl: z.string().url({ message: 'Invalid Discord webhook URL.' }).optional().or(z.literal('')),
  webhookUrl: z.string().url({ message: 'Invalid webhook URL.' }).optional().or(z.literal('')),
});

export type PriceAlertFormValues = z.infer<typeof priceAlertSchema>;
