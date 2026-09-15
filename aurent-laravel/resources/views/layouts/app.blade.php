<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Aurent — Authenticated luxury timepieces.">
    <title>@yield('title', 'Aurent')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @stack('styles')
</head>
<body>
    <header>
        <div class="container">
            <a href="{{ route('home') }}" class="logo">AURENT</a>
            <nav>
                <a href="{{ route('shop') }}">Shop</a>
                <a href="{{ route('brands.index') }}">Brands</a>
                <a href="{{ route('blog.index') }}">Journal</a>
                <a href="{{ route('about') }}">About</a>
                <a href="{{ route('contact') }}">Contact</a>
                @php($count = array_sum(session('cart', [])))
                <a href="{{ route('cart.index') }}">Cart{{ $count ? ' (' . $count . ')' : '' }}</a>
                @auth
                    <a href="{{ route('customer.index') }}">Account</a>
                @else
                    <a href="{{ route('login') }}">Login</a>
                @endauth
            </nav>
        </div>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <div class="container">
            <div>
                <strong>AURENT</strong>
                <p style="opacity:.7; font-size:.9rem;">Authenticated luxury timepieces.</p>
            </div>
            <div>
                <a href="{{ route('shipping') }}">Shipping</a>
                <a href="{{ route('returns') }}">Returns</a>
                <a href="{{ route('privacy') }}">Privacy</a>
                <a href="{{ route('terms') }}">Terms</a>
            </div>
        </div>
    </footer>
</body>
</html>
