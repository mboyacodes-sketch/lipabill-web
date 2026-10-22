#!/usr/bin/env bash
# Stop the Kamal LipaBill app on the home Mac and leave only a Caddy 301
# from lipabill.mboya.dev → lipabill.app.
#
# Usage (from lipabill_web):
#   ./scripts/retire-mboya-dev-host.sh
#
# Requires SSH: mizu@10.7.0.1 (Home-MAC WireGuard).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${LIPABILL_SSH_HOST:-mizu@10.7.0.1}"
CADDY_MAIN="${LIPABILL_CADDYFILE:-/Users/mizu/server/Caddyfile}"
SNIPPET="$ROOT/config/Caddyfile.lipabill"

ssh_opts=(-o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=5)

echo "==> Checking SSH $HOST"
if ! ssh "${ssh_opts[@]}" "$HOST" 'echo ok; hostname; uptime'; then
  echo "Cannot reach $HOST. Connect Home-MAC WireGuard and wake the MacBook Pro, then retry." >&2
  exit 1
fi

echo "==> Installing Caddy redirect into $CADDY_MAIN"
scp "${ssh_opts[@]}" "$SNIPPET" "$HOST:/tmp/Caddyfile.lipabill"

ssh "${ssh_opts[@]}" "$HOST" \
  env CADDY_MAIN="$CADDY_MAIN" \
  bash -s <<'EOF'
set -euo pipefail
MAIN="$CADDY_MAIN"
if [[ ! -f "$MAIN" ]]; then
  echo "Missing $MAIN" >&2
  exit 1
fi
cp "$MAIN" "$MAIN.bak.$(date +%Y%m%d%H%M%S)"

python3 - <<'PY'
from pathlib import Path
import os, re
main = Path(os.environ["CADDY_MAIN"])
text = main.read_text()
pattern = re.compile(
    r"(?ms)^(?:https?://)?lipabill\.mboya\.dev\s*\{.*?^\}\s*",
)
cleaned = pattern.sub("", text).rstrip() + "\n\n"
snip = Path("/tmp/Caddyfile.lipabill").read_text().rstrip() + "\n"
main.write_text(cleaned + snip)
print("Caddyfile updated")
PY

# Tunnel traffic hits docker Caddy (server-caddy-1 → 127.0.0.1:8080).
if ! docker ps --format '{{.Names}}' | grep -qx 'server-caddy-1'; then
  echo "server-caddy-1 not running; reload $MAIN manually" >&2
  exit 1
fi
docker exec server-caddy-1 caddy validate --config /etc/caddy/Caddyfile
docker exec server-caddy-1 caddy reload --config /etc/caddy/Caddyfile
echo "Docker Caddy reloaded"
EOF

echo "==> Stopping Kamal lipabill app (keep shared kamal-proxy for mbulu)"
cd "$ROOT"
if command -v kamal >/dev/null 2>&1; then
  kamal app stop || true
  kamal app remove || true
else
  ssh "${ssh_opts[@]}" "$HOST" bash -s <<'EOF'
set -euo pipefail
names=$(docker ps -a --format '{{.Names}}' | grep -E '^lipabill' || true)
if [[ -n "$names" ]]; then
  echo "$names" | xargs docker stop
  echo "$names" | xargs docker rm
fi
EOF
fi

echo "==> Verifying redirect"
sleep 2
code=$(curl -sI -o /tmp/lipabill-redir.hdr -w '%{http_code}' https://lipabill.mboya.dev/privacy || true)
loc=$(grep -i '^location:' /tmp/lipabill-redir.hdr | head -1 || true)
echo "HTTP $code  $loc"
if [[ "$code" != "301" && "$code" != "308" ]]; then
  echo "Redirect not live (HTTP $code). Running fix-lipabill-redirect.sh…" >&2
  "$ROOT/scripts/fix-lipabill-redirect.sh"
fi

echo "Done. https://lipabill.app is canonical; lipabill.mboya.dev only redirects."
