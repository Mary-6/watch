@extends('layouts.app')

@section('title', 'Brands | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container">
        <h1 class="section-title">Our Maisons</h1>
        <p class="section-subtitle">House brands and independent watchmakers.</p>
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
@endsection
