import { z } from 'zod'

export const DispatchFormSchema = z.object({
    text: z.string(),
    bucket: z.enum(['WEB_LEAD', 'VIP_GUEST', 'MISSED_GUEST', 'APPT_NO_SHOW', 'EXPIRED_GUEST', 'GUEST_OF_TOTAL', 'PAID_PASS', 'CANCELLED', 'COLLECTIONS']),
    sortBy: z.enum(['CREATED_DESCENDING', 'CREATED_ASCENDING', 'DEFAULT']),
    previousContact: z.number().min(0).max(7),
    amount: z.number().min(1).max(1000)
})

export type DispatchFormType = z.infer<typeof DispatchFormSchema>