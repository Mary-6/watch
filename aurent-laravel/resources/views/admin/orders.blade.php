@extends('admin.layout')

@section('title', 'Admin Orders | Aurent')

@section('admin-content')
<h1 class="section-title" style="margin-bottom:1.5rem;">Orders</h1>

<table style="width:100%; border-collapse:collapse;">
    <thead>
        <tr style="text-align:left; border-bottom:1px solid rgba(13,13,13,.1);">
            <th>Order #</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach($orders as $order)
            <tr style="border-bottom:1px solid rgba(13,13,13,.05);">
                <td style="padding:.75rem 0;"><a href="{{ route('order.show', $order->order_number) }}" style="color:#bfa06b;">{{ $order->order_number }}</a></td>
                <td>{{ $order->first_name }} {{ $order->last_name }}</td>
                <td>${{ number_format($order->total, 2) }}</td>
                <td>{{ $order->status }}</td>
                <td>{{ $order->payment_status }}</td>
                <td>
                    <form action="{{ route('admin.orders.update', $order->id) }}" method="POST" style="display:flex; gap:.5rem;">
                        @csrf
                        @method('PATCH')
                        <select name="status" style="padding:.4rem;">
                            <option value="PENDING" {{ $order->status == 'PENDING' ? 'selected' : '' }}>PENDING</option>
                            <option value="PROCESSING" {{ $order->status == 'PROCESSING' ? 'selected' : '' }}>PROCESSING</option>
                            <option value="SHIPPED" {{ $order->status == 'SHIPPED' ? 'selected' : '' }}>SHIPPED</option>
                            <option value="DELIVERED" {{ $order->status == 'DELIVERED' ? 'selected' : '' }}>DELIVERED</option>
                            <option value="CANCELLED" {{ $order->status == 'CANCELLED' ? 'selected' : '' }}>CANCELLED</option>
                        </select>
                        <select name="payment_status" style="padding:.4rem;">
                            <option value="PENDING" {{ $order->payment_status == 'PENDING' ? 'selected' : '' }}>PENDING</option>
                            <option value="PAID" {{ $order->payment_status == 'PAID' ? 'selected' : '' }}>PAID</option>
                            <option value="REFUNDED" {{ $order->payment_status == 'REFUNDED' ? 'selected' : '' }}>REFUNDED</option>
                        </select>
                        <button type="submit" class="btn" style="padding:.4rem .8rem;">Update</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

<div class="pagination" style="margin-top:1.5rem;">
    {{ $orders->links() }}
</div>
@endsection
