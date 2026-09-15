<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\BlogPost;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\NewsletterSubscriber;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        @mkdir(public_path('images/watches'), 0777, true);
        @mkdir(public_path('images/brands'), 0777, true);

        $admin = User::create([
            'name' => 'Aurent Admin',
            'email' => 'admin@aurent.com',
            'password' => Hash::make(env('ADMIN_SEED_PASSWORD', 'AurentAdmin2026!')),
            'role' => 'ADMIN',
        ]);

        $customer = User::create([
            'name' => 'Demo Customer',
            'email' => 'customer@aurent.com',
            'password' => Hash::make(env('CUSTOMER_SEED_PASSWORD', 'CustomerPass2026!')),
            'role' => 'CUSTOMER',
        ]);

        Address::create([
            'user_id' => $customer->id,
            'label' => 'Home',
            'street' => '12 Rue de la Paix',
            'city' => 'Paris',
            'state' => 'IDF',
            'postal_code' => '75002',
            'country' => 'France',
            'is_default' => true,
        ]);

        $brands = [
            ['name' => 'Aurent', 'slug' => 'aurent', 'description' => 'In-house atelier shaping modern luxury timepieces.'],
            ['name' => 'Veyron & Co', 'slug' => 'veyron-co', 'description' => 'Sport-chic chronographs engineered for motion.'],
            ['name' => 'Celestine Horology', 'slug' => 'celestine-horology', 'description' => 'Celestial-inspired dress watches with artisan dials.'],
            ['name' => 'Argentis Works', 'slug' => 'argentis-works', 'description' => 'Marine-grade steel and vintage diver silhouettes.'],
        ];

        foreach ($brands as $b) {
            $svg = $this->brandSvg($b['name']);
            $path = public_path("images/brands/{$b['slug']}.svg");
            file_put_contents($path, $svg);
            Brand::create([...$b, 'logo' => "/images/brands/{$b['slug']}.svg", 'status' => 'ACTIVE']);
        }

        $categories = [
            ['name' => 'Dress Watches', 'slug' => 'dress-watches', 'description' => 'Refined wristwear for elevated moments.'],
            ['name' => 'Sport Watches', 'slug' => 'sport-watches', 'description' => 'Performance-driven instruments for active living.'],
            ['name' => 'Aviator Watches', 'slug' => 'aviator-watches', 'description' => 'Precision tools inspired by the cockpit.'],
            ['name' => 'Diver Watches', 'slug' => 'diver-watches', 'description' => 'Water-ready companions with rugged build quality.'],
        ];

        foreach ($categories as $c) {
            Category::create([...$c, 'status' => 'ACTIVE']);
        }

        $watches = [
            [
                'brand' => 'aurent', 'category' => 'dress-watches', 'gender' => 'MEN',
                'name' => 'Aurent Sentinel', 'sku' => 'AUR-SNT-001',
                'price' => 2450, 'stock' => 8,
                'movement' => 'Automatic', 'case_material' => '316L Stainless Steel', 'case_diameter' => '40mm',
                'dial' => 'Midnight Blue', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Alligator Leather', 'warranty' => '5 years',
                'featured' => true, 'new_arrival' => true,
            ],
            [
                'brand' => 'aurent', 'category' => 'diver-watches', 'gender' => 'UNISEX',
                'name' => 'Aurent Abyss', 'sku' => 'AUR-ABS-002',
                'price' => 3200, 'stock' => 12,
                'movement' => 'Automatic', 'case_material' => 'Titanium', 'case_diameter' => '42mm',
                'dial' => 'Abyss Black', 'crystal' => 'Sapphire', 'water_resistance' => '300m', 'strap' => 'Titanium Bracelet', 'warranty' => '5 years',
                'best_seller' => true,
            ],
            [
                'brand' => 'aurent', 'category' => 'dress-watches', 'gender' => 'WOMEN',
                'name' => 'Aurent Celestine', 'sku' => 'AUR-CLS-003',
                'price' => 1850, 'stock' => 6,
                'movement' => 'Quartz', 'case_material' => 'Rose Gold PVD', 'case_diameter' => '34mm',
                'dial' => 'White Mother-of-Pearl', 'crystal' => 'Sapphire', 'water_resistance' => '30m', 'strap' => 'Satin', 'warranty' => '3 years',
                'new_arrival' => true,
            ],
            [
                'brand' => 'veyron-co', 'category' => 'sport-watches', 'gender' => 'MEN',
                'name' => 'Veyron Stratos', 'sku' => 'VY-STR-001',
                'price' => 1650, 'stock' => 15,
                'movement' => 'Quartz Chronograph', 'case_material' => 'Stainless Steel', 'case_diameter' => '43mm',
                'dial' => 'Racing Black', 'crystal' => 'Mineral', 'water_resistance' => '100m', 'strap' => 'Silicone', 'warranty' => '3 years',
                'best_seller' => true,
            ],
            [
                'brand' => 'celestine-horology', 'category' => 'dress-watches', 'gender' => 'MEN',
                'name' => 'Celestine Aurora', 'sku' => 'CEL-AUR-001',
                'price' => 4600, 'stock' => 5,
                'movement' => 'Automatic', 'case_material' => 'Polished Steel', 'case_diameter' => '39mm',
                'dial' => 'Champagne', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Crocodile Leather', 'warranty' => '6 years',
                'featured' => true,
            ],
            [
                'brand' => 'argentis-works', 'category' => 'diver-watches', 'gender' => 'MEN',
                'name' => 'Argentis Mariner', 'sku' => 'ARG-MAR-001',
                'price' => 2100, 'stock' => 9,
                'movement' => 'Automatic', 'case_material' => 'Bronze', 'case_diameter' => '41mm',
                'dial' => 'Deep Ocean', 'crystal' => 'Sapphire', 'water_resistance' => '200m', 'strap' => 'Waxed Canvas', 'warranty' => '4 years',
                'best_seller' => true,
            ],
            [
                'brand' => 'aurent', 'category' => 'aviator-watches', 'gender' => 'MEN',
                'name' => 'Aurent Aviator', 'sku' => 'AUR-AVT-004',
                'price' => 2900, 'stock' => 7,
                'movement' => 'Automatic Chronograph', 'case_material' => 'Ceramic & Steel', 'case_diameter' => '43mm',
                'dial' => 'Panda Silver', 'crystal' => 'Sapphire', 'water_resistance' => '100m', 'strap' => 'Perforated Leather', 'warranty' => '5 years',
                'featured' => true,
            ],
        ];

        foreach ($watches as $w) {
            $brand = Brand::where('slug', $w['brand'])->first();
            $category = Category::where('slug', $w['category'])->first();
            $slug = $this->slug($w['name']);
            $description = "The {$w['name']} is a {$w['gender']} {$category->name} watch powered by a {$w['movement']} movement. It features a {$w['case_material']} {$w['case_diameter']} case, {$w['dial']} dial, {$w['crystal']} crystal, and {$w['water_resistance']} water resistance. Finished on a {$w['strap']}, it is backed by a {$w['warranty']} guarantee.";

            $svg = $this->watchSvg($w['name'], $w['dial']);
            $path = public_path("images/watches/{$slug}.svg");
            file_put_contents($path, $svg);

            $product = Product::create([
                'brand_id' => $brand->id,
                'category_id' => $category->id,
                'name' => $w['name'],
                'slug' => $slug,
                'sku' => $w['sku'],
                'description' => $description,
                'price' => $w['price'],
                'sale_price' => null,
                'stock' => $w['stock'],
                'gender' => $w['gender'],
                'movement' => $w['movement'],
                'case_material' => $w['case_material'],
                'case_diameter' => $w['case_diameter'],
                'dial' => $w['dial'],
                'crystal' => $w['crystal'],
                'water_resistance' => $w['water_resistance'],
                'strap' => $w['strap'],
                'warranty' => $w['warranty'],
                'featured' => $w['featured'] ?? false,
                'best_seller' => $w['best_seller'] ?? false,
                'new_arrival' => $w['new_arrival'] ?? false,
                'status' => 'ACTIVE',
            ]);

            ProductImage::create([
                'product_id' => $product->id,
                'image_url' => "/images/watches/{$slug}.svg",
                'is_primary' => true,
                'sort_order' => 0,
            ]);

            Review::create([
                'product_id' => $product->id,
                'user_id' => $customer->id,
                'rating' => 4 + rand(0, 1),
                'title' => 'Outstanding craftsmanship',
                'comment' => 'Stunningly executed, precise on the wrist, and a standout in my collection.',
                'status' => 'APPROVED',
            ]);
        }

        BlogPost::create([
            'title' => 'Choosing Your First Statement Timepiece',
            'slug' => 'first-statement-timepiece',
            'excerpt' => 'A collector’s roadmap to finding the perfect debut watch.',
            'content' => '<p>Selecting your first statement piece is a personal milestone. Prioritize the movement, materials, and story behind the maker before making your decision.</p>',
            'featured_image' => null,
            'published_at' => now()->subDays(7),
            'status' => 'PUBLISHED',
        ]);

        BlogPost::create([
            'title' => 'Why Sapphire Glass Leads the Market',
            'slug' => 'sapphire-glass-leads',
            'excerpt' => 'The science behind the most trusted crystal in fine watchmaking.',
            'content' => '<p>Sapphire glass is favored for its clarity and resistance to scratches. Premium watches rely on lab-grown sapphire to protect the dial for decades.</p>',
            'featured_image' => null,
            'published_at' => now()->subDays(2),
            'status' => 'PUBLISHED',
        ]);

        Coupon::create([
            'code' => 'WELCOME10',
            'type' => 'PERCENTAGE',
            'value' => 10,
            'minimum_amount' => 500,
            'maximum_uses' => 100,
            'uses' => 0,
            'status' => 'ACTIVE',
        ]);

        NewsletterSubscriber::create(['email' => 'demo@aurent.com']);
    }

    private function slug(string $text): string
    {
        return strtolower(preg_replace('/[^a-z0-9]+/i', '-', $text));
    }

    private function watchSvg(string $name, string $dial): string
{
    $color = match (strtolower($dial)) {
        'midnight blue' => '#1B3A4B',
        'abyss black' => '#1a1a1a',
        'racing black' => '#222222',
        'white mother-of-pearl' => '#f7f7f7',
        'champagne' => '#E8DAB8',
        'deep ocean' => '#0B3C49',
        'panda silver' => '#e0e0e0',
        default => '#333333',
    };

    $brand = substr($name, 0, 1);

    return <<<SVG
<svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#F8F7F4"/>
  <rect x="125" y="50" width="350" height="700" rx="40" fill="#1a1a1a"/>
  <rect x="140" y="65" width="320" height="670" rx="30" fill="#E5E0D8"/>
  <rect x="175" y="105" width="250" height="490" rx="8" fill="$color" stroke="#C0B298" stroke-width="6"/>
  <circle cx="300" cy="350" r="90" fill="none" stroke="#C0B298" stroke-width="2"/>
  <text x="300" y="365" text-anchor="middle" font-family="serif" font-size="42" fill="#C0B298">$brand</text>
  <text x="300" y="575" text-anchor="middle" font-family="serif" font-size="22" fill="#1a1a1a">AURENT</text>
  <text x="300" y="605" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#5c5c5c">AUTOMATIC</text>
  <rect x="150" y="240" width="40" height="240" rx="4" fill="#1a1a1a"/>
  <rect x="410" y="240" width="40" height="240" rx="4" fill="#1a1a1a"/>
</svg>
SVG;
    }

    private function brandSvg(string $name): string
    {
        $initial = substr($name, 0, 1);
        return <<<SVG
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#1a1a1a"/>
  <text x="100" y="120" text-anchor="middle" font-family="serif" font-size="72" fill="#C0B298">$initial</text>
</svg>
SVG;
    }
}
