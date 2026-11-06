# LipaBill

Marketing site for **LipaBill** — an Offline-First Transaction Wallet.

Public URL (production): [https://lipabill.app](https://lipabill.app)

`lipabill.mboya.dev` permanently redirects to `lipabill.app` (Caddy 301 only — the Kamal app is retired from the home Mac).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Product screenshots live in `public/screenshots/` — promo stills from
`lipa_bill/promo/out/promo/takeScreenshot/` (Maestro demo ledger). Root
`screenshots/` is a source dump only.

### Pay links (`/p/{token}`)

`src/app/p/[token]` is a React landing with **Open Graph / Twitter** tags and the
same UX as before (copy → M-Pesa → LipaBill). Decode parity with Android stays in
`public/p/paylink.js` (used by `paylink-parse.ts` + `npm run verify:paylink`).
Cleartext `http://` pay URLs are rejected; only `https://` and `lipabill://`.

### Social share links (`/s/{platform}/{handle}`)

Request → Socials QRs share `https://lipabill.app/s/…` so chats get a LipaBill
card; the landing continues to Instagram / WhatsApp / etc.

`public/.well-known/assetlinks.json` lists the Play release + debug certs for
App Links (`https://lipabill.app/p/`). Golden decode vectors live in
`scripts/paylink/fixtures.json` (not publicly served).

```bash
npm run verify:paylink
```

## Docker

```bash
docker build -t lipabill .
docker run --rm -p 3000:3000 lipabill
```

## Domains

- **Canonical:** `https://lipabill.app` (Vercel / primary marketing host)
- **Legacy:** `lipabill.mboya.dev` → 301 → `lipabill.app` via Caddy on the deploy host (no app container)

### Early access form

The homepage form POSTs to `/api/notify`, which writes the email to a Google Sheet via Apps Script (`scripts/google-sheet-notify.gs`). The browser never talks to the sheet; the Next.js route does.

Set this on the Vercel project (**Settings → Environment Variables**) for **Production** and **Preview**:

```
GOOGLE_SHEETS_WEBHOOK_URL
```

Value: the Apps Script web app `/exec` URL (same as in `.env.local`). Redeploy after adding it. Without the var, signup returns `503 Signup isn't available yet.`

Apps Script deploy settings stay: **Execute as: Me**, **Who has access: Anyone**. No origin allowlist — the domain cutover does not require a script change.

### Home Mac status (retired app)

- No `lipabill` Docker containers; Kamal `servers.web.hosts` is empty so deploy won’t recreate them.
- Only a Caddy `redir` remains for the legacy hostname.
- Repair redirect (Home-MAC WireGuard → `mizu@10.7.0.1`):

```bash
./scripts/fix-lipabill-redirect.sh
```

Edge alternative: Cloudflare → `mboya.dev` → Redirect Rules →  
`lipabill.mboya.dev/*` → `https://lipabill.app/${1}` (301).
