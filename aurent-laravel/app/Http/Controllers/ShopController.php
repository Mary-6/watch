<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['images', 'brand'])->where('status', 'ACTIVE');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhereHas('brand', fn($b) => $b->where('name', 'like', "%{$search}%"))
                  ->orWhereHas('category', fn($c) => $c->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->filled('brand')) {
            $query->whereHas('brand', fn($b) => $b->where('slug', $request->input('brand')));
        }

        if ($request->filled('category')) {
            $query->whereHas('category', fn($c) => $c->where('slug', $request->input('category')));
        }

        if ($request->filled('gender')) {
            $query->where('gender', strtoupper($request->input('gender')));
        }

        $min = $request->input('minPrice');
        $max = $request->input('maxPrice');
        if ($min) $query->where('price', '>=', $min);
        if ($max) $query->where('price', '<=', $max);

        $sort = $request->input('sort');
        match ($sort) {
            'price-asc' => $query->orderBy('price', 'asc'),
            'price-desc' => $query->orderBy('price', 'desc'),
            'newest' => $query->latest(),
            default => $query->orderBy('featured', 'desc')->latest(),
        };

        $products = $query->paginate(12);
        $brands = Brand::where('status', 'ACTIVE')->get();
        $categories = Category::where('status', 'ACTIVE')->get();

        return view('shop', compact('products', 'brands', 'categories'));
    }
}
