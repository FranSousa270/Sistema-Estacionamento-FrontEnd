import { api } from "./api";
import type { Veiculo } from "@/types/veiculo";

export async function getVeiculos() {
    const response = await api.get<Veiculo[]>(`/veiculos`)
    return response.data
}

export async function getVeiculoById(id: number) {
    const response = await api.get<Veiculo>(`/veiculos/${id}`)
    return response.data
}

export async function createVeiculo(dados: Omit<Veiculo, 'id'>) {
    const response = await api.post<Veiculo>(`/veiculos`, dados)
    return response.data
}

export async function updateVeiculo(id:number, dados: Omit<Veiculo, 'id' | 'proprietarioId'>) {
    const response = await api.put<Veiculo>(`/veiculos/${id}`, dados)
    return response.data
}

export async function deleteVeiculo(id:number) {
    await api.delete<Veiculo>(`/veiculos/${id}`)
}
