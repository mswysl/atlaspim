# Atlas PIM (Medusa sync)

Custom Product Information Management (PIM) service built with NestJS, PostgreSQL (Prisma), and BullMQ/Redis.

## Included modules

- Product service (CRUD-ish upsert + variants/assets)
- Attribute schema endpoint
- Sync service for pushing products into Medusa Admin API
- Job queue for asynchronous sync jobs
- Medusa webhook receiver endpoint

## API endpoints

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `GET /attributes/schema`
- `POST /webhooks/medusa`

### Example payload (`POST /products`)

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

## Run locally

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

## Run with Docker

```bash
docker compose up --build
```

The API listens on `http://localhost:3100`.

## Medusa integration notes

- Set `MEDUSA_URL` and `MEDUSA_API_KEY` so the worker can call `POST /admin/products` on Medusa.
- Current sync strategy is *upsert-like create flow* at Medusa layer; adapt to your Medusa product matching logic (e.g., by handle or metadata `pim_id`).
- Webhook endpoint (`/webhooks/medusa`) is a stub for inbound Medusa events.
