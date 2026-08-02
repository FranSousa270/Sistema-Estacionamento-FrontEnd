import { api } from "./api";
import type { Permanencia } from "@/types/permanencia";

export async function getPermanencias() {
    const response = await api.get<Permanencia[]>(`/permanencias`)
    return response.data
}

export async function getPermanenciaById(id: number) {
    const response = await api.get<Permanencia>(`/permanencias/${id}`)
    return response.data
}

export async function createPermanencias(dados: Pick<Permanencia, 'vagaId' | 'veiculoId'>) {
    const response = await api.post<Permanencia>(`/permanencias`, dados)
    return response.data
}

export async function finalizarPermanencia(id: number) {
    const response = await api.patch<Permanencia>(`/permanencias/${id}/finalizar`)
    return response.data
}