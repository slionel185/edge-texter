import { z } from 'zod'

export const LoginFormSchema = z.object({
    username: z.string(),
    password: z.string()
})

export type LoginFormType = z.infer<typeof LoginFormSchema>