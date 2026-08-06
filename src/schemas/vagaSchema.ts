import { z } from "zod"

export const vagaSchema = z.object({
    numero: z.string().trim().min(1, "O número da vaga deve ser preenchido"),
    setorId: z.number({message: "Selecione um setor"}),
    tipo: z.enum(['CARRO', 'MOTO', 'PCD', 'IDOSO'], {message: "Selecione um setor"} )
})

export type VagaFormData = z.infer<typeof vagaSchema>