
import { z } from 'zod';

export const percentageAlertSchema = z.object({
  coins: z.array(
    z.object({
      coinId: z.string().trim().min(1, { message: 'Coin ID is required.' }),
    })
  ).min(1, { message: 'At least one coin is required.' }),
  percentage: z.coerce.number().min(0, { message: 'Percentage must be a non-negative number.' }).max(100, { message: 'Percentage cannot exceed 100.' }),
  condition: z.enum(['rises', 'drops'], { message: 'Condition is required.' }),
  timeframe: z.enum(['1h', '24h', '7d'], { message: 'Timeframe is required.' }),
  channel: z.enum(['discord', 'webhook'], { message: 'Channel is required.' }),
  discordWebhookUrl: z.string().url({ message: 'Invalid Discord webhook URL.' }).optional().or(z.literal('')),
  webhookUrl: z.string().url({ message: 'Invalid webhook URL.' }).optional().or(z.literal('')),
}).refine((data) =>
  (data.channel === 'discord' ? Boolean(data.discordWebhookUrl && data.discordWebhookUrl.trim()) : true),
  { message: "Discord webhook URL is required for discord channel", path: ["discordWebhookUrl"] }
).refine((data) =>
  (data.channel === 'webhook' ? Boolean(data.webhookUrl && data.webhookUrl.trim()) : true),
  { message: "Webhook URL is required for webhook channel", path: ["webhookUrl"] }
);

export type PercentageAlertFormValues = z.infer<typeof percentageAlertSchema>;
