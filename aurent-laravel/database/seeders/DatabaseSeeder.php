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
            ['name' => 'Aurent', 'slug' => 'aurent', 'description' => 'Curated in-house collection of modern luxury timepieces.'],
            ['name' => 'Norbol', 'slug' => 'norbol', 'description' => 'Bold fusion cases and contemporary statement chronographs.'],
            ['name' => 'Glemora', 'slug' => 'glemora', 'description' => 'Precision instruments inspired by ocean and lunar exploration.'],
            ['name' => 'Trovex', 'slug' => 'trovex', 'description' => 'Iconic marine and tool watches built for enduring style.'],
            ['name' => 'Audenmere', 'slug' => 'audenmere', 'description' => 'Avant-garde haute horology with signature octagonal cases.'],
            ['name' => 'Caelum', 'slug' => 'caelum', 'description' => 'Elegant pilot and dress silhouettes with refined heritage.'],
            ['name' => 'Phelion', 'slug' => 'phelion', 'description' => 'Discreet luxury sports watches with graceful proportions.'],
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
                'brand' => 'audenmere', 'category' => 'dress-watches', 'gender' => 'MEN',
                'name' => 'Audenmere Royal Court Perpetual', 'sku' => 'ADM-RCP-001',
                'price' => 9000, 'stock' => 3,
                'movement' => 'Automatic Perpetual', 'case_material' => '18k Rose Gold', 'case_diameter' => '41mm',
                'dial' => 'Pink Horizon', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Integrated Bracelet', 'warranty' => '5 years',
                'featured' => true, 'new_arrival' => true,
                'description' => 'A 41mm perpetual calendar in 18k rose gold with a pink horizon dial and a seamlessly integrated bracelet.',
            ],
            [
                'brand' => 'audenmere', 'category' => 'dress-watches', 'gender' => 'MEN',
                'name' => 'Audenmere Royal Court Slate', 'sku' => 'ADM-RCS-002',
                'price' => 10000, 'stock' => 2,
                'movement' => 'Automatic Perpetual', 'case_material' => 'Black Ceramic', 'case_diameter' => '41mm',
                'dial' => 'Slate Shadow', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Integrated Bracelet', 'warranty' => '5 years',
                'new_arrival' => true,
                'description' => 'A 41mm black ceramic perpetual calendar with a slate shadow dial and brushed integrated bracelet.',
            ],
            [
                'brand' => 'caelum', 'category' => 'dress-watches', 'gender' => 'UNISEX',
                'name' => 'Caelum Santiago Verde', 'sku' => 'CAE-SVD-001',
                'price' => 2400, 'stock' => 8,
                'movement' => 'Automatic', 'case_material' => 'Stainless Steel', 'case_diameter' => '40mm',
                'dial' => 'Verde Leaf', 'crystal' => 'Sapphire', 'water_resistance' => '100m', 'strap' => 'Steel Bracelet', 'warranty' => '4 years',
                'featured' => true, 'best_seller' => true,
                'description' => 'A 40mm steel automatic with a verde leaf dial, classic Roman numerals, and a brushed steel bracelet.',
            ],
            [
                'brand' => 'caelum', 'category' => 'dress-watches', 'gender' => 'WOMEN',
                'name' => 'Caelum Santiago Sunray', 'sku' => 'CAE-SSU-002',
                'price' => 4800, 'sale_price' => 4600, 'stock' => 4,
                'movement' => 'Automatic', 'case_material' => 'Steel & Yellow Gold', 'case_diameter' => '35mm',
                'dial' => 'Silvered Sunray', 'crystal' => 'Sapphire', 'water_resistance' => '100m', 'strap' => 'Two-Tone Bracelet', 'warranty' => '4 years',
                'best_seller' => true,
                'description' => 'A 35mm two-tone dress watch with a silvered sunray dial and a refined steel and yellow-gold bracelet.',
            ],
            [
                'brand' => 'caelum', 'category' => 'dress-watches', 'gender' => 'WOMEN',
                'name' => 'Caelum Dumont Quartz', 'sku' => 'CAE-DQT-003',
                'price' => 3000, 'stock' => 6,
                'movement' => 'Quartz', 'case_material' => 'Stainless Steel', 'case_diameter' => '38mm',
                'dial' => 'Silver Mist', 'crystal' => 'Sapphire', 'water_resistance' => '30m', 'strap' => 'Leather Strap', 'warranty' => '3 years',
                'best_seller' => true,
                'description' => 'A 38mm quartz dress piece with a silver mist dial, slim case profile, and a supple leather strap.',
            ],
            [
                'brand' => 'norbol', 'category' => 'sport-watches', 'gender' => 'MEN',
                'name' => 'Norbol Essence Saxem', 'sku' => 'NRL-ESG-001',
                'price' => 3500, 'stock' => 5,
                'movement' => 'Automatic Chronograph', 'case_material' => 'Green Ceramic Composite', 'case_diameter' => '42mm',
                'dial' => 'Emerald Saxem', 'crystal' => 'Sapphire', 'water_resistance' => '100m', 'strap' => 'Rubber', 'warranty' => '3 years',
                'new_arrival' => true,
                'description' => 'A 42mm tonneau-shaped chronograph with a vivid emerald saxem case and a textured rubber strap.',
            ],
            [
                'brand' => 'norbol', 'category' => 'sport-watches', 'gender' => 'MEN',
                'name' => 'Norbol Meca-10 Dark Matter', 'sku' => 'NRL-MDM-002',
                'price' => 3500, 'stock' => 5,
                'movement' => 'Manual 10-Day', 'case_material' => 'Black Ceramic', 'case_diameter' => '45mm',
                'dial' => 'Obsidian', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Rubber', 'warranty' => '3 years',
                'best_seller' => true,
                'description' => 'A 45mm black ceramic powerhouse with a 10-day manual movement and a dark, architectural dial.',
            ],
            [
                'brand' => 'norbol', 'category' => 'dress-watches', 'gender' => 'MEN',
                'name' => 'Norbol Square Impact', 'sku' => 'NRL-SQI-003',
                'price' => 3500, 'stock' => 4,
                'movement' => 'Automatic', 'case_material' => 'Rose Gold PVD', 'case_diameter' => '42mm',
                'dial' => 'Champagne Spark', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Alligator', 'warranty' => '3 years',
                'featured' => true,
                'description' => 'A 42mm square automatic with a champagne spark dial and a rose-gold PVD case on alligator leather.',
            ],
            [
                'brand' => 'glemora', 'category' => 'diver-watches', 'gender' => 'MEN',
                'name' => 'Glemora Depthmaster 300', 'sku' => 'GLM-D300-001',
                'price' => 5000, 'stock' => 6,
                'movement' => 'Automatic Co-Axial', 'case_material' => 'Stainless Steel', 'case_diameter' => '42mm',
                'dial' => 'Ocean Wave', 'crystal' => 'Sapphire', 'water_resistance' => '300m', 'strap' => 'Steel Bracelet', 'warranty' => '5 years',
                'best_seller' => true,
                'description' => 'A 42mm professional diver with a co-axial automatic movement and an ocean wave blue dial.',
            ],
            [
                'brand' => 'glemora', 'category' => 'sport-watches', 'gender' => 'MEN',
                'name' => 'Glemora Lunar Snoopy', 'sku' => 'GLM-LUN-002',
                'price' => 4000, 'sale_price' => 3700, 'stock' => 3,
                'movement' => 'Automatic Chronograph', 'case_material' => 'Stainless Steel', 'case_diameter' => '42mm',
                'dial' => 'Silver Snoopy', 'crystal' => 'Sapphire', 'water_resistance' => '50m', 'strap' => 'Nylon Strap', 'warranty' => '5 years',
                'best_seller' => true,
                'description' => 'A 42mm anniversary chronograph with a silver snoopy dial and a commemorative nylon strap.',
            ],
            [
                'brand' => 'glemora', 'category' => 'sport-watches', 'gender' => 'MEN',
                'name' => 'Glemora Lunar Professional', 'sku' => 'GLM-LPR-003',
                'price' => 4800, 'stock' => 4,
                'movement' => 'Manual Wind', 'case_material' => 'Stainless Steel', 'case_diameter' => '42mm',
                'dial' => 'White Lacquer', 'crystal' => 'Hesalite', 'water_resistance' => '50m', 'strap' => 'Nylon Strap', 'warranty' => '5 years',
                'new_arrival' => true,
                'description' => 'A 42mm manually wound lunar chronograph with a white lacquer dial and a velcro-style nylon strap.',
            ],
            [
                'brand' => 'phelion', 'category' => 'sport-watches', 'gender' => 'MEN',
                'name' => 'Phelion Nautil Brown', 'sku' => 'PHE-NAU-001',
                'price' => 3500, 'stock' => 5,
                'movement' => 'Automatic', 'case_material' => 'Rose Gold', 'case_diameter' => '40mm',
                'dial' => 'Mocha', 'crystal' => 'Sapphire', 'water_resistance' => '120m', 'strap' => 'Composite Strap', 'warranty' => '5 years',
                'best_seller' => true,
                'description' => 'A 40mm luxury sports watch in rose gold with a mocha dial and an integrated composite strap.',
            ],
            [
                'brand' => 'trovex', 'category' => 'diver-watches', 'gender' => 'MEN',
                'name' => 'Trovex Submarine Gold', 'sku' => 'TRO-SBG-001',
                'price' => 6000, 'sale_price' => 5700, 'stock' => 2,
                'movement' => 'Automatic', 'case_material' => '18k Yellow Gold', 'case_diameter' => '40mm',
                'dial' => 'Azure Sun', 'crystal' => 'Sapphire', 'water_resistance' => '300m', 'strap' => 'Oyster Bracelet', 'warranty' => '5 years',
                'best_seller' => true, 'featured' => true,
                'description' => 'A 40m yellow gold diver with an azure sun dial and an oyster-style bracelet.',
            ],
        ];

        foreach ($watches as $w) {
            $brand = Brand::where('slug', $w['brand'])->first();
            $category = Category::where('slug', $w['category'])->first();
            $slug = $this->slug($w['name']);
            $description = $w['description'] ?? "The {$w['name']} is a {$w['gender']} {$category->name} watch powered by a {$w['movement']} movement. It features a {$w['case_material']} {$w['case_diameter']} case, {$w['dial']} dial, {$w['crystal']} crystal, and {$w['water_resistance']} water resistance. Finished on a {$w['strap']}, it is backed by a {$w['warranty']} guarantee.";

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
                'sale_price' => $w['sale_price'] ?? null,
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
            'pink horizon' => '#D8A1A1',
            'slate shadow' => '#3A3A3A',
            'verde leaf' => '#2E5A42',
            'silvered sunray' => '#D8D8D8',
            'silver mist' => '#E0E0E0',
            'emerald saxem' => '#0F5C3E',
            'obsidian' => '#111111',
            'champagne spark' => '#E5D2A8',
            'ocean wave' => '#1F4E6F',
            'silver snoopy' => '#D9D9D9',
            'white lacquer' => '#F5F5F5',
            'mocha' => '#6B4C3A',
            'azure sun' => '#2F6B9A',
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
