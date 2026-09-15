@extends('layouts.app')

@section('title', 'Journal | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container">
        <h1 class="section-title">The Journal</h1>
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
        <div class="pagination">
            {{ $posts->links() }}
        </div>
    </div>
</section>
@endsection
