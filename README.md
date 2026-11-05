# Projeto Velto - FIAP

Aplicação Full-Stack de gestão financeira desenvolvida para a FIAP, integrando Spring Boot (Java 26), ReactJS com Vite e banco de dados Oracle database.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 26** & **Spring Boot 4.1.2**
- **Spring Data JPA** & **Hibernate**
- **Oracle Database** (Schema `RM571760`)
- **Lombok**
- **HikariCP**

### Frontend
- **ReactJS** (Vite)
- **Axios** (Integração HTTP)
- **JavaScript (ES6+)**

---

## 🗄️ Mapeamento de Entidades e Banco de Dados Oracle

| Entidade Java | Tabela Oracle | Chave Primária | Sequência Oracle |
| :--- | :--- | :--- | :--- |
| `Usuario` | `T_VELTO_USUARIO` | `id_usuario` | `SQ_VELTO_USUARIO` |
| `Despesa` | `T_VELTO_DESPESA` | `id_despesa` | `SQ_VELTO_DESPESA` |
| `Investimento` | `T_VELTO_INVESTIMENTO` | `id_investimento` | `SQ_VELTO_INVESTIMENTO` |

---

## 🔗 Endpoints da API (REST)

### Usuários (`/usuarios`)
- `GET /usuarios` - Lista todos os usuários.
- `POST /usuarios` - Cadastra um novo usuário.
- `DELETE /usuarios/{id}` - Remove um usuário.

### Despesas (`/despesas`)
- `GET /despesas` - Lista todas as despesas com o usuário responsável.
- `POST /despesas` - Cadastra despesa (trata separadores de milhar e decimais).
- `DELETE /despesas/{id}` - Remove uma despesa.

### Investimentos (`/investimentos`)
- `GET /investimentos` - Lista todos os investimentos com o investidor.
- `POST /investimentos` - Cadastra investimento (`vl_aplicado`, `ds_tipo_investimento`).
- `DELETE /investimentos/{id}` - Remove um investimento.

---

## 🛠️ Como Executar o Projeto

### 1. Backend (Spring Boot)
1. Certifique-se de ter o JDK 26 configurado.
2. No IntelliJ IDEA, execute a classe `VeltoApplication.java`.
3. O servidor estará ativo em `http://localhost:8080`.

### 2. Frontend (ReactJS)
1. Abra o terminal na pasta do projeto React.
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Acesse no navegador: `http://localhost:5173/`

---

## 👥 Funcionalidades Validadas
- [x] CRUD completo de Usuários, Despesas e Investimentos.
- [x] Tratamento de entrada numéricas monetárias PT-BR (suporte a pontos de milhar e vírgula decimal).
- [x] Resumo em tempo real no Dashboard com formatação `R$`.
- [x] Confirmação prévia para exclusão de registros.