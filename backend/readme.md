
# SupGuard – Backend (Flask + PostgreSQL)

Este diretório contém a API backend do SupGuard, desenvolvida em **Python / Flask**, com **SQLAlchemy**, **Flask-Migrate** e **PostgreSQL** para persistência dos dados.

A API expõe endpoints REST sob o prefixo `/api`, responsáveis por:

* Cadastro e autenticação de usuários
* Registro, leitura e atualização de incidentes de segurança
* Integração com o aplicativo/mobile (frontend) do SupGuard

---

## 1. Requisitos

Antes de iniciar, garanta que você tenha instalado:

* **Python** 3.12 (ou versão compatível)
* **PostgreSQL** (servidor de banco de dados rodando localmente ou remoto)
* **pip** (gerenciador de pacotes do Python)

Opcional (mas recomendado):

* **virtualenv** ou o módulo padrão `venv` do Python para criar um ambiente virtual

---

O backend é implementado como um **módulo Flask** (`backend`) com uma fábrica de aplicação `create_app()` definida em `backend/__init__.py`.

---

## 3. Acessando a pasta do backend

Supondo que você esteja na raiz do projeto (onde está a pasta `Supguard-main`):

```bash
cd Supguard-main
```

De lá, você pode rodar os comandos apontando para o módulo `backend`, sem precisar entrar dentro da pasta.

---

## 4. Criando e ativando o ambiente virtual (venv)

> Mesmo já existindo uma pasta `.venv` no projeto, o recomendado é criar o seu próprio ambiente virtual local.

### 4.1 Criar o venv

```bash
python -m venv .venv
```

### 4.2 Ativar o venv

**Windows (PowerShell / CMD):**

```bash
.\.venv\Scripts\activate
```

**Linux / macOS (bash/zsh):**

```bash
source .venv/bin/activate
```

Após ativado, o prompt do terminal geralmente mostra algo como `(.venv)` no início da linha.

---

## 5. Instalando as dependências

Com o ambiente virtual **ativo** e na raiz do projeto (`Supguard-main`), instale as dependências do backend:

```bash
pip install -r backend/requirements.txt
```

O arquivo `requirements.txt` inclui, entre outros:

* `Flask`
* `Flask-SQLAlchemy`
* `psycopg2-binary`
* `python-dotenv`
* `Flask-Migrate`
* `Flask-Cors`

---

## 6. Configurando o PostgreSQL

1. Certifique-se de que o serviço do **PostgreSQL** está em execução.
2. Crie um banco de dados para o projeto (por exemplo, `supguard_db`).

No terminal do PostgreSQL (ou via pgAdmin):

```sql
CREATE DATABASE supguard_db;
```

Opcionalmente, você pode criar um usuário específico e dar permissões:

```sql
CREATE USER supguard_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE supguard_db TO supguard_user;
```

Anote:

* **usuário**
* **senha**
* **host** (ex: `localhost`)
* **porta** (ex: `5432`)
* **nome do banco** (ex: `supguard_db`)

Eles serão usados na `DATABASE_URL`.

---

## 7. Configurando as variáveis de ambiente (.env)

O backend utiliza `python-dotenv` e a classe `Config` em `backend/config.py`:

```python
# backend/config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

Crie um arquivo chamado **`.env`** dentro da pasta `backend/` (ou edite o existente) com o seguinte conteúdo (exemplo):

```env
DATABASE_URL=postgresql+psycopg2://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO
FLASK_ENV=development
FLASK_DEBUG=1
```

Exemplo genérico:

```env
DATABASE_URL=postgresql+psycopg2://supguard_user:minha_senha@localhost:5432/supguard_db
FLASK_ENV=development
FLASK_DEBUG=1
```

> **Importante:**
>
> * Não versionar esse arquivo `.env` (colocar no `.gitignore`).
> * Substitua `USUARIO`, `SENHA`, `HOST`, `PORTA` e `NOME_DO_BANCO` pelos seus dados reais do PostgreSQL.

---

## 8. Migrações de banco de dados (Flask-Migrate)

O projeto já está configurado com **Flask-Migrate** em `backend/__init__.py`:

```python
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    load_dotenv()
    from .config import Config

    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    ...
    return app
