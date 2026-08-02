import { api } from "./api";
import type { Proprietario } from "@/types/proprietario";

export async function getProprietarios() {
  const response = await api.get<Proprietario[]>(`/proprietarios`);
  return response.data;
}

export async function getProprietarioById(id: number) {
  const response = await api.get<Proprietario>(`/proprietarios/${id}`);
  return response.data;
}

export async function createProprietario(dados: Omit<Proprietario, "id">) {
  const response = await api.post<Proprietario>(`/proprietarios`, dados);
  return response.data;
}

export async function updateProprietario( id: number,dados: Omit<Proprietario, "id">,) {
  const response = await api.put<Proprietario>(`/proprietarios/${id}`, dados);
  return response.data;
}

export async function deleteProprietario(id: number) {
  await api.delete<Proprietario>(`/proprietarios/${id}`);
}
