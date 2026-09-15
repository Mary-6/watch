@extends('layouts.app')

@section('title', 'My Account | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container" style="max-width:800px;">
        <h1 class="section-title">My Account</h1>
        <p style="color:#7a7569; margin-bottom:2rem;">Welcome, {{ auth()->user()->name }}</p>

        <h3 style="font-weight:300; margin-bottom:1rem;">My Orders</h3>
        @if($orders->isEmpty())
            <p style="color:#7a7569;">No orders yet.</p>
        @else
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="text-align:left; border-bottom:1px solid rgba(13,13,13,.1);">
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                        <tr style="border-bottom:1px solid rgba(13,13,13,.05);">
                            <td style="padding:.75rem 0;"><a href="{{ route('order.show', $order->order_number) }}" style="color:#bfa06b;">{{ $order->order_number }}</a></td>
                            <td>{{ $order->created_at->format('M d, Y') }}</td>
                            <td>{{ $order->status }}</td>
                            <td style="font-weight:bold;">${{ number_format($order->total, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif

        <form action="{{ route('logout') }}" method="POST" style="margin-top:2rem;">
            @csrf
            <button type="submit" class="btn btn-outline">Logout</button>
        </form>
    </div>
</section>
@endsection
