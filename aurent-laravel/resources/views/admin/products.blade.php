@extends('admin.layout')

@section('title', 'Admin Products | Aurent')

@section('admin-content')
<h1 class="section-title" style="margin-bottom:1.5rem;">Products</h1>

<table style="width:100%; border-collapse:collapse;">
    <thead>
        <tr style="text-align:left; border-bottom:1px solid rgba(13,13,13,.1);">
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $product)
            <tr style="border-bottom:1px solid rgba(13,13,13,.05);">
                <td style="padding:.75rem 0;">{{ $product->id }}</td>
                <td>{{ $product->name }}</td>
                <td>{{ $product->brand->name }}</td>
                <td>${{ number_format($product->price, 2) }}</td>
                <td>{{ $product->stock }}</td>
                <td>{{ $product->status }}</td>
                <td>
                    <a href="{{ route('admin.products.edit', $product->id) }}" style="color:#bfa06b; font-size:.85rem; margin-right:1rem;">Edit</a>
                    <form action="{{ route('admin.products.destroy', $product->id) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" style="background:none; border:none; color:#b00020; cursor:pointer; font-size:.85rem;">Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

<div class="pagination" style="margin-top:1.5rem;">
    {{ $products->links() }}
</div>
@endsection
