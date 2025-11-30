#!/usr/bin/env bash
# Usage:
#   ./cors_test.sh "https://arihant-coaching.onrender.com/api/admin/users" "https://arihant-coaching.vercel.app"
URL="${1:-https://arihant-coaching.onrender.com/api/admin/users}"
ORIGIN="${2:-https://arihant-coaching.vercel.app}"

echo "== CORS Preflight OPTIONS -> $URL"
curl -i -X OPTIONS "$URL" \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization"

echo ""
echo "== CORS GET -> $URL"
curl -i -X GET "$URL" -H "Origin: $ORIGIN" -H "Accept: application/json"
