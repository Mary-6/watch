<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);
        $products = Product::whereIn('id', array_keys($cart))->get()->keyBy('id');

        $items = [];
        $subtotal = 0;
        foreach ($cart as $id => $qty) {
            if (!isset($products[$id])) continue;
            $product = $products[$id];
            $price = $product->sale_price ?? $product->price;
            $total = $price * $qty;
            $items[] = ['product' => $product, 'qty' => $qty, 'total' => $total];
            $subtotal += $total;
        }

        return view('cart.index', compact('items', 'subtotal'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $request->session()->get('cart', []);
        $cart[$request->product_id] = ($cart[$request->product_id] ?? 0) + (int) $request->quantity;

        $product = Product::find($request->product_id);
        if ($cart[$request->product_id] > $product->stock) {
            $cart[$request->product_id] = $product->stock;
        }

        $request->session()->put('cart', $cart);
        return back()->with('success', 'Added to cart');
    }

    public function update(Request $request, $id)
    {
        $request->validate(['quantity' => 'required|integer|min:0']);
        $cart = $request->session()->get('cart', []);

        if ($request->quantity < 1) {
            unset($cart[$id]);
        } else {
            $product = Product::findOrFail($id);
            $cart[$id] = min((int) $request->quantity, $product->stock);
        }

        $request->session()->put('cart', $cart);
        return redirect()->route('cart.index')->with('success', 'Cart updated');
    }

    public function destroy(Request $request, $id)
    {
        $cart = $request->session()->get('cart', []);
        unset($cart[$id]);
        $request->session()->put('cart', $cart);
        return redirect()->route('cart.index')->with('success', 'Removed from cart');
    }
}
