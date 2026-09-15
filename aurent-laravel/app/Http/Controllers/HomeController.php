<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Brand;
use App\Models\BlogPost;

class HomeController extends Controller
{
    public function index()
    {
        $featured = Product::with(['images', 'brand'])
            ->where('featured', true)
            ->where('status', 'ACTIVE')
            ->take(8)
            ->get();

        $newArrivals = Product::with(['images', 'brand'])
            ->where('new_arrival', true)
            ->where('status', 'ACTIVE')
            ->latest()
            ->take(8)
            ->get();

        $bestsellers = Product::with(['images', 'brand', 'reviews'])
            ->where('best_seller', true)
            ->where('status', 'ACTIVE')
            ->take(8)
            ->get();

        $brands = Brand::where('status', 'ACTIVE')->get();
        $posts = BlogPost::where('status', 'PUBLISHED')->latest()->take(3)->get();

        return view('home', compact('featured', 'newArrivals', 'bestsellers', 'brands', 'posts'));
    }
}
