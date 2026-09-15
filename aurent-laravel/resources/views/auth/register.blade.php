@extends('layouts.app')

@section('title', 'Register | Aurent')

@section('content')
<section class="section" style="background:#fff;">
    <div class="container" style="max-width:400px;">
        <h1 class="section-title">Create Account</h1>

        @if($errors->any())
            <ul style="color:#b00020; padding-left:1.2rem; margin-bottom:1rem;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        @endif

        <form action="{{ route('register') }}" method="POST" style="display:grid; gap:1rem; margin-top:2rem;">
            @csrf
            <input type="text" name="name" placeholder="Full name" value="{{ old('name') }}" required>
            <input type="email" name="email" placeholder="Email" value="{{ old('email') }}" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="password" name="password_confirmation" placeholder="Confirm password" required>
            <button type="submit" class="btn" style="width:100%;">Create Account</button>
        </form>

        <p style="margin-top:1.5rem; text-align:center;">
            Already a member? <a href="{{ route('login') }}" style="color:#bfa06b;">Sign in</a>
        </p>
    </div>
</section>
@endsection
