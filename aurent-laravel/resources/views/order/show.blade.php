@extends('layouts.app')

@section('title', 'Order ' . $order->order_number . ' | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container" style="max-width:800px;">
        @if(session('success'))
            <div style="background:#0d0d0d; color:#f4f0e6; padding:1rem; margin-bottom:1.5rem;">{{ session('success') }}</div>
        @endif

        <h1 class="section-title">Thank You</h1>
        <p style="color:#7a7569; margin-bottom:2rem;">Order <strong>{{ $order->order_number }}</strong> has been placed and is currently <strong>{{ $order->status }}</strong>.</p>

        <h3 style="font-weight:300; margin-bottom:1rem;">Items</h3>
        @foreach($order->items as $item)
            <div style="display:flex; justify-content:space-between; padding:.75rem 0; border-bottom:1px solid rgba(13,13,13,.05);">
                <span>{{ $item->name }} x {{ $item->quantity }}</span>
                <span>${{ number_format($item->total, 2) }}</span>
            </div>
        @endforeach

        <div style="display:flex; justify-content:space-between; padding:1rem 0; color:#7a7569;">
            <span>Subtotal</span>
            <span>${{ number_format($order->subtotal, 2) }}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:.5rem 0; color:#7a7569;">
            <span>Shipping</span>
            <span>${{ number_format($order->shipping, 2) }}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:1rem 0; font-size:1.2rem; font-weight:bold; border-top:1px solid rgba(13,13,13,.1);">
            <span>Total</span>
            <span style="color:#bfa06b;">${{ number_format($order->total, 2) }}</span>
        </div>

        <h3 style="font-weight:300; margin:2rem 0 1rem;">Shipping Details</h3>
        <p style="color:#7a7569; line-height:1.6;">
            {{ $order->first_name }} {{ $order->last_name }}<br>
            {{ $order->street }}<br>
            {{ $order->city }}, {{ $order->state }} {{ $order->postal_code }}<br>
            {{ $order->country }}<br>
            {{ $order->email }}
        </p>

        <a href="{{ route('home') }}" class="btn" style="margin-top:2rem;">Back to Home</a>
    </div>
</section>
@endsection
