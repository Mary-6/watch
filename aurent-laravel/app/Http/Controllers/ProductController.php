<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = Product::with(['images', 'brand', 'category', 'reviews.user'])
            ->where('slug', $slug)
            ->where('status', 'ACTIVE')
            ->firstOrFail();

        $related = Product::with('images')
            ->where('id', '!=', $product->id)
            ->where('category_id', $product->category_id)
            ->where('status', 'ACTIVE')
            ->take(4)
            ->get();

        return view('product.show', compact('product', 'related'));
    }
}
