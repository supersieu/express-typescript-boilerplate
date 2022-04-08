import { z } from "zod";

export const SensorPostSchema = z.object({
  type: z.enum(["TEMPERATURE", "HUMIDITY", "BARO", "PROXIMITY"]),
  designation: z.string(),
  rawValue: z.number().nonnegative().lte(1023),
});

export const SensorUpdateSchema = SensorPostSchema.partial();

type SensorPostSchema = z.infer<typeof SensorPostSchema>;
type SensorUpdateSchema = z.infer<typeof SensorUpdateSchema>;
