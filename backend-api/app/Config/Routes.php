<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// 1. Matikan Auto-Routing demi Keamanan API
$routes->setAutoRoute(false);

// 2. TANGKAP SEMUA REQUEST OPTIONS (CORS PREFLIGHT) AGAR TIDAK 404
$routes->options('(:any)', static function () {
    return \Config\Services::response()->setStatusCode(200);
});

// 3. Rute Publik Cadangan
$routes->get('/', 'Auth::login'); 

// ==========================================
// RUTE RESTFUL API (E-REPORT)
// ==========================================

$routes->group('api', function($routes) {
    // --- API AUTENTIKASI ---
    $routes->post('login', 'Auth::login');
    $routes->post('logout', 'Auth::logout');
    
    // --- API PENGADUAN ---
    $routes->get('pengaduan', 'Pengaduan::index');
    $routes->post('pengaduan', 'Pengaduan::create');
    $routes->put('pengaduan/(:num)', 'Pengaduan::update/$1');
    $routes->delete('pengaduan/(:num)', 'Pengaduan::delete/$1');

    // --- API TANGGAPAN ---
    $routes->get('tanggapan/(:num)', 'Tanggapan::show/$1');
    $routes->post('tanggapan', 'Tanggapan::create');
});