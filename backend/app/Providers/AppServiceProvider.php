<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\PersonalAccessToken;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        PersonalAccessToken::creating(function ($token) {
            $token->timestamps = false;
        });
    }
}