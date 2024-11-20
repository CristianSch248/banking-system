
<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# Projeto de Exemplo com NestJS

Este é um projeto de exemplo utilizando o framework [NestJS](https://github.com/nestjs/nest) integrado a uma API JSON simulada com `json-server`, ideal para desenvolvimento e aprendizado.

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de que possui as seguintes ferramentas instaladas:

- **Node.js** (versão LTS ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Nest CLI** (opcional, mas recomendado):
  ```bash
  npm install -g @nestjs/cli
  ```
- **json-server** (simulação de API):
  ```bash
  npm install -g json-server
  ```

---

## 🚀 Instalação

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/CristianSch248/banking-system.git
   cd banking-system
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o arquivo `db.json`** na raiz do projeto. Exemplo de conteúdo:
   ```json
   {
     "usuarios": [
       {
         "id": "b0ab",
         "username": "cris due",
         "password": "123456",
         "balance": 1000,
         "depositos": [],
         "compras": []
       }
     ],
     "depositosPendentes": []
   }
   ```

---

## ▶️ Executando o Projeto

1. Inicie o servidor NestJS:
   ```bash
   npm run start
   ```

2. O comando acima também inicia o `json-server` na porta **3001**. Caso precise iniciar manualmente:
   ```bash
   json-server --watch db.json --port 3001
   ```

3. Endpoints disponíveis com o exemplo `db.json`:
   - **Usuários**: [http://localhost:3001/usuarios](http://localhost:3001/usuarios)
   - **Depósitos Pendentes**: [http://localhost:3001/depositosPendentes](http://localhost:3001/depositosPendentes)

---

## 📚 Recursos Adicionais

- [Documentação do NestJS](https://nestjs.com/docs)
- [Canal no Discord do NestJS](https://discord.com/invite/nestjs)
- [Cursos Oficiais do NestJS](https://nestjs.com/courses)
- [Devtools NestJS](https://nestjs.com/devtools)
- [Jobs Board Oficial](https://nestjs.com/jobs)

---

