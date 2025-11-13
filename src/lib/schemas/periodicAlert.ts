
import { z } from 'zod';

export const periodicAlertSchema = z.object({
  coins: z.array(
    z.object({
      coinId: z.string().min(1, { message: 'Coin ID is required.' }),
    })
  ).min(1, { message: 'At least one coin is required.' }),
  frequency: z.enum(['15m', '30m', '1h', '4h', '12h', '24h'], { message: 'Frequency is required.' }),
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

export type PeriodicAlertFormValues = z.infer<typeof periodicAlertSchema>;
