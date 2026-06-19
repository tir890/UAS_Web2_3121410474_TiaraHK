<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TanggapanModel;

class Tanggapan extends ResourceController
{
    protected $modelName = 'App\Models\TanggapanModel';
    protected $format    = 'json';

    // 1. Menginput Tanggapan Baru (TERKUNCI TOKEN)
    public function create()
    {
        $json = $this->request->getJSON();

        if (!$json || !isset($json->pengaduan_id) || !isset($json->isi_tanggapan)) {
            return $this->fail('Data tanggapan tidak lengkap!', 400);
        }

        /**
         * Mengambil data user_id secara otomatis dari AuthFilter 
         * yang menempel di request saat token lolos pemindaian.
         */
        $userLoggined = $this->request->userLoggined ?? null;
        $userId = $userLoggined ? $userLoggined->id : 1; // Fallback jika tes manual

        $insertData = [
            'pengaduan_id'  => $json->pengaduan_id,
            'user_id'       => $userId,
            'isi_tanggapan' => $json->isi_tanggapan
        ];

        $this->model->insert($insertData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Tanggapan resmi berhasil dikirim ke pelapor!'
        ]);
    }

    // 2. Publik/Admin melihat tanggapan berdasarkan ID Pengaduan
    public function show($id = null)
    {
        // Cari baris tanggapan yang terhubung dengan ID pengaduan tersebut
        $db = \Config\Database::connect();
        $builder = $db->table('tanggapan');
        $builder->select('tanggapan.*, users.nama_lengkap as nama_petugas');
        $builder->join('users', 'users.id = tanggapan.user_id');
        $builder->where('tanggapan.pengaduan_id', $id);
        $query = $builder->get();

        return $this->respond([
            'status' => 200,
            'data'   => $query->getResultArray()
        ], 200);
    }
}