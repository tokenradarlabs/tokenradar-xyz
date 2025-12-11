import { z } from 'zod';

export const coinListingAlertSchema = z
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
    exchange: z.string().min(1, { message: 'Exchange is required.' }),
  })
  .refine(
    data => {
      if (
        data.coin.toLowerCase() === 'bitcoin' &&
        data.exchange.toLowerCase() === 'binance'
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Bitcoin on Binance is not a valid combination for this alert.',
      path: ['coin'], // Attach error to the coin field for visibility
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

export type CoinListingAlertFormValues = z.infer<typeof coinListingAlertSchema>;
