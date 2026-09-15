@extends('layouts.app')

@section('title', $product->name . ' | Aurent')

@section('content')
<section class="product-detail" style="background:#fff;">
    <div>
        @php($primary = $product->primaryImage())
        <img src="{{ $primary ? $primary->image_url : asset('images/placeholder.svg') }}" alt="{{ $product->name }}">
    </div>

    <div>
        <div style="color:#bfa06b; text-transform:uppercase; letter-spacing:1px; font-size:.8rem;">{{ $product->brand->name }}</div>
        <h1>{{ $product->name }}</h1>
        <div class="price">
            @if($product->sale_price)
                ${{ number_format($product->sale_price, 2) }}
                <span class="sale">${{ number_format($product->price, 2) }}</span>
            @else
                ${{ number_format($product->price, 2) }}
            @endif
        </div>
        <p style="color:#7a7569; line-height:1.6;">{{ $product->description }}</p>

        <form action="{{ route('cart.store') }}" method="POST" style="margin:1.5rem 0;">
            @csrf
            <input type="hidden" name="product_id" value="{{ $product->id }}">
            <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
                <input type="number" name="quantity" value="1" min="1" max="{{ $product->stock }}" style="width:70px; padding:.5rem;">
                <button type="submit" class="btn">Add to Cart</button>
            </div>
        </form>

        <ul class="specs">
            <li><strong>Movement:</strong> {{ $product->movement }}</li>
            <li><strong>Case Material:</strong> {{ $product->case_material }}</li>
            <li><strong>Case Diameter:</strong> {{ $product->case_diameter }}</li>
            <li><strong>Dial:</strong> {{ $product->dial }}</li>
            <li><strong>Crystal:</strong> {{ $product->crystal }}</li>
            <li><strong>Water Resistance:</strong> {{ $product->water_resistance }}</li>
            <li><strong>Strap:</strong> {{ $product->strap }}</li>
            <li><strong>Warranty:</strong> {{ $product->warranty }}</li>
        </ul>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="section-title">Reviews</h2>
        @forelse($product->reviews as $review)
            <div style="border-bottom:1px solid rgba(13,13,13,.1); padding:1.5rem 0;">
                <strong>{{ $review->title ?? 'Review' }}</strong>
                <p style="color:#7a7569;">{{ $review->comment }}</p>
                <small>{{ $review->user->name }} — {{ $review->created_at->format('M d, Y') }}</small>
            </div>
        @empty
            <p style="color:#7a7569;">No reviews yet.</p>
        @endforelse
    </div>
</section>

<section class="section" style="background:#fff;">
    <div class="container">
        <h2 class="section-title">You May Also Like</h2>
        <div class="grid grid-4">
            @foreach($related as $rel)
                @include('components.product-card', ['product' => $rel])
            @endforeach
        </div>
    </div>
</section>
@endsection
