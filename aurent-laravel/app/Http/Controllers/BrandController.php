<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use App\Models\Product;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::where('status', 'ACTIVE')->get();
        return view('brands.index', compact('brands'));
    }

    public function show($slug)
    {
        $brand = Brand::where('slug', $slug)->where('status', 'ACTIVE')->firstOrFail();
        $products = Product::with('images')->where('brand_id', $brand->id)->where('status', 'ACTIVE')->paginate(12);
        return view('brands.show', compact('brand', 'products'));
    }
}
