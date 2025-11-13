
import { z } from 'zod';

export const CoinListingAlertSchema = z.object({
  exchange: z.string().trim().min(1, { message: 'Exchange is required.' }),
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

export type CoinListingAlertFormValues = z.infer<typeof coinListingAlertSchema>;
