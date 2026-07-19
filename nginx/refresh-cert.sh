#!/usr/bin/env bash
# Baixa o certificado Let's Encrypt atual da DynaDot e recarrega o nginx.
#
# A DynaDot renova o certificado a cada ~3 meses (cerca de 1 mês antes de
# expirar). Este script busca a versão atual pelo "Permanent Download Link"
# do painel DynaDot (Free SSL → Permanent Download Link → Click to show) e
# escreve os ficheiros que o nginx serve.
#
# Uso:
#   CERT_URL="https://www.dynadot.com/.../cert" \
#   KEY_URL="https://www.dynadot.com/.../key"   \
#   ./nginx/refresh-cert.sh
#
# Depois agenda no cron do servidor (1x/semana chega, a renovação é lenta):
#   0 4 * * 1  cd /opt/atenda && CERT_URL="..." KEY_URL="..." ./nginx/refresh-cert.sh >> /var/log/atenda-cert.log 2>&1
set -euo pipefail

: "${CERT_URL:?defina CERT_URL com o Permanent Download Link do certificado}"
: "${KEY_URL:?defina KEY_URL com o Permanent Download Link da chave privada}"

SSL_DIR="$(cd "$(dirname "$0")/ssl" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -fsSL "$CERT_URL" -o "$TMP/fullchain.pem"
curl -fsSL "$KEY_URL"  -o "$TMP/privkey.pem"

# Valida que descarregou PEM real antes de substituir os ficheiros em uso.
grep -q "BEGIN CERTIFICATE"     "$TMP/fullchain.pem" || { echo "certificado inválido"; exit 1; }
grep -q "PRIVATE KEY"           "$TMP/privkey.pem"   || { echo "chave privada inválida"; exit 1; }

# Só recarrega se algo mudou.
if cmp -s "$TMP/fullchain.pem" "$SSL_DIR/fullchain.pem" 2>/dev/null \
&& cmp -s "$TMP/privkey.pem"  "$SSL_DIR/privkey.pem"  2>/dev/null; then
  echo "certificado já está atualizado — nada a fazer"
  exit 0
fi

install -m 644 "$TMP/fullchain.pem" "$SSL_DIR/fullchain.pem"
install -m 600 "$TMP/privkey.pem"  "$SSL_DIR/privkey.pem"
echo "certificado atualizado em $SSL_DIR"

# Recarrega o nginx sem downtime (se o stack estiver a correr).
if docker compose -f docker-compose.prod.yml ps nginx >/dev/null 2>&1; then
  docker compose -f docker-compose.prod.yml exec -T nginx nginx -s reload
  echo "nginx recarregado"
fi
