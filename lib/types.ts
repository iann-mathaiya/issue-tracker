import { number, object, z } from "zod"

export const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      children: z.array(z.object({ text: z.string() })),
    })
  ),
})
