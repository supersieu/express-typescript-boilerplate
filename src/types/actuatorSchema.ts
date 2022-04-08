import { z } from "zod";

export const ActuatorPostSchema = z.object({
  type: z.enum(["BLINDS", "LIGHT"]),
  designation: z.string(),
  state: z.boolean(),
});

export const ActuatorUpdateSchema = ActuatorPostSchema.partial();

type ActuatorPostSchema = z.infer<typeof ActuatorPostSchema>;
type ActuatorUpdateSchema = z.infer<typeof ActuatorUpdateSchema>;
