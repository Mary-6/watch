<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BlogPost;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::where('status', 'PUBLISHED')->latest()->paginate(9);
        return view('blog.index', compact('posts'));
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)->where('status', 'PUBLISHED')->firstOrFail();
        return view('blog.show', compact('post'));
    }
}
