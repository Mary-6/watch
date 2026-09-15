@extends('layouts.app')

@section('title', 'Checkout | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container">
        <h1 class="section-title">Checkout</h1>

        <div style="display:grid; grid-template-columns: 1fr 360px; gap:3rem; margin-top:2rem;">
            <div>
                <h3 style="font-weight:300; margin-bottom:1rem;">Order Summary</h3>
                @foreach($items as $item)
                    <div style="display:flex; justify-content:space-between; padding:.75rem 0; border-bottom:1px solid rgba(13,13,13,.05);">
                        <span>{{ $item['product']->name }} x {{ $item['qty'] }}</span>
                        <span>${{ number_format($item['total'], 2) }}</span>
                    </div>
                @endforeach
                <div style="display:flex; justify-content:space-between; padding:1rem 0; font-weight:bold;">
                    <span>Subtotal</span>
                    <span>${{ number_format($subtotal, 2) }}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:.5rem 0; color:#7a7569;">
                    <span>Shipping</span>
                    <span>${{ number_format($shipping, 2) }}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:1rem 0; font-size:1.2rem; font-weight:bold; border-top:1px solid rgba(13,13,13,.1);">
                    <span>Total</span>
                    <span style="color:#bfa06b;">${{ number_format($total, 2) }}</span>
                </div>
            </div>

            <div>
                <form action="{{ route('checkout.store') }}" method="POST">
                    @csrf
                    <h3 style="font-weight:300; margin-bottom:1rem;">Contact & Shipping</h3>
                    <div style="display:grid; gap:1rem;">
                        <input type="text" name="first_name" placeholder="First name" value="{{ old('first_name') }}" required>
                        <input type="text" name="last_name" placeholder="Last name" value="{{ old('last_name') }}" required>
                        <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" required>
                        <input type="text" name="phone" placeholder="Phone" value="{{ old('phone') }}">
                        <input type="text" name="street" placeholder="Street address" value="{{ old('street') }}" required>
                        <input type="text" name="city" placeholder="City" value="{{ old('city') }}" required>
                        <input type="text" name="state" placeholder="State / Province" value="{{ old('state') }}">
                        <input type="text" name="postal_code" placeholder="Postal code" value="{{ old('postal_code') }}" required>
                        <input type="text" name="country" placeholder="Country" value="{{ old('country', 'US') }}" required>
                        <textarea name="notes" placeholder="Order notes" rows="3">{{ old('notes') }}</textarea>

                        <label style="font-size:.85rem;">Payment method</label>
                        <select name="payment_method" required>
                            <option value="stripe">Stripe (stub)</option>
                            <option value="paypal">PayPal (stub)</option>
                            <option value="cod">Cash on delivery</option>
                        </select>

                        <button type="submit" class="btn" style="width:100%; margin-top:1rem;">Place Order</button>
                    </div>

                    @if($errors->any())
                        <ul style="color:#b00020; margin-top:1rem; padding-left:1.2rem;">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    @endif
                </form>
            </div>
        </div>
    </div>
</section>
@endsection
