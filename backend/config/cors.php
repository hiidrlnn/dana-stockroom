<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Di sini kamu bisa mengatur aplikasi mana saja yang boleh menembak API 
    | Laravel kamu. Konfigurasi di bawah ini dikhususkan untuk Next.js.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Mengizinkan port default localhost Next.js
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];