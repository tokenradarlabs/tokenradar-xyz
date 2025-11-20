import { z } from 'zod';
import { parseLocaleNumber } from '@/lib/utils';

export const marketCapAlertSchema = z
  .object({
    channel: z.enum(['discord', 'webhook'], {
      message: 'Channel is required.',
    }),
    webhook: z
      .string()
      .url({ message: 'Invalid webhook URL.' })
      .optional()
      .or(z.literal('')),
    discordBot: z
      .string()
      .url({ message: 'Invalid Discord webhook URL.' })
      .optional()
      .or(z.literal('')),
    coin: z.string().min(1, { message: 'Coin is required.' }),
    direction: z.enum(['above', 'below'], {
      message: 'Direction is required.',
    }),
    cap: z.preprocess(
      (val) => (typeof val === 'string' ? parseLocaleNumber(val) : val),
      z.number().min(0, { message: 'Market cap must be non-negative.' })
    ),
  })
  .refine(
    data =>
      data.channel === 'webhook'
        ? Boolean(data.webhook && data.webhook.trim())
        : true,
    {
      message: 'Webhook URL is required for webhook channel',
      path: ['webhook'],
    }
  )
  .refine(
    data =>
      data.channel === 'discord'
        ? Boolean(data.discordBot && data.discordBot.trim())
        : true,
    {
      message: 'Discord webhook URL is required for discord channel',
      path: ['discordBot'],
    }
  );

export type MarketCapAlertFormValues = z.infer<typeof marketCapAlertSchema>;
