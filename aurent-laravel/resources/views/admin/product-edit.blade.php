@extends('admin.layout')

@section('title', 'Edit Product | Aurent')

@section('admin-content')
<h1 class="section-title" style="margin-bottom:1.5rem;">Edit Product</h1>

<form action="{{ route('admin.products.update', $product->id) }}" method="POST" style="display:grid; gap:1rem; max-width:600px;">
    @csrf
    @method('PATCH')

    <label style="font-size:.85rem;">Name</label>
    <input type="text" name="name" value="{{ old('name', $product->name) }}" required>

    <label style="font-size:.85rem;">Brand</label>
    <select name="brand_id" required>
        @foreach($brands as $brand)
            <option value="{{ $brand->id }}" {{ $product->brand_id == $brand->id ? 'selected' : '' }}>{{ $brand->name }}</option>
        @endforeach
    </select>

    <label style="font-size:.85rem;">Category</label>
    <select name="category_id" required>
        @foreach($categories as $category)
            <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
        @endforeach
    </select>

    <label style="font-size:.85rem;">Price</label>
    <input type="number" step="0.01" name="price" value="{{ old('price', $product->price) }}" required>

    <label style="font-size:.85rem;">Sale Price</label>
    <input type="number" step="0.01" name="sale_price" value="{{ old('sale_price', $product->sale_price) }}">

    <label style="font-size:.85rem;">Stock</label>
    <input type="number" name="stock" value="{{ old('stock', $product->stock) }}" required>

    <label style="font-size:.85rem;">Status</label>
    <select name="status" required>
        <option value="ACTIVE" {{ $product->status == 'ACTIVE' ? 'selected' : '' }}>Active</option>
        <option value="INACTIVE" {{ $product->status == 'INACTIVE' ? 'selected' : '' }}>Inactive</option>
    </select>

    <label style="font-size:.85rem;">
        <input type="checkbox" name="featured" value="1" {{ $product->featured ? 'checked' : '' }}> Featured
    </label>
    <label style="font-size:.85rem;">
        <input type="checkbox" name="best_seller" value="1" {{ $product->best_seller ? 'checked' : '' }}> Best Seller
    </label>
    <label style="font-size:.85rem;">
        <input type="checkbox" name="new_arrival" value="1" {{ $product->new_arrival ? 'checked' : '' }}> New Arrival
    </label>

    <button type="submit" class="btn" style="width:fit-content;">Save Product</button>
</form>
@endsection
