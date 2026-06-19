<?php

namespace App\Models;

use CodeIgniter\Model;

class TanggapanModel extends Model
{
    protected $table            = 'tanggapan';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['pengaduan_id', 'user_id', 'isi_tanggapan', 'tanggal_tanggapan'];
}