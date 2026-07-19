# Atenda — Landing (Next.js 14)

Landing de validação do mercado: rececionista/funcionária de IA omnicanal
(Instagram, WhatsApp, SMS, Viber, chamadas) para negócios em Portugal.

## Stack
- Next.js 14 (App Router, página estática → SEO máximo)
- lucide-react (ícones, sem emoji)
- MongoDB (leads) via API route `/api/lead`
- Meta Pixel opcional (evento `Lead` no envio do formulário)

## Correr localmente
```bash
npm install
cp .env.example .env.local   # preencher MONGODB_URI
npm run dev                   # http://localhost:3000
```

## Base de dados (MongoDB Atlas — grátis)
1. https://www.mongodb.com/atlas → criar cluster M0 (região `eu-west`)
2. Database Access → criar utilizador com password
3. Network Access → permitir `0.0.0.0/0` (Vercel usa IPs dinâmicos)
4. Connect → Drivers → copiar a connection string para `MONGODB_URI`
5. A coleção `leads` na base `atenda` é criada automaticamente no 1.º insert

Campos guardados: name, business, phone, email, booking_system, about,
utm, user_agent, source, created_at. Honeypot anti-spam incluído.

Ver leads: Atlas → Browse Collections → atenda.leads
(ordenar por `created_at` desc).

## Deploy (Vercel)
1. Push do repositório para GitHub
2. https://vercel.com → New Project → importar o repo
3. Environment Variables: `MONGODB_URI`, `MONGODB_DB=atenda`,
   `NEXT_PUBLIC_SITE_URL=https://<domínio>`, `NEXT_PUBLIC_META_PIXEL_ID` (opcional)
4. Deploy. Ligar o domínio (atenda.pt) em Settings → Domains.

## Docker

### Dev — só o MongoDB
```bash
docker compose -f docker-compose.dev.yml up -d
```
Sobe o MongoDB em `localhost:27017` (user/pass `atenda`/`atenda` por
omissão, configurável via env). Corre a app localmente com `npm run dev`
apontando `MONGODB_URI` para
`mongodb://atenda:atenda@localhost:27017/atenda?authSource=admin`.

### Prod — app + MongoDB + nginx
1. `cp .env.prod.example .env.prod` e preencher (passwords, `MONGODB_URI`,
   `NEXT_PUBLIC_SITE_URL`, domínio)
2. Colocar o certificado (ver secção SSL abaixo) em `nginx/ssl/`
3. Subir:
   ```bash
   docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
   ```
4. A app fica atrás do nginx (80 → redireciona para 443, TLS terminado no
   nginx, proxy para o container `app` na porta 3000).

### SSL — certificado Let's Encrypt da DynaDot
A DynaDot emite e **renova automaticamente** um certificado Let's Encrypt
(válido 3 meses) enquanto usarmos os name servers deles. Os ficheiros são
descarregados e servidos pelo nosso nginx.

**Instalação inicial** (painel DynaDot → domínio → Free SSL):
- `Download Certificate` → guardar como `nginx/ssl/fullchain.pem`
- Private Key `Download File` → guardar como `nginx/ssl/privkey.pem`
- `docker compose -f docker-compose.prod.yml exec nginx nginx -s reload`

**Renovação automática** (o cert muda a cada ~3 meses): no painel, em
`Permanent Download Link → Click to show`, copiar os URLs permanentes e
agendar o refresh no cron do servidor:
```bash
0 4 * * 1  cd /opt/atenda && CERT_URL="<link-cert>" KEY_URL="<link-key>" \
           ./nginx/refresh-cert.sh >> /var/log/atenda-cert.log 2>&1
```
O `refresh-cert.sh` só substitui os ficheiros e recarrega o nginx quando o
certificado realmente mudou.

## SEO incluído
- Metadata API: title/description com keywords de tarefa, canonical, OG
- JSON-LD: `SoftwareApplication` + `FAQPage` (rich snippets)
- `robots.txt` e `sitemap.xml` gerados
- Página 100% estática (SSG), Inter via `next/font` (zero layout shift)
- HTML semântico: um `h1`, secções com `h2`, FAQ em `<details>`

## Antes de publicar
- ⚠️ Substituir os testemunhos placeholder em `app/page.tsx` (secção `#srev`,
  marcados `[Nome · piloto]`) por citações reais do piloto — testemunhos
  inventados violam a lei da UE e as políticas de anúncios da Meta.
- Preencher `NEXT_PUBLIC_META_PIXEL_ID` antes de lançar campanhas.
