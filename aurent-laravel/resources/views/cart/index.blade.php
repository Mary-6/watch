@extends('layouts.app')

@section('title', 'Cart | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container">
        <h1 class="section-title">Your Cart</h1>

        @if(session('success'))
            <div style="background:#0d0d0d; color:#f4f0e6; padding:1rem; margin:1rem 0;">{{ session('success') }}</div>
        @endif

        @if(count($items) > 0)
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="text-align:left; border-bottom:1px solid rgba(13,13,13,.1);">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($items as $item)
                        <tr style="border-bottom:1px solid rgba(13,13,13,.05);">
                            <td style="padding:1rem 0;">
                                <strong>{{ $item['product']->name }}</strong><br>
                                <small style="color:#7a7569;">{{ $item['product']->brand->name }}</small>
                            </td>
                            <td>${{ number_format($item['product']->sale_price ?? $item['product']->price, 2) }}</td>
                            <td>
                                <form action="{{ route('cart.update', $item['product']->id) }}" method="POST" style="display:flex; gap:.5rem; align-items:center;">
                                    @csrf
                                    @method('PATCH')
                                    <input type="number" name="quantity" value="{{ $item['qty'] }}" min="0" max="{{ $item['product']->stock + $item['qty'] }}" style="width:60px; padding:.5rem;">
                                    <button type="submit" class="btn" style="padding:.5rem 1rem;">Update</button>
                                </form>
                            </td>
                            <td style="font-weight:bold;">${{ number_format($item['total'], 2) }}</td>
                            <td>
                                <form action="{{ route('cart.destroy', $item['product']->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-outline" style="padding:.5rem 1rem;">Remove</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2rem;">
                <h3 style="font-weight:300;">Subtotal: ${{ number_format($subtotal, 2) }}</h3>
                <a href="{{ route('checkout.index') }}" class="btn">Proceed to Checkout</a>
            </div>
        @else
            <p style="color:#7a7569; margin-top:2rem;">Your cart is empty.</p>
            <a href="{{ route('shop') }}" class="btn" style="margin-top:1rem;">Continue Shopping</a>
        @endif
    </div>
</section>
@endsection