```

Isso permite usar os comandos `flask db` para gerenciar as migrações.

### 8.1 Aplicar migrações existentes (recomendado)

Com o venv ativado, na **raiz** do projeto (`Supguard-main`), rode:

```bash
flask --app backend.app db upgrade
```

Esse comando executa as migrações já definidas em `backend/migrations/` e cria/atualiza as tabelas no banco PostgreSQL.

### 8.2 (Opcional) Gerar novas migrações

Se você alterar os models (`models.py`, `models_incidente.py`, etc.):

```bash
flask --app backend.app db migrate -m "descrição da mudança"
flask --app backend.app db upgrade
```

---

## 9. Criando as tabelas sem migrações (alternativa)

No arquivo `backend/app.py` há um trecho:

```python
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, host="0.0.0.0", port=5000)
```

Ou seja, se você executar o backend diretamente pelo `app.py`, o comando `db.create_all()` cria as tabelas definidas nos models (sem usar migrações Alembic).

Essa abordagem é útil em ambiente de desenvolvimento inicial, mas o fluxo recomendado é utilizar as migrações (`flask db ...`).

---

## 10. Executando o servidor backend

Com tudo configurado (venv ativo, `.env` ajustado e banco preparado), existem duas formas principais de subir o servidor.

### Opção 1 – Via Python diretamente

A partir da **raiz do projeto** (`Supguard-main`):

```bash
python backend/app.py
```

O servidor Flask será iniciado no host `0.0.0.0` e porta `5000`:

* URL base: `http://localhost:5000`
* Endpoints da API: começam em `http://localhost:5000/api/...`

### Opção 2 – Via comando `flask run`

Ainda a partir da raiz (`Supguard-main`):

```bash
flask --app backend.app run -h 0.0.0.0 -p 5000
```

---

## 11. CORS e consumo pela aplicação mobile/frontend

O CORS já está habilitado para os endpoints `/api/*` em `backend/__init__.py`:

```python
from flask_cors import CORS

CORS(app, resources={r"/api/*": {"origins": "*"}})
```

Isso permite que o frontend (aplicativo SupGuard ou outra interface web) consuma a API do backend sem problemas de CORS, especialmente em ambiente de desenvolvimento.

---

## 12. Resumo rápido (passo a passo)

1. Entrar na raiz do projeto:

   ```bash
   cd Supguard-main
   ```

2. Criar e ativar o ambiente virtual:

   ```bash
   python -m venv .venv
   # Windows:
   .\.venv\Scripts\activate
   # Linux/macOS:
   source .venv/bin/activate
   ```

3. Instalar dependências do backend:

   ```bash
   pip install -r backend/requirements.txt
   ```

4. Configurar o banco PostgreSQL:

   * Criar banco `supguard_db` (ou outro nome)
   * Definir usuário e senha

5. Criar/editar `backend/.env` com:

   ```env
   DATABASE_URL=postgresql+psycopg2://USUARIO:SENHA@localhost:5432/supguard_db
   FLASK_ENV=development
   FLASK_DEBUG=1
   ```

6. Aplicar migrações (opcional, mas recomendado):

   ```bash
   flask --app backend.app db upgrade
   ```

7. Subir o servidor:

   ```bash
   python backend/app.py
   # ou
   flask --app backend.app run -h 0.0.0.0 -p 5000
   ```

Depois disso, o backend do SupGuard estará disponível para ser consumido pelo frontend/mobile.

---

Se quiser, na próxima mensagem eu posso **enxugar** esse texto para uma versão mais curta, própria para TCC, ou fazer uma versão em inglês também.
