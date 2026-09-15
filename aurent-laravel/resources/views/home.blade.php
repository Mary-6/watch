@extends('layouts.app')

@section('title', 'Aurent | Luxury Watches')

@section('content')
<section class="hero">
    <div class="container">
        <h1>Watches of Uncommon Character</h1>
        <p>Explore a curated world of fine horology — hand-picked timepieces from bold independent makers and established workshops, guaranteed authentic and delivered with precision.</p>
        <a href="{{ route('shop') }}" class="btn">Browse the Edit</a>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="section-title">Editor's Picks</h2>
        <p class="section-subtitle">Standout pieces hand-selected from the atelier.</p>
        <div class="grid grid-4">
            @foreach($featured as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
    </div>
</section>

<section class="section" style="background:#fff;">
    <div class="container">
        <h2 class="section-title">Just Landed</h2>
        <p class="section-subtitle">The newest additions to the Aurent edit.</p>
        <div class="grid grid-4">
            @foreach($newArrivals as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="section-title">Collector Favorites</h2>
        <p class="section-subtitle">The timepieces our clients return to again and again.</p>
        <div class="grid grid-4">
            @foreach($bestsellers as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
    </div>
</section>

<section class="section" style="background:#fff;">
    <div class="container">
        <h2 class="section-title">The Makers We Back</h2>
        <p class="section-subtitle">House ateliers and independent creators with a shared vision.</p>
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
        <h2 class="section-title">Aurent Notes</h2>
        <p class="section-subtitle">Guides, maker stories, and watch-care wisdom.</p>
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
