![Logo](/public/logo.png)

# FSW Barbershop

### Stack utilizada

![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Instalação

**1. Pré requisitos**

- [NodeJS](https://nodejs.org/en/download/package-manager)
- [pnpm](https://pnpm.io/pt/installation)

**2. Clone o projeto**

```bash
  git clone https://github.com/KaianDev/fsw-barbershop.git
```

**3. Entre no diretório do projeto**

```bash
  cd fsw-barbershop
```

**4. Configure o banco de dados (PostgreSQL)**

**5. Renomeie o arquivo .env.example para .env**

**6. Defina a variável de AUTH_SECRET rodando o comando abaixo**

```bash
  openssl rand -base64 33
```

**7. Defina as variáveis de ambiente no arquivo .env**

- DATABASE_URL="postgres://username:password@host:port/mydb"
- AUTH_GOOGLE_ID=""
- AUTH_GOOGLE_SECRET=""
- AUTH_SECRET="secret de autenticação"

Copie o resultado gerado e no arquivo .env defina o valor para a variável de ambiente AUTH_SECRET

_Caso deseje adicionar a autenticação com o google a acesse a página Google Developer Console (https://console.cloud.google.com) e gere as variáveis e cole no arquivo .env_

**8. Instale as dependências**

```bash
  pnpm i
```

**9. Rode o comando prisma db push**
Esse comando irá criar o banco de dados e as tabelas necessárias para a aplicação funcionar.

```bash
  npx prisma db push
```

**10. Rode o comando de Seed** <br/>
Esse comando irá criar o usuário ADMIN, guarde as credenciais para fazer o login com esse usuário posteriormente.

```bash
  npx prisma db seed
```

**11. Inicie a aplicação em ambiente de DEV**

```bash
  pnpm dev
```

### Deploy

Para fazer o deploy desse projeto rode

```bash
  pnpm build
  pnpm start
```

### Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/kaiandev">
        <img src="https://avatars.githubusercontent.com/u/123319433?v=4" width="100px;" alt="Kaian Vasconcelos"/><br>
        <sub>
          <b>Kaian Vasconcelos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
