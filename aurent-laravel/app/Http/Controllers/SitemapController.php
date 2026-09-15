<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Models\BlogPost;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $products = Product::where('status', 'ACTIVE')->get();
        $brands = Brand::where('status', 'ACTIVE')->get();
        $categories = Category::where('status', 'ACTIVE')->get();
        $posts = BlogPost::where('status', 'PUBLISHED')->get();

        $urls = [
            $this->urlNode(url('/'), 'daily', '1.0'),
            $this->urlNode(url('/shop'), 'daily', '0.9'),
            $this->urlNode(url('/brands'), 'weekly', '0.8'),
            $this->urlNode(url('/blog'), 'weekly', '0.8'),
            $this->urlNode(url('/about'), 'monthly', '0.5'),
        ];

        foreach ($brands as $brand) $urls[] = $this->urlNode(url('/brands/' . $brand->slug), 'weekly', '0.7');
        foreach ($categories as $category) $urls[] = $this->urlNode(url('/shop?category=' . $category->slug), 'weekly', '0.6');
        foreach ($products as $product) $urls[] = $this->urlNode(url('/products/' . $product->slug), 'weekly', '0.8');
        foreach ($posts as $post) $urls[] = $this->urlNode(url('/blog/' . $post->slug), 'monthly', '0.7');

        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" . implode("\n", $urls) . "\n</urlset>";

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }

    private function urlNode(string $loc, string $freq, string $priority): string
    {
        return "    <url>\n        <loc>" . htmlspecialchars($loc) . "</loc>\n        <changefreq>" . $freq . "</changefreq>\n        <priority>" . $priority . "</priority>\n    </url>";
    }

    public function robots(): Response
    {
        $content = "User-agent: *\nDisallow: /admin\nDisallow: /account\nDisallow: /cart\nDisallow: /checkout\nSitemap: " . url('sitemap.xml') . "\n";

        return response($content, 200)->header('Content-Type', 'text/plain');
    }
}
