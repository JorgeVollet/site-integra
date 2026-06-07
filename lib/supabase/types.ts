// Tipos do banco (espelham o schema criado em supabase-setup.sql)

export type StatusSolicitacao = "novo" | "em_andamento" | "atendido";

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  ordem: number;
  criado_em: string;
}

export interface Marca {
  id: string;
  nome: string;
  slug: string;
  descricao: string | null; // subtítulo curto (card)
  chamada: string | null;   // texto de apresentação (página da marca)
  logo: string | null;
  ordem: number;
  ativo: boolean;
  criado_em: string;
}

export interface Maquina {
  id: string;
  nome: string;
  slug: string;
  categoria_id: string | null;
  marca_id: string | null;
  resumo: string | null;
  descricao: string | null;
  especificacoes: { rotulo: string; valor: string }[];
  fotos: string[];
  pdf_url: string | null;
  destaque: boolean;
  ordem: number;
  ativo: boolean;
  criado_em: string;
}

export interface Solicitacao {
  id: string;
  nome: string;
  telefone: string;
  email: string | null;
  empresa: string | null;
  mensagem: string | null;
  maquina_id: string | null;
  status: StatusSolicitacao;
  notas: string | null;
  favorito: boolean;
  criado_em: string;
}

export interface Depoimento {
  id: string;
  nome: string;
  empresa: string | null;
  cidade: string | null;
  texto: string;
  foto: string | null;
  ativo: boolean;
  ordem: number;
  criado_em: string;
}

export interface ItemGaleria {
  id: string;
  tipo: "foto" | "video";
  url: string;
  poster: string | null;
  titulo: string | null;
  ordem: number;
  ativo: boolean;
  criado_em: string;
}

export interface Lead {
  id: string;
  nome: string;
  empresa: string | null;
  nicho: string | null;
  telefone: string;
  email: string | null;
  cidade: string | null;
  estado: string | null;
  origem: string | null;
  status: StatusSolicitacao;
  notas: string | null;
  favorito: boolean;
  criado_em: string;
}

// Payload do formulário público (sem campos gerados pelo banco)
export interface NovaSolicitacao {
  nome: string;
  telefone: string;
  email?: string;
  empresa?: string;
  mensagem?: string;
  maquina_id?: string;
}
