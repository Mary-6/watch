@extends('admin.layout')

@section('title', 'Admin Dashboard | Aurent')

@section('admin-content')
<h1 class="section-title" style="margin-bottom:1.5rem;">Dashboard</h1>

<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:1.5rem; margin-bottom:2rem;">
    <div style="background:#f4f0e6; padding:1.5rem;">
        <div style="color:#7a7569; font-size:.85rem;">Products</div>
        <div style="font-size:2rem; font-weight:300;">{{ $productCount }}</div>
    </div>
    <div style="background:#f4f0e6; padding:1.5rem;">
        <div style="color:#7a7569; font-size:.85rem;">Orders</div>
        <div style="font-size:2rem; font-weight:300;">{{ $orderCount }}</div>
    </div>
    <div style="background:#f4f0e6; padding:1.5rem;">
        <div style="color:#7a7569; font-size:.85rem;">Customers</div>
        <div style="font-size:2rem; font-weight:300;">{{ $userCount }}</div>
    </div>
    <div style="background:#f4f0e6; padding:1.5rem;">
        <div style="color:#7a7569; font-size:.85rem;">Revenue</div>
        <div style="font-size:2rem; font-weight:300;">${{ number_format($revenue, 2) }}</div>
    </div>
</div>

<h3 style="font-weight:300; margin-bottom:1rem;">Recent Orders</h3>
<table style="width:100%; border-collapse:collapse;">
    <thead>
        <tr style="text-align:left; border-bottom:1px solid rgba(13,13,13,.1);">
            <th>Order #</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach($recentOrders as $order)
            <tr style="border-bottom:1px solid rgba(13,13,13,.05);">
                <td style="padding:.75rem 0;">{{ $order->order_number }}</td>
                <td>{{ $order->first_name }} {{ $order->last_name }}</td>
                <td>${{ number_format($order->total, 2) }}</td>
                <td>{{ $order->status }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
@endsection
