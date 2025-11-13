
import { z } from 'zod';

export const volumeAlertSchema = z.object({
  coins: z.array(
    z.object({
      coinId: z.string().trim().min(1, { message: 'Coin ID is required.' }),
    })
  ).min(1, { message: 'At least one coin is required.' }),
  threshold: z.coerce.number().min(0, { message: 'Threshold must be a non-negative number.' }),
  condition: z.enum(['above', 'below'], { message: 'Condition is required.' }),
  currency: z.string().trim().min(1, { message: 'Currency is required.' }),
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

export type VolumeAlertFormValues = z.infer<typeof volumeAlertSchema>;
