@extends('layouts.app')

@section('title', $post->title . ' | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container" style="max-width:800px;">
        <div class="brand">{{ $post->published_at?->format('M d, Y') }}</div>
        <h1 class="section-title" style="margin-top:.5rem;">{{ $post->title }}</h1>
        <p style="color:#7a7569; margin-bottom:2rem;">{{ $post->excerpt }}</p>
        <div style="line-height:1.7; color:#0d0d0d;">
            {!! $post->content !!}
        </div>
    </div>
</section>
@endsection
