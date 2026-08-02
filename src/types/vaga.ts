export interface Vaga {
    id: number;
    numero: string;
    ativa: boolean;
    setorId: number;
    tipo: TipoVaga;
    
}

export type TipoVaga = 'MOTO' | 'CARRO' | 'PCD' | 'IDOSO';