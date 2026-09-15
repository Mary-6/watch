export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-4xl font-light">Settings</h1>
      <p className="text-stone">Configure payment, image storage, and environment variables in your <code className="text-ink">.env</code> file. Restart the Next.js server after making changes.</p>
      <div className="mt-6 border border-ink/10 bg-ivory p-6">
        <h2 className="font-display text-xl font-medium">Payment Providers</h2>
        <ul className="mt-3 space-y-2 text-sm text-stone">
          <li>Stripe — set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</li>
          <li>Paystack — set PAYSTACK_SECRET_KEY and NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</li>
          <li>Flutterwave — set FLUTTERWAVE_SECRET_KEY and NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY</li>
        </ul>
      </div>
      <div className="mt-6 border border-ink/10 bg-ivory p-6">
        <h2 className="font-display text-xl font-medium">Image Storage</h2>
        <p className="mt-3 text-sm text-stone">Set IMAGE_STORAGE_DRIVER=local (default) or cloudinary. For Cloudinary, set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.</p>
      </div>
    </div>
  );
}
