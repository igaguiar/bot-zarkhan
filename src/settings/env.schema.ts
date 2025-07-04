import { z } from "zod";

export const envSchema = z.object({
    BOT_TOKEN: z
        .string({ description: "Discord Bot Token is required" })
        .min(1),
    MAIN_GUILD_ID: z
        .string({ description: "Main Guild id is required" })
        .min(1),
    WEBHOOK_LOGS_URL: z.string().url().optional(),
    // Env vars...
});
