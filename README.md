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

## (English Version)

# Parking Management System — Front End

Web interface for the [parking management system](#) (back end built with Node.js, Express, and Prisma), allowing users to register and manage sectors, parking spaces, owners, vehicles, and vehicle entry/exit processes (parking sessions).

<!--
📸 Space for screenshots/GIFs — recommended to include 3 to 4 images:
1. Sector listing (table + activate/deactivate)
2. Registration form (e.g., parking space, with sector and type selection)
3. Owner details page (with associated vehicles)
4. (Optional) Sidebar / general navigation

![Sector listing](./docs/screenshot-setores.png)
![Registration form](./docs/screenshot-form.png)
-->

## Features

- **Sectors**: Table listing, dedicated registration page, activation/deactivation.
- **Parking Spaces**: Listing with sector names and space types, registration linked to a sector through a dynamic Select component, activation/deactivation.
- **Owners**: Listing with search by name/CPF, registration with CPF and phone number input masks, and deletion with confirmation (including a cascading deletion warning for associated vehicles).
- **Vehicles**: Registered directly from the owner's details page, eliminating the need to manually select an owner since the context is derived from the URL.
- **Action Feedback**: Success and error toast notifications for all operations, displaying the actual error message returned by the API when available (e.g., duplicate sector name).

## Technologies

- **React** + **TypeScript**
- **React Router DOM** — Routing and navigation, including nested routes with a shared layout.
- **React Query (TanStack Query)** — Caching, synchronization, and API data invalidation.
- **React Hook Form** + **Zod** (`@hookform/resolvers`) — Form handling and validation.
- **Axios** — Type-safe API communication.
- **shadcn/ui** (Base UI variant) — UI components (Table, Select, Sidebar, AlertDialog, DropdownMenu, Sonner).
- **Lucide React** — Icons.
- **react-number-format** — CPF and phone number input masks.

## Project Structure

```text
src/
├── types/       # TypeScript interfaces mirroring the back-end Prisma schema
├── services/    # API communication (Axios with generics and TypeScript typing)
├── components/  # Reusable components (layout and UI)
├── pages/       # Entity pages (listings and forms)
└── routes/      # Route configuration
```

## Back-End Integration

- Fully typed `services` layer using TypeScript, with `Omit` and `Pick` applied to entity types to model the exact payload expected by each endpoint.
- Sector and parking space activation/deactivation through `PATCH` requests without a request body (the URL determines the state).
- Owner and vehicle deletion through actual `DELETE` requests, with cascading deletion warnings in the interface.
- API error handling that displays the message returned by the back end (`error.response.data.message`), with a generic fallback when no specific message is available.

## Project Status

Currently in development. Authentication and login have not yet been implemented, pending back-end support.

Planned next steps include the complete parking session workflow (vehicle entry and exit), 2D/3D sector layout visualization, and an occupancy dashboard.

## Running Locally

```bash
git clone <repository-url>
cd estacionamento-frontend
npm install
npm run dev
```

> Requires the back end to be running (see the [API README](#)) and the API URL to be configured in `src/services/api.ts` or through a `.env` file, depending on the project setup.

The application runs by default at `http://localhost:5173`.

## License

This project is licensed under the MIT License.
