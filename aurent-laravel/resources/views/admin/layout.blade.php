@extends('layouts.app')

@section('content')
<div style="display:grid; grid-template-columns: 220px 1fr; min-height:70vh;">
    <aside style="background:#0d0d0d; color:#f4f0e6; padding:2rem 1.5rem;">
        <h3 style="font-size:1rem; margin-bottom:1.5rem; letter-spacing:1px;">ADMIN</h3>
        <a href="{{ route('admin.dashboard') }}" style="display:block; color:#f4f0e6; margin:.75rem 0; opacity:.8;">Dashboard</a>
        <a href="{{ route('admin.products') }}" style="display:block; color:#f4f0e6; margin:.75rem 0; opacity:.8;">Products</a>
        <a href="{{ route('admin.orders') }}" style="display:block; color:#f4f0e6; margin:.75rem 0; opacity:.8;">Orders</a>
        <a href="{{ route('home') }}" style="display:block; color:#bfa06b; margin-top:2rem; font-size:.85rem;">Back to Store</a>
    </aside>
    <div style="padding:2rem; background:#fff;">
        @if(session('success'))
            <div style="background:#0d0d0d; color:#f4f0e6; padding:1rem; margin-bottom:1.5rem;">{{ session('success') }}</div>
        @endif
        @yield('admin-content')
    </div>
</div>
@endsection
