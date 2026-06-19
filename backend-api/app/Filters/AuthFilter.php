<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // 1. Ambil header Authorization menggunakan pembaca bawaan CI4 agar selalu terbaca
        $authHeader = $request->getHeaderLine('Authorization');
        
        // Fallback (cadangan) jika server XAMPP menyembunyikan header utamanya
        if (empty($authHeader)) {
            $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        }

        if (empty($authHeader)) {
            // Jika tidak membawa token, tendang dengan 401
            return Services::response()
                ->setJSON([
                    'status' => 401, 
                    'error' => 'Akses Ditolak. Token tidak ditemukan!'
                ])
                ->setStatusCode(401);
        }

        // 2. Pecah string "Bearer <token>"
        $arr = explode(" ", $authHeader);
        $token = isset($arr[1]) ? $arr[1] : null;

        // 3. Cek validitas token ke database tabel 'users'
        $db = \Config\Database::connect();
        $user = $db->table('users')->getWhere(['token' => $token])->getRow();

        if (!$token || !$user) {
            return Services::response()
                ->setJSON([
                    'status' => 401, 
                    'error' => 'Sesi Anda telah habis atau token tidak valid!'
                ])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Kosongkan
    }
}