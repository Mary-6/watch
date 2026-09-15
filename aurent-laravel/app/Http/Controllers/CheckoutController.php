<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\PaymentService;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);
        if (empty($cart)) return redirect()->route('cart.index');

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

        $shipping = $subtotal > 1000 ? 0 : 25;
        $total = $subtotal + $shipping;

        return view('checkout.index', compact('items', 'subtotal', 'shipping', 'total'));
    }

    public function store(Request $request)
    {
        $cart = $request->session()->get('cart', []);
        if (empty($cart)) return redirect()->route('cart.index');

        $data = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'notes' => 'nullable|string',
            'payment_method' => 'required|in:stripe,paypal,cod',
        ]);

        $products = Product::whereIn('id', array_keys($cart))->get()->keyBy('id');

        return DB::transaction(function () use ($data, $cart, $products, $request) {
            $subtotal = 0;
            foreach ($cart as $id => $qty) {
                if (!isset($products[$id])) continue;
                $price = $products[$id]->sale_price ?? $products[$id]->price;
                $subtotal += $price * $qty;
            }

            $shipping = $subtotal > 1000 ? 0 : 25;
            $total = $subtotal + $shipping;

            $paymentStatus = PaymentService::process($data['payment_method']);

            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'AUR-' . strtoupper(uniqid()),
                'status' => 'PENDING',
                'payment_status' => $paymentStatus,
                'payment_method' => $data['payment_method'],
                'subtotal' => $subtotal,
                'discount' => 0,
                'shipping' => $shipping,
                'total' => $total,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'street' => $data['street'],
                'city' => $data['city'],
                'state' => $data['state'],
                'postal_code' => $data['postal_code'],
                'country' => $data['country'],
                'notes' => $data['notes'],
            ]);

            foreach ($cart as $id => $qty) {
                if (!isset($products[$id])) continue;
                $product = $products[$id];
                $price = $product->sale_price ?? $product->price;
                $line = $price * $qty;
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'price' => $price,
                    'quantity' => $qty,
                    'total' => $line,
                ]);

                $product->decrement('stock', $qty);
            }

            $request->session()->forget('cart');

            return redirect()->route('order.show', $order->order_number)
                ->with('success', 'Order placed successfully');
        });
    }
}
