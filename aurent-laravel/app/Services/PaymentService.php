<?php

namespace App\Services;

class PaymentService
{
    /**
     * Simulate a payment charge and return the resulting payment status.
     */
    public static function process(string $method): string
    {
        return match ($method) {
            'cod' => 'PENDING',
            'stripe', 'paypal' => 'PAID',
            default => 'PENDING',
        };
    }
}
