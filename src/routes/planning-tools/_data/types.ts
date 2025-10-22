import * as z from "zod";

export type DraftField<T> = {
  options: T[];
  current: number;
};

export const draftField = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    options: z.array(itemSchema),
    current: z.number(),
  });
