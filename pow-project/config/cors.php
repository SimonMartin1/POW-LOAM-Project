<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // Permitir CORS en las rutas de API y autenticación
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', 'broadcasting/auth'],

    'allowed_methods' => ['*'],

    // AQUÍ ES DONDE LE DAMOS PERMISO A TU REACT NATIVE WEB
    'allowed_origins' => [
        'http://localhost:8081', // Tu Frontend Web
        'http://localhost:19006', // Puerto alternativo de Expo
        'http://localhost:3000',  // Por si acaso usas React puro alguna vez
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // VITAL: Permite que viajen cookies y headers de autenticación
    'supports_credentials' => true,

];