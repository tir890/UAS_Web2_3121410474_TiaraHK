const Dashboard = {
    template: `
        <div class="min-h-screen bg-gray-50 flex">
            
            <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl">
                <div class="p-6 border-b border-slate-800 flex items-center space-x-3">
                    <div class="bg-blue-600 text-white p-2 rounded-xl">
                        <i class="fa-solid fa-folder-shield text-lg"></i>
                    </div>
                    <div>
                        <span class="font-bold text-white tracking-wide block">E-REPORT</span>
                        <span class="text-xs text-slate-500 block">Panel Admin</span>
                    </div>
                </div>
                
                <nav class="flex-1 p-4 space-y-2">
                    <a href="#/dashboard" class="flex items-center space-x-3 bg-slate-800 text-white px-4 py-3 rounded-xl font-medium transition">
                        <i class="fa-solid fa-chart-pie text-blue-500"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#/" class="flex items-center space-x-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl font-medium transition">
                        <i class="fa-solid fa-globe"></i>
                        <span>Lihat Web Publik</span>
                    </a>
                </nav>

                <div class="p-4 border-t border-slate-800">
                    <button @click="$root.globalLogout()" class="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span>Keluar Sesi</span>
                    </button>
                </div>
            </aside>

            <main class="flex-1 p-8 overflow-y-auto">
                
                <header class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 class="text-2xl font-black text-gray-900">Selamat Datang, Petugas!</h1>
                        <p class="text-sm text-gray-500">Kelola dan selesaikan aspirasi layanan masyarakat hari ini.</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="text-right">
                            <span class="font-bold text-gray-900 block">{{ $root.user ? $root.user.nama_lengkap : 'Admin' }}</span>
                            <span class="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Sesi Aktif</span>
                        </div>
                        <div class="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            A
                        </div>
                    </div>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span class="text-sm font-semibold text-gray-400 uppercase">Total Aduan</span>
                            <h3 class="text-3xl font-black text-gray-900 mt-1">{{ totalAduan }}</h3>
                        </div>
                        <div class="p-4 bg-blue-50 text-blue-600 rounded-xl text-xl"><i class="fa-solid fa-layer-group"></i></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span class="text-sm font-semibold text-gray-400 uppercase">Butuh Proses</span>
                            <h3 class="text-3xl font-black text-amber-600 mt-1">{{ totalPending }}</h3>
                        </div>
                        <div class="p-4 bg-amber-50 text-amber-600 rounded-xl text-xl"><i class="fa-solid fa-clock"></i></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <span class="text-sm font-semibold text-gray-400 uppercase">Selesai Ditangani</span>
                            <h3 class="text-3xl font-black text-emerald-600 mt-1">{{ totalSelesai }}</h3>
                        </div>
                        <div class="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-xl"><i class="fa-solid fa-circle-check"></i></div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-bold text-gray-900">Manajemen Laporan Pengaduan</h2>
                        <button @click="fetchData" class="text-sm bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl border transition">
                            <i class="fa-solid fa-rotate-right"></i> Sinkronisasi Data
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-gray-400 text-xs uppercase font-bold border-b border-gray-100">
                                    <th class="px-6 py-4">Data Pelapor</th>
                                    <th class="px-6 py-4">Rincian Laporan</th>
                                    <th class="px-6 py-4 text-center">Status</th>
                                    <th class="px-6 py-4 text-center">Aksi Manajemen</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 text-sm text-gray-600">
                                <tr v-if="laporanList.length === 0">
                                    <td colspan="4" class="px-6 py-12 text-center text-gray-400 italic">Tidak ada laporan masuk di sistem.</td>
                                </tr>
                                <tr v-for="item in laporanList" :key="item.id" class="hover:bg-gray-50/50 transition">
                                    <td class="px-6 py-4">
                                        <span class="font-bold text-gray-900 block">{{ item.nama_pelapor }}</span>
                                        <span class="text-xs text-gray-400 block">{{ item.email_pelapor }}</span>
                                    </td>
                                    <td class="px-6 py-4 max-w-md">
                                        <span class="font-semibold text-gray-800 block mb-1">{{ item.judul_laporan }}</span>
                                        <p class="text-xs text-gray-400 line-clamp-2">{{ item.isi_laporan }}</p>
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <span :class="getStatusClass(item.status)" class="px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            {{ item.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <div class="flex items-center justify-center space-x-2">
                                            <button @click="bukaModalTanggapan(item)" class="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1">
                                                <i class="fa-solid fa-reply"></i>
                                                <span>Tanggapi</span>
                                            </button>
                                            <button @click="hapusLaporan(item.id)" class="bg-red-50 hover:bg-red-600 text-red-500 hover:text-white p-2 rounded-xl text-xs transition">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="modalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all border border-gray-100">
                        <div class="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 class="text-xl font-extrabold">Form Kendali Pengaduan</h3>
                                <p class="text-xs text-blue-200 mt-0.5">Pelapor: {{ activeLaporan.nama_pelapor }}</p>
                            </div>
                            <button @click="modalOpen = false" class="text-white/80 hover:text-white text-xl"><i class="fa-solid fa-xmark"></i></button>
                        </div>

                        <div class="p-6 space-y-4">
                            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                                <span class="font-bold text-gray-700 block mb-1">Isi Pengaduan Warga:</span>
                                <p class="text-gray-500 leading-relaxed italic">"{{ activeLaporan.isi_laporan }}"</p>
                            </div>

                            <div>
                                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Perbarui Status Aduan</label>
                                <select v-model="statusUpdate" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-medium">
                                    <option value="Pending">Pending (Belum Direspons)</option>
                                    <option value="Proses">Proses (Dalam Peninjauan)</option>
                                    <option value="Selesai">Selesai (Aspirasi Dituntaskan)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Teks Tanggapan Resmi Petugas</label>
                                <textarea v-model="teksTanggapan" rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition text-sm" placeholder="Ketikkan tanggapan atau tindakan solusi dinas resmi di sini..."></textarea>
                            </div>
                        </div>

                        <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                            <button @click="modalOpen = false" class="px-5 py-2.5 bg-white border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                            <button @click="simpanTanggapanDanStatus" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition">
                                Simpan Aksi Resmi
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    `,
    data() {
        return {
            laporanList: [],
            modalOpen: false,
            activeLaporan: null,
            statusUpdate: '',
            teksTanggapan: ''
        };
    },
    computed: {
        totalAduan() { return this.laporanList.length; },
        totalPending() { return this.laporanList.filter(l => l.status === 'Pending' || l.status === 'Proses').length; },
        totalSelesai() { return this.laporanList.filter(l => l.status === 'Selesai').length; }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        // Ambil data laporan masyarakat dari endpoint terproteksi token backend
        fetchData() {
            axios.get('http://localhost:8080/api/pengaduan')
                .then(res => {
                    this.laporanList = res.data.data;
                })
                .catch(err => {
                    console.error('Gagal mengambil manajemen aduan:', err);
                });
        },
        // Buka jendela kendali modal tanggapan
        bukaModalTanggapan(laporan) {
            this.activeLaporan = laporan;
            this.statusUpdate = laporan.status;
            this.teksTanggapan = '';
            this.modalOpen = true;
        },
        // Eksekusi Simpan Perubahan Status (PUT) sekaligus input data Tanggapan Baru (POST)
        simpanTanggapanDanStatus() {
            if (!this.teksTanggapan.trim()) {
                alert('Teks tanggapan resmi tidak boleh kosong!');
                return;
            }

            const apiUrl = 'http://localhost:8080/api';

            // Langkah 1: Tembak perubahan status aduan ke tabel pengaduan (PUT) [Routes.php, Pengaduan.php]
            axios.put(`${apiUrl}/pengaduan/${this.activeLaporan.id}`, { status: this.statusUpdate })
                .then(() => {
                    // Langkah 2: Masukkan teks tanggapan ke tabel tanggapan (POST relasional 3 tabel) [Tanggapan.php]
                    return axios.post(`${apiUrl}/tanggapan`, {
                        pengaduan_id: this.activeLaporan.id,
                        isi_tanggapan: this.teksTanggapan
                    });
                })
                .then(() => {
                    alert('Sukses! Status diperbarui dan tanggapan resmi berhasil diterbitkan.');
                    this.modalOpen = false;
                    this.fetchData(); // Refresh isi tabel dashboard
                })
                .catch(err => {
                    alert('Gagal mengeksekusi aksi. Periksa hak akses otentikasi Anda!');
                });
        },
        // Aksi menghapus laporan pengaduan palsu dari sistem (DELETE) [Pengaduan.php]
        hapusLaporan(id) {
            if (confirm('Apakah Anda yakin ingin menghapus permanen laporan aduan warga ini?')) {
                axios.delete(`http://localhost:8080/api/pengaduan/${id}`)
                    .then(res => {
                        alert('Laporan pengaduan sukses dihapus dari arsip.');
                        this.fetchData();
                    })
                    .catch(err => {
                        alert('Gagal menghapus data laporan!');
                    });
            }
        },
        // Desain warna dinamis status badge
        getStatusClass(status) {
            if (status === 'Pending') return 'bg-amber-50 text-amber-700 border border-amber-200';
            if (status === 'Proses') return 'bg-blue-50 text-blue-700 border border-blue-200';
            return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        }
    }
};

export default Dashboard;