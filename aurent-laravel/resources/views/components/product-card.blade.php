<a href="{{ route('product.show', $product->slug) }}" class="product-card">
    <img src="{{ $product->primaryImage() ? $product->primaryImage()->image_url : asset('images/placeholder.svg') }}" alt="{{ $product->name }}">
    <div class="body">
        <div class="brand">{{ $product->brand->name }}</div>
        <div class="name">{{ $product->name }}</div>
        <div class="price">
            @if($product->sale_price)
                <span style="color:#bfa06b;">${{ number_format($product->sale_price, 2) }}</span>
                <span class="sale">${{ number_format($product->price, 2) }}</span>
            @else
                ${{ number_format($product->price, 2) }}
            @endif
        </div>
    </div>
</a>
