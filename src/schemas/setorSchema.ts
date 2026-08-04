import { z } from 'zod'

export const setorSchema = z.object({
    nome: z.string().min(1, 'O nome do setor deve ser preenchido.')
})

export type SetorFormData = z.infer<typeof setorSchema>