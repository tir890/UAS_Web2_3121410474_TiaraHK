<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\SecureHeaders;

class Filters extends BaseConfig
{
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'cors'          => \App\Filters\CorsFilter::class, // <-- DAFTARKAN CORS DI SINI
        'authFilter'    => \App\Filters\AuthFilter::class, // <-- DAFTARKAN AUTH DI SINI
    ];

    public array $globals = [
        'before' => [
            'cors', // <-- WAJIB TARUH CORS PALING ATAS AGAR SEMUA JALUR DIBUKA
            'authFilter' => [
                'except' => [
                    '/',
                    'api/login',
                    'api/logout',
                    'api/pengaduan', // Bebaskan warga untuk lapor
                    'api/pengaduan/*'
                ]
            ]
        ],
        'after' => [
            'toolbar',
        ],
    ];

    public array $methods = [];
    public array $filters = [];
}