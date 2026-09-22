# Sistema de Estacionamento — Front End

Interface web para o [sistema de gerenciamento de estacionamento](#) (back end em Node/Express/Prisma), permitindo cadastrar e controlar setores, vagas, proprietários, veículos e o fluxo de entrada/saída (permanências) de veículos.

<!--
📸 Espaço para prints/gifs — recomendado incluir 3 a 4 imagens:
1. Listagem de Setores (Table + ativar/desativar)
2. Formulário de cadastro (ex: Vaga, com Select do setor e do tipo)
3. Tela de detalhes do Proprietário (com veículos vinculados)
4. (Opcional) Sidebar / navegação geral

![Listagem de setores](./docs/screenshot-setores.png)
![Formulário de cadastro](./docs/screenshot-form.png)
-->

## Funcionalidades

- **Setores**: listagem em tabela, cadastro em página própria, ativação/desativação
- **Vagas**: listagem (com nome do setor e tipo), cadastro vinculado a um setor (Select dinâmico), ativação/desativação
- **Proprietários**: listagem com busca por nome/CPF, cadastro com máscara de CPF e telefone, exclusão com confirmação (alerta de cascata sobre veículos vinculados)
- **Veículos**: cadastrados dentro da tela de detalhes do proprietário — sem necessidade de selecionar o proprietário manualmente, já que o contexto vem da URL
- **Feedback de ações**: toasts de sucesso/erro em todas as operações, exibindo a mensagem de erro real vinda da API quando disponível (ex: nome de setor duplicado)

## Tecnologias

- **React** + **TypeScript**
- **React Router DOM** — rotas e navegação (incluindo rotas aninhadas com layout compartilhado)
- **React Query (TanStack Query)** — cache, sincronização e invalidação de dados da API
- **React Hook Form** + **Zod** (`@hookform/resolvers`) — formulários e validação
- **Axios** — comunicação tipada com a API
- **shadcn/ui** (variante Base UI) — componentes de interface (Table, Select, Sidebar, AlertDialog, DropdownMenu, Sonner)
- **Lucide React** — ícones
- **react-number-format** — máscaras de CPF e telefone

## Estrutura do projeto

```
src/
├── types/       # Interfaces TypeScript espelhando o schema Prisma do back end
├── services/    # Comunicação com a API (Axios tipado com genéricos)
├── components/  # Componentes reutilizáveis (layout, UI)
├── pages/       # Páginas por entidade (listagem + formulário)
└── routes/      # Configuração de rotas
```

## Integração com o back end

- Camada de `services` 100% tipada com TypeScript, usando `Omit`/`Pick` dos tipos das entidades para modelar exatamente o payload esperado por cada rota
- Ativação/desativação de Setor e Vaga via `PATCH` sem corpo (a URL define o estado)
- Exclusão de Proprietário e Veículo via `DELETE` real (com aviso de cascata na interface)
- Tratamento de erros da API exibindo a mensagem retornada pelo back (`error.response.data.message`), com fallback genérico

## Status do projeto

Em desenvolvimento. Autenticação/login ainda não implementada (aguardando o back end). Próximas etapas planejadas: fluxo completo de Permanência (entrada/saída), visualização em planta 2D/3D dos setores e dashboard de ocupação.

## Rodando localmente

```bash
git clone <url-do-repositório>
cd estacionamento-frontend
npm install
npm run dev
```

> Requer o back end rodando (veja o README da [API](#)) e a URL configurada em `src/services/api.ts` (ou via `.env`, conforme o setup do projeto).

A aplicação sobe por padrão em `http://localhost:5173`.

## Licença

Este projeto está sob a licença MIT.
