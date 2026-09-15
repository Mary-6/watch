<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.dashboard', [
            'productCount' => Product::count(),
            'orderCount' => Order::count(),
            'userCount' => User::count(),
            'revenue' => Order::sum('total'),
            'recentOrders' => Order::with('items')->latest()->take(5)->get(),
        ]);
    }

    public function products()
    {
        $products = Product::with('brand', 'category')->latest()->paginate(20);
        return view('admin.products', compact('products'));
    }

    public function productEdit($id)
    {
        $product = Product::findOrFail($id);
        $brands = Brand::all();
        $categories = Category::all();
        return view('admin.product-edit', compact('product', 'brands', 'categories'));
    }

    public function productUpdate(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'brand_id' => 'required|integer|exists:brands,id',
            'category_id' => 'required|integer|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:ACTIVE,INACTIVE',
            'featured' => 'boolean',
            'best_seller' => 'boolean',
            'new_arrival' => 'boolean',
        ]);

        $data['featured'] = $request->boolean('featured');
        $data['best_seller'] = $request->boolean('best_seller');
        $data['new_arrival'] = $request->boolean('new_arrival');

        $product->update($data);
        return redirect()->route('admin.products')->with('success', 'Product updated');
    }

    public function productDestroy($id)
    {
        Product::destroy($id);
        return redirect()->route('admin.products')->with('success', 'Product deleted');
    }

    public function orders()
    {
        $orders = Order::with('items')->latest()->paginate(20);
        return view('admin.orders', compact('orders'));
    }

    public function orderUpdate(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $data = $request->validate([
            'status' => 'required|in:PENDING,PROCESSING,SHIPPED,DELIVERED,CANCELLED',
            'payment_status' => 'required|in:PENDING,PAID,REFUNDED',
        ]);
        $order->update($data);
        return redirect()->route('admin.orders')->with('success', 'Order updated');
    }
}
