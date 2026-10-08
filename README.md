# LipaBill

Marketing site for **LipaBill** — an Offline-First Transaction Wallet.

Public URL (production): [https://lipabill.mboya.dev](https://lipabill.mboya.dev)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Product screenshots live in `public/screenshots/` (source dump also in `screenshots/`).

## Docker

```bash
docker build -t lipabill .
docker run --rm -p 3000:3000 lipabill
```

## Deploy (Kamal → lipabill.mboya.dev)

Same pattern as `mbulu.mboya.dev`: Kamal builds/pushes the image, `kamal-proxy` listens on localhost, Caddy terminates TLS for the subdomain.

1. Copy secrets:

   ```bash
   cp .kamal/secrets.example .kamal/secrets
   # put KAMAL_REGISTRY_PASSWORD=ghp_... in .env.local
   ```

2. On the deploy host, add `config/Caddyfile.lipabill` into the main Caddyfile and reload Caddy. Ensure DNS for `lipabill.mboya.dev` points at the host.

3. First-time / ship:

   ```bash
   bundle install   # optional if using project Gemfile
   kamal setup      # first time only
   kamal deploy
   ```

Useful:

```bash
kamal logs
kamal app exec -i --reuse sh
```

Proxy: shared kamal-proxy on **3010** (with mbulu; Host-header routing). bashenga uses `3001`.
