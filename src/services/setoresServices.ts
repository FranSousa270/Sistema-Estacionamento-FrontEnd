import { api } from "./api"; 
import type { Setor }  from "@/types/setor";

export async function getSetores(){
    const response = await api.get<Setor[]>('/setores');
    return response.data;
}

export async function getSetorById(id: number) {
  const response = await api.get<Setor>(`/setores/${id}`);
  return response.data;
}

export async function createSetor(dados: Omit<Setor, 'id'>) {
  const response = await api.post<Setor>('/setores', dados)
  return response.data
}

export async function updateSetor(id:number, dados: Pick<Setor, 'nome'>) {
    const response = await api.put<Setor>(`/setores/${id}`, dados)
    return response.data
}

export async function desativarSetor(id:number) {
    const response = await api.patch<Setor>(`/setores/${id}/desativar`)
    return response.data
}

export async function ativarSetor(id:number) {
    const response = await api.patch<Setor>(`/setores/${id}/ativar`)
    return response.data
}