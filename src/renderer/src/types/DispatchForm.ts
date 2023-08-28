import { z } from 'zod'

export const DispatchFormSchema = z.object({
    text: z.string(),
    bucket: z.string(),
    sortBy: z.string(),
    previousContact: z.string(),
    amount: z.string()
})

export type DispatchFormType = z.infer<typeof DispatchFormSchema>