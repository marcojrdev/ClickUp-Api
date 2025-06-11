# API de Integração ClickUp

## 📝 Descrição do Projeto

Este projeto é uma **API (Application Programming Interface)** desenvolvida em **Node.js** com **Express.js**. O objetivo principal é permitir a **consulta, criação e sincronização de tarefas** entre o ClickUp e um armazenamento interno simulado (em memória, para este projeto de teste), seguindo regras de negócio de um cenário de backlog para suporte a uma plataforma web.

---

## 🚀 Funcionalidades

- **Sincronização de Tarefas**
  - Busca tarefas de uma lista específica no ClickUp.
  - Armazena localmente com: `id`, `título`, `descrição`, `status`, `data de início` e `data de vencimento`.
  - Atualiza se já existe internamente; adiciona se for nova.

- **Criação de Tarefas**
  - Cria nova tarefa diretamente no ClickUp.
  - `Título` obrigatório; os demais campos são opcionais.

- **Exclusão Interna**
  - Exclui tarefa apenas do armazenamento interno (não afeta o ClickUp).

- **Tratamento de Erros**
  - Erros tratados com mensagens claras (ex: indisponibilidade da API, dados inválidos).

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** JavaScript  
- **Runtime:** Node.js (v18.x ou superior)  
- **Framework Web:** Express.js  
- **HTTP Client:** Axios  
- **Variáveis de Ambiente:** Dotenv  
- **Módulos:** ES Modules (ESM)

---

## ✅ Pré-requisitos

- **Node.js** (v18 ou superior)
- Conta gratuita no [ClickUp](https://app.clickup.com/)
- Uma **lista de tarefas criada** no ClickUp
- **Token de API pessoal** (em: *Settings > Apps > API Token*)
- **ID da Lista** (copie da URL da lista: após `/list/`)

---

## ⚙️ Configuração e Instalação

1. **Clone o repositório:**

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd clickup-api-integration
```
2. **Instale as dependências::**

 ```bash
npm install
```
3. **Crie o arquivo .env na raiz do projeto:**
   
  ```bash
  CLICKUP_API_KEY=SUA_API_KEY_DO_CLICKUP
  CLICKUP_LIST_ID=SEU_ID_DA_LISTA_DO_CLICKUP
 PORT=3000
   ```
 Importante: Substitua pelos seus dados reais.

 ## ▶️ Como Rodar o Projeto
 ```bash
npm start
# ou
npm run dev
```

## 📍 Rotas da API
- **Base URL: http://localhost:3000/api**

1. **🔄 Sincronizar tarefas com ClickUp**
- GET /tasks/sync
```
GET http://localhost:3000/api/tasks/sync
```
Resposta (200 OK):
```
{
  "message": "Tarefas sincronizadas com sucesso!",
  "tasks": [
    {
      "id": "...",
      "title": "...",
      "description": "...",
      "status": "...",
      "startDate": "...",
      "dueDate": "..."
    }
  ]
}

```
2. **📋 Listar tarefas armazenadas internamente**
- GET /tasks
```
GET http://localhost:3000/api/tasks
```

3. **🆕 Criar nova tarefa no ClickUp**
- POST /tasks
- Content-Type: application/json

  ```
  {
  "title": "Título obrigatório",
  "description": "Opcional",
  "status": "To Do",
  "startDate": "2025-07-01T09:00:00Z",
  "dueDate": "2025-07-15T18:00:00Z"
  }
  ```

4. **❌ Excluir tarefa do armazenamento interno**
- DELETE /tasks/:id

  ```
   DELETE http://localhost:3000/api/tasks/ID_DA_TAREFA
  ```

 ## 💬 Exemplos de Erro
- ClickUp offline (500):

  ```
  { "message": "Não foi possível conectar ao ClickUp para buscar tarefas." }

  ```
  - Requisição inválida (400):
 
    ```
    { "message": "O título da tarefa é obrigatório." }
  ```
- Tarefa não encontrada (404):

  ```
  { "message": "Tarefa não encontrada no armazenamento interno para exclusão." }

  ```

