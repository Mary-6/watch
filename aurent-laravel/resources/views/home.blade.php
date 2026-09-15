@extends('layouts.app')

@section('title', 'Aurent | Luxury Watches')

@section('content')
<section class="hero">
    <div class="container">
        <h1>Timepieces of Distinction</h1>
        <p>Discover authenticated luxury watches from independent ateliers and heritage maisons — each piece inspected, warranted, and delivered with care.</p>
        <a href="{{ route('shop') }}" class="btn">Explore the Collection</a>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="section-title">Featured Watches</h2>
        <p class="section-subtitle">Curated selections from our latest arrivals.</p>
        <div class="grid grid-4">
            @foreach($featured as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
    </div>
</section>

<section class="section" style="background:#fff;">
    <div class="container">
        <h2 class="section-title">New Arrivals</h2>
        <p class="section-subtitle">The freshest pieces to land in our atelier.</p>
        <div class="grid grid-4">
            @foreach($newArrivals as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="section-title">Bestsellers</h2>
        <p class="section-subtitle">Most-loved by collectors around the world.</p>
        <div class="grid grid-4">
            @foreach($bestsellers as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
    </div>
</section>

<section class="section" style="background:#fff;">
    <div class="container">
        <h2 class="section-title">Our Maisons</h2>
        <p class="section-subtitle">House brands and independent watchmakers we stand behind.</p>
        <div class="grid grid-4">
            @foreach($brands as $brand)
                <a href="{{ route('brands.show', $brand->slug) }}" class="brand-logo">
                    <strong>{{ $brand->name }}</strong>
                    <p style="opacity:.7; font-size:.8rem; margin-top:.5rem;">{{ $brand->description }}</p>
                </a>
            @endforeach
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="section-title">From the Journal</h2>
        <p class="section-subtitle">Stories, guides, and horological insights.</p>
        <div class="grid grid-3">
            @foreach($posts as $post)
                <div class="product-card" style="padding:1.5rem;">
                    <div class="brand">{{ $post->published_at?->format('M d, Y') }}</div>
                    <h3 style="margin:.5rem 0;">{{ $post->title }}</h3>
                    <p style="color:#7a7569; font-size:.9rem;">{{ $post->excerpt }}</p>
                    <a href="{{ route('blog.show', $post->slug) }}" style="color:#bfa06b; font-size:.85rem;">Read more</a>
                </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
