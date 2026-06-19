<?php

namespace App\Models;

use CodeIgniter\Model;

class PengaduanModel extends Model
{
    protected $table            = 'pengaduan';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['nama_pelapor', 'email_pelapor', 'judul_laporan', 'isi_laporan', 'tanggal_lapor', 'status'];
}