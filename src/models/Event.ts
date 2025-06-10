export interface EventModel {
    id?: string; // ID opcional (gerado no backend)
    nome: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    local_id: number;
    status: 'Confirmado' | 'Agendado' | 'Cancelado' | 'Concluído'; // Status permitidos
    preco_entrada: number;
    imagem_url: string;
  }
