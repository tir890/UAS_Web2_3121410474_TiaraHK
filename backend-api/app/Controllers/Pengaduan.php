<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PengaduanModel;

class Pengaduan extends ResourceController
{
    protected $modelName = 'App\Models\PengaduanModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model->orderBy('id', 'DESC')->findAll();
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    public function create()
    {
        // getVar() memastikan data tidak akan bentrok
        $nama_pelapor  = $this->request->getVar('nama_pelapor');
        $email_pelapor = $this->request->getVar('email_pelapor');
        $judul_laporan = $this->request->getVar('judul_laporan');
        $isi_laporan   = $this->request->getVar('isi_laporan');

        if (!$nama_pelapor || !$judul_laporan) {
            return $this->fail('Data aduan tidak valid! Nama dan Judul wajib diisi.', 400);
        }

        $insertData = [
            'nama_pelapor'  => $nama_pelapor,
            'email_pelapor' => $email_pelapor ?? '',
            'judul_laporan' => $judul_laporan,
            'isi_laporan'   => $isi_laporan ?? '',
            'status'        => 'Pending'
        ];

        $this->model->insert($insertData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Laporan pengaduan Anda berhasil dikirim!'
        ]);
    }

    public function update($id = null)
    {
        $status = $this->request->getVar('status');
        $pengaduan = $this->model->find($id);

        if (!$pengaduan) return $this->failNotFound('Data pengaduan tidak ditemukan!');

        if ($status) {
            $this->model->update($id, ['status' => $status]);
        }

        return $this->respond(['status' => 200, 'message' => 'Status pengaduan berhasil diperbarui!'], 200);
    }

    public function delete($id = null)
    {
        $pengaduan = $this->model->find($id);
        if (!$pengaduan) return $this->failNotFound('Data pengaduan tidak ditemukan!');

        $this->model->delete($id);

        return $this->respond(['status' => 200, 'message' => 'Laporan pengaduan berhasil dihapus!'], 200);
    }
}