@extends('layouts.app')

@section('title', 'Login | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container" style="max-width:400px;">
        <h1 class="section-title">Sign In</h1>

        @if($errors->any())
            <ul style="color:#b00020; padding-left:1.2rem; margin-bottom:1rem;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        @endif

        <form action="{{ route('login') }}" method="POST" style="display:grid; gap:1rem; margin-top:2rem;">
            @csrf
            <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" required>
            <input type="password" name="password" placeholder="Password" required>
            <label style="font-size:.85rem;">
                <input type="checkbox" name="remember"> Remember me
            </label>
            <button type="submit" class="btn" style="width:100%;">Sign In</button>
        </form>

        <p style="margin-top:1.5rem; text-align:center;">
            No account? <a href="{{ route('register') }}" style="color:#bfa06b;">Create one</a>
        </p>
    </div>
</section>
@endsection
