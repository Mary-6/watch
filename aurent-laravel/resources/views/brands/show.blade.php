@extends('layouts.app')

@section('title', $brand->name . ' | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container">
        <h1 class="section-title">{{ $brand->name }}</h1>
        <p class="section-subtitle">{{ $brand->description }}</p>
        <p style="color:#7a7569; margin-bottom:2rem;">{{ $products->total() }} watches</p>
        <div class="grid grid-4">
            @foreach($products as $product)
                @include('components.product-card', ['product' => $product])
            @endforeach
        </div>
        <div class="pagination">
            {{ $products->links() }}
        </div>
    </div>
</section>
@endsection
