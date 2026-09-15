<?php

namespace App\Services;

class ImageService
{
    public static function url(string $path): string
    {
        $driver = config('image.driver', env('IMAGE_STORAGE_DRIVER', 'local'));

        return match ($driver) {
            'cloudinary' => 'https://res.cloudinary.com/demo/image/upload/' . ltrim($path, '/'),
            default => asset($path),
        };
    }

    public static function upload(string $sourcePath, string $destination): string
    {
        $driver = config('image.driver', env('IMAGE_STORAGE_DRIVER', 'local'));

        if ($driver === 'cloudinary') {
            // Stub: real Cloudinary SDK integration would go here.
            return 'https://res.cloudinary.com/demo/image/upload/' . ltrim($destination, '/');
        }

        return $destination;
    }
}
