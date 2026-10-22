#!/usr/bin/env bash
# Repair lipabill.mboya.dev → lipabill.app on the deploy host when the
# redirect site block is missing or lost inside a shared host list.
#
# Usage (from lipabill_web):
#   ./scripts/fix-lipabill-redirect.sh
#
# Requires SSH: mizu@10.7.0.1 (Home-MAC WireGuard).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${LIPABILL_SSH_HOST:-mizu@10.7.0.1}"
CADDY_MAIN="${LIPABILL_CADDYFILE:-/Users/mizu/server/Caddyfile}"

ssh_opts=(-o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=5)

echo "==> Checking SSH $HOST"
ssh "${ssh_opts[@]}" "$HOST" 'echo ok; hostname; uptime'

echo "==> Rewriting lipabill site block in $CADDY_MAIN"
ssh "${ssh_opts[@]}" "$HOST" \
  env CADDY_MAIN="$CADDY_MAIN" \
  bash -s <<'EOF'
set -euo pipefail
MAIN="$CADDY_MAIN"
if [[ ! -f "$MAIN" ]]; then
  echo "Missing $MAIN" >&2
  exit 1
fi
cp "$MAIN" "$MAIN.bak.fix.$(date +%Y%m%d%H%M%S)"

python3 - <<'PY'
from pathlib import Path
import os, re

main = Path(os.environ["CADDY_MAIN"])
text = main.read_text()

# 1) Drop any dedicated lipabill site block (http/https/bare).
text = re.sub(
    r"(?ms)^(?:https?://)?lipabill\.mboya\.dev\s*\{.*?^\}\s*",
    "",
    text,
)

# 2) Strip lipabill from comma-separated site address lists, e.g.
#    http://mbulu.mboya.dev, http://lipabill.mboya.dev {
text = re.sub(
    r",\s*(?:https?://)?lipabill\.mboya\.dev\b",
    "",
    text,
)
text = re.sub(
    r"(?:https?://)?lipabill\.mboya\.dev\s*,\s*",
    "",
    text,
)

snip = (
    "# Permanent redirect: lipabill.mboya.dev → lipabill.app\n"
    "http://lipabill.mboya.dev {\n"
    "\tredir https://lipabill.app{uri} permanent\n"
    "}\n"
)
main.write_text(text.rstrip() + "\n\n" + snip)
print("Caddyfile rewritten")
print("--- lipabill excerpt ---")
for i, line in enumerate(main.read_text().splitlines(), 1):
    if "lipabill" in line.lower():
        print(f"{i}:{line}")
PY

# Cloudflare tunnel (home_mac) hits docker Caddy on 127.0.0.1:8080, not brew :80.
if ! docker ps --format '{{.Names}}' | grep -qx 'server-caddy-1'; then
  echo "server-caddy-1 not running" >&2
  exit 1
fi
docker exec server-caddy-1 caddy validate --config /etc/caddy/Caddyfile
docker exec server-caddy-1 caddy reload --config /etc/caddy/Caddyfile
echo "Docker Caddy reloaded"

echo "==> Local Host-header check (tunnel origin :8080)"
curl -sI -H "Host: lipabill.mboya.dev" http://127.0.0.1:8080/privacy | head -15
EOF

echo "==> Public check"
sleep 2
code=$(curl -sI -o /tmp/lipabill-redir.hdr -w '%{http_code}' https://lipabill.mboya.dev/privacy || true)
loc=$(grep -i '^location:' /tmp/lipabill-redir.hdr | head -1 || true)
echo "HTTP $code  $loc"
if [[ "$code" != "301" && "$code" != "308" ]]; then
  echo "Still not redirecting (got $code). Inspect $CADDY_MAIN on the host." >&2
  exit 1
fi
echo "OK — lipabill.mboya.dev redirects to lipabill.app"
