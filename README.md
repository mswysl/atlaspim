# Atlas PIM (Medusa-first, standalone)

A standalone Product Information Management API designed to run in Docker and sync to Medusa as a downstream commerce engine.

## What this now includes

- **Product Core**: product + variant + asset persistence (Prisma/Postgres)
- **Variant Matrix Generator**: generate size/color combinations
- **Artwork Manager schema**: metadata expectations for transparent PNGs, print regions, DTG sizes, etc.
- **Medusa Sync**: queue-based async sync and direct sync endpoints
- **Dashboard API**: products, assets, variants, sync status snapshot
- **CSV/XLSX import validation stubs**
- **Channel listing**: Medusa + future channels (Shopify, BigCartel, Etsy, SWIFTPod)
- **API key auth guard** for protected endpoints

## API surface

### Product API
- `GET /products`
- `GET /products/:id`
- `POST /products` (upsert by slug + enqueue sync)

### Sync API
- `POST /sync/medusa/product/:id` (queue)
- `POST /sync/medusa/all` (queue all)
- `POST /sync/medusa/product/:id/direct` (immediate HTTP push)

### PIM domain helpers
- `GET /dashboard`
- `GET /attributes/schema`
- `POST /variant-generator/matrix`
- `GET /artwork/schema`
- `POST /imports/csv/validate`
- `POST /imports/xlsx/validate`
- `GET /channels`
- `POST /webhooks/medusa`

## Security

If `PIM_API_KEY` is set, protected endpoints require:

```http
x-api-key: <PIM_API_KEY>
```

## Example payloads

### Upsert product

```json
{
  "title": "Trail Running Shoe",
  "slug": "trail-running-shoe",
  "description": "Grip-focused shoe",
  "status": "published",
  "variants": [
    { "size": "10", "color": "black", "sku": "TRAIL-10-BLK", "price": 12900 }
  ],
  "assets": [
    { "url": "https://cdn.example.com/shoes/trail-1.jpg", "type": "image" }
  ]
}
```

### Variant matrix

```json
{
  "sizes": ["S", "M", "L"],
  "colors": ["Black", "Bone"]
}
```

## Run locally

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

## Docker

```bash
docker compose up --build
```

- API: `http://localhost:3100`
- Postgres: `localhost:5434`
- Redis: `localhost:6380`

## Environment

See `.env.example` for required values.

## Important architecture note

This is intentionally a **standalone PIM service**, not a Medusa plugin-only implementation. Medusa should be treated as a channel/commerce backend target for publishing.
