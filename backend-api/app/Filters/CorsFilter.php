<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Berikan izin secara hardcode di level PHP murni
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, Origin, Accept');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

        // Jika request dari VueJS adalah OPTIONS, berikan status 200 dan hentikan proses CI4 
        // agar tidak terjadi bentrok dengan rute lain.
        if (strtoupper($_SERVER['REQUEST_METHOD'] ?? $request->getMethod()) === 'OPTIONS') {
            http_response_code(200);
            exit(); 
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tempelkan izin di dalam objek Response CodeIgniter saat membalas data
        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Origin, Accept');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    }
}