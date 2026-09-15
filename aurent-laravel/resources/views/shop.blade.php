@extends('layouts.app')

@section('title', 'Shop | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container">
        <h1 class="section-title">The Collection</h1>
        <p class="section-subtitle">Discover authenticated luxury timepieces from the world's finest watchmakers.</p>

        <div class="shop-layout">
            <aside class="filters">
                <form method="GET" action="{{ route('shop') }}">
                    <label>Search</label>
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Name, brand...">

                    <label>Brand</label>
                    <select name="brand">
                        <option value="">All</option>
                        @foreach($brands as $brand)
                            <option value="{{ $brand->slug }}" {{ request('brand') == $brand->slug ? 'selected' : '' }}>{{ $brand->name }}</option>
                        @endforeach
                    </select>

                    <label>Category</label>
                    <select name="category">
                        <option value="">All</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->slug }}" {{ request('category') == $category->slug ? 'selected' : '' }}>{{ $category->name }}</option>
                        @endforeach
                    </select>

                    <label>Gender</label>
                    <select name="gender">
                        <option value="">All</option>
                        <option value="MEN" {{ request('gender') == 'MEN' ? 'selected' : '' }}>Men</option>
                        <option value="WOMEN" {{ request('gender') == 'WOMEN' ? 'selected' : '' }}>Women</option>
                        <option value="UNISEX" {{ request('gender') == 'UNISEX' ? 'selected' : '' }}>Unisex</option>
                    </select>

                    <label>Sort</label>
                    <select name="sort">
                        <option value="featured" {{ request('sort') == 'featured' ? 'selected' : '' }}>Featured</option>
                        <option value="price-asc" {{ request('sort') == 'price-asc' ? 'selected' : '' }}>Price: low to high</option>
                        <option value="price-desc" {{ request('sort') == 'price-desc' ? 'selected' : '' }}>Price: high to low</option>
                        <option value="newest" {{ request('sort') == 'newest' ? 'selected' : '' }}>Newest</option>
                    </select>

                    <button type="submit" class="btn" style="width:100%;">Filter</button>
                </form>
            </aside>

            <div>
                <p style="color:#7a7569; margin-bottom:1rem;">{{ $products->total() }} watches</p>
                <div class="grid grid-4">
                    @foreach($products as $product)
                        @include('components.product-card', ['product' => $product])
                    @endforeach
                </div>
                <div class="pagination">
                    {{ $products->links() }}
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
