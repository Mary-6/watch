# Aurent — Luxury Watch E-Commerce

A full-stack, production-ready luxury watch e-commerce store built with Next.js 16, TypeScript, Prisma, MySQL, and Tailwind CSS.

## What is included

- **Public storefront**: home, shop, product, brand, blog, about, contact, shipping, returns, privacy, terms, sitemap, robots
- **Customer features**: registration, login, cart, checkout, wishlist, account, orders, addresses
- **Admin dashboard**: products, orders, customers, brands, categories, coupons, reviews, blog, settings
- **Payment architecture**: ready-to-wire providers for Stripe, Paystack, and Flutterwave
- **Image storage**: local-by-default with Cloudinary placeholder
- **SEO**: metadata, dynamic sitemap, robots.txt

## Tech stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL via XAMPP
- NextAuth.js (credentials provider)
- Zod validation
- date-fns
- bcryptjs

## Environment variables

Copy `.env.example` to `.env` and fill in the values.

- `DATABASE_URL` / `DIRECT_URL` — MySQL connection strings
- `AUTH_SECRET` — NextAuth secret
- `NEXTAUTH_URL` / `NEXT_PUBLIC_APP_URL` — app URLs
- `ADMIN_SEED_PASSWORD` / `CUSTOMER_SEED_PASSWORD` — seed account passwords
- `STRIPE_*`, `PAYSTACK_*`, `FLUTTERWAVE_*` — payment provider keys (optional)
- `IMAGE_STORAGE_DRIVER` — `local` or `cloudinary`
- `CLOUDINARY_*` — Cloudinary keys (if using cloudinary)

## Database setup

Make sure MySQL is running. Then run:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

The seed script creates:

- Admin user: `admin@aurent.com`
- Demo customer: `customer@aurent.com`
- Brands, categories, products with SVG images, reviews, blog posts, and coupons

Seed images are written to `public/images/watches` and `public/images/brands`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run build
```

## Admin access

Visit `/login` and sign in with the seeded admin account.

## Payment configuration

Set the desired provider's secret and public keys in `.env`. The payment service stubs are in `src/lib/payments/service.ts`. Replace the placeholder methods with live API calls when ready.

## Deployment

Any Node.js host that supports Next.js (Vercel, Netlify, Railway, etc.):

1. Set environment variables.
2. Run `npx prisma migrate deploy` and `npx prisma db seed`.
3. Build with `npm run build`.
4. Start with `npm start`.

## Notes

- Prices are stored as `Float` in MySQL for simpler client handling.
- `@typescript-eslint/no-explicit-any` is relaxed while Prisma DTOs are formalized.
