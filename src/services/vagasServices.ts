import { api } from "./api";
import type { Vaga } from "@/types/vaga";


export async function getVagas() {
  const response = await api.get<Vaga[]>(`/vagas`);
  return response.data;
}

export async function getVagaById(id: number) {
  const response = await api.get<Vaga>(`/vagas/${id}`);
  return response.data;
}

export async function createVaga(dados: Omit<Vaga, 'id' | 'ativa'>) {
    const response = await api.post<Vaga>(`/vagas`, dados)
    return response.data
}

export async function updateVaga(id:number, dados: Pick<Vaga, 'tipo' | 'numero'>) {
    const response = await api.put<Vaga>(`/vagas/${id}`, dados)
    return response.data
}

export async function desativarVaga(id:number) {
    const response = await api.patch<Vaga>(`/vagas/${id}/desativar`)
    return response.data
}

export async function ativarVaga(id:number) {
    const response = await api.patch<Vaga>(`/vagas/${id}/ativar`)
    return response.data
}

