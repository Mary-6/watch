# Aurent — Laravel Luxury Watch Store

A full-featured luxury watch e-commerce site built with Laravel. Payment integration is left as a stub so you can wire in your own provider.

## Deploy to hosting (e.g. 237 Host)

1. Upload the `aurent-laravel` folder to your server.
2. In your hosting control panel, set the **DocumentRoot** / **public_html** to either:
   - `aurent-laravel/public` (best, hides the app files), or
   - `aurent-laravel` (works because the included root `index.php` and `.htaccess` forward to `public/`).
3. Make sure `storage/` and `bootstrap/cache/` are writable (755/775):
   ```bash
   chmod -R 755 storage bootstrap/cache
   ```
4. Install PHP dependencies:
   ```bash
   composer install --no-dev
   ```
5. Set the environment file:
   ```bash
   cp .env.production .env
   ```
6. Generate the application key:
   ```bash
   php artisan key:generate
   ```
7. Create the MySQL database and user from `.env`, then run:
   ```bash
   php artisan migrate --seed
   ```
8. Cache for production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

## Default demo accounts

- **Admin:** `admin@aurent.com` / password from `.env` (`ADMIN_SEED_PASSWORD`)
- **Customer:** `customer@aurent.com` / password from `.env` (`CUSTOMER_SEED_PASSWORD`)

Default seed passwords in `.env.production` are placeholders — change them in `.env` before seeding.

## Local development

```bash
cp .env.local .env
php artisan serve
```

The app will use SQLite. Run `php artisan migrate --seed` first.

## Notes

- The default payment service is a stub. Replace `app/Services/PaymentService.php` with real gateway code.
- Image URLs are handled by `app/Services/ImageService.php`; set `IMAGE_STORAGE_DRIVER=local` or `cloudinary` in `.env`.
