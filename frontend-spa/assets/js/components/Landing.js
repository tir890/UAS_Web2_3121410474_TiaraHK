const Landing = {
    template: `
        <nav class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="bg-white text-blue-700 p-2 rounded-xl shadow-inner">
                        <i class="fa-solid fa-bullhorn text-xl animate-bounce"></i>
                    </div>
                    <div>
                        <span class="font-extrabold text-xl tracking-tight block">E-REPORT</span>
                        <span class="text-xs text-blue-200 block -mt-1">Layanan Pengaduan Masyarakat</span>
                    </div>
                </div>
                <div class="flex items-center space-x-6">
                    <a href="#/" class="font-medium hover:text-blue-200 transition">Beranda</a>
                    <router-link to="/login" class="bg-white text-blue-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-50 transition flex items-center space-x-2">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>Portal Admin</span>
                    </router-link>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div class="lg:col-span-7 space-y-8">
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Suara Anda, <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perubahan Kita</span>
                    </h1>
                    <p class="text-gray-600 leading-relaxed">
                        Laporkan keluhan, pengaduan, atau aspirasi Anda mengenai layanan publik di lingkungan masyarakat. Laporan Anda akan diproses langsung oleh petugas terkait demi kenyamanan bersama.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-900 flex items-center space-x-2">
                            <i class="fa-solid fa-list-check text-blue-600"></i>
                            <span>Daftar Pengaduan Masuk</span>
                        </h2>
                        <button @click="loadPengaduan" class="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl hover:bg-gray-200 transition flex items-center space-x-1">
                            <i class="fa-solid fa-rotate animate-spin" v-if="loading"></i>
                            <i class="fa-solid fa-arrow-rotate-right" v-else></i>
                            <span>Refresh</span>
                        </button>
                    </div>

                    <div class="overflow-x-auto rounded-2xl border border-gray-100">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                    <th class="px-4 py-3">Pelapor</th>
                                    <th class="px-4 py-3">Judul Aduan</th>
                                    <th class="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 text-sm">
                                <tr v-if="listAduan.length === 0">
                                    <td colspan="3" class="px-4 py-8 text-center text-gray-400 italic">Belum ada pengaduan masyarakat yang terdaftar.</td>
                                </tr>
                                <tr v-for="aduan in listAduan" :key="aduan.id" class="hover:bg-gray-50/70 transition">
                                    <td class="px-4 py-3 font-medium text-gray-900">{{ aduan.nama_pelapor }}</td>
                                    <td class="px-4 py-3">
                                        <span class="font-semibold block text-gray-800">{{ aduan.judul_laporan }}</span>
                                        <span class="text-xs text-gray-400">{{ aduan.isi_laporan }}</span>
                                    </td>
                                    <td class="px-4 py-3 text-center">
                                        <span :class="getStatusClass(aduan.status)" class="px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                                            {{ aduan.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-5">
                <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                        <i class="fa-solid fa-pen-to-square text-blue-600"></i>
                        <span>Sampaikan Laporan Anda</span>
                    </h3>

                    <form @submit.prevent="kirimLaporan" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                            <input v-model="form.nama_pelapor" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" placeholder="Masukkan nama Anda">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Alamat Email</label>
                            <input v-model="form.email_pelapor" type="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" placeholder="nama@email.com">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Judul Pengaduan</label>
                            <input v-model="form.judul_laporan" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" placeholder="Ringkasan keluhan Anda">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Isi Laporan / Kronologi</label>
                            <textarea v-model="form.isi_laporan" rows="4" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none resize-none" placeholder="Ceritakan detail masalah secara jelas..."></textarea>
                        </div>

                        <button type="submit" :disabled="submitting" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:opacity-95 transition flex justify-center items-center space-x-2 disabled:opacity-50">
                            <i class="fa-solid fa-spinner animate-spin" v-if="submitting"></i>
                            <i class="fa-solid fa-paper-plane" v-else></i>
                            <span>Kirim Laporan Resmi</span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    `,
    data() {
        return {
            listAduan: [],
            loading: false,
            submitting: false,
            form: {
                nama_pelapor: '',
                email_pelapor: '',
                judul_laporan: '',
                isi_laporan: ''
            }
        };
    },
    mounted() {
        this.loadPengaduan();
    },
    methods: {
        // Ambil data pengaduan secara real dari server CI4
        loadPengaduan() {
            this.loading = true;
            axios.get('http://localhost:8080/api/pengaduan')
                .then(res => {
                    this.listAduan = res.data.data;
                })
                .catch(err => {
                    console.error('Gagal mengambil data aduan:', err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // Kirim aduan baru ke database backend
        kirimLaporan() {
            this.submitting = true;
            axios.post('http://localhost:8080/api/pengaduan', this.form)
                .then(res => {
                    alert('Sukses! Laporan pengaduan Anda telah berhasil dikirim.');
                    // Reset form isian
                    this.form.nama_pelapor = '';
                    this.form.email_pelapor = '';
                    this.form.judul_laporan = '';
                    this.form.isi_laporan = '';
                    // Muat ulang isi tabel
                    this.loadPengaduan();
                })
                .catch(err => {
                    alert('Gagal mengirim laporan. Cek koneksi server Anda!');
                })
                .finally(() => {
                    this.submitting = false;
                });
        },
        // Pewarnaan status badge dinamis Tailwind
        getStatusClass(status) {
            if (status === 'Pending') return 'bg-amber-50 text-amber-700 border border-amber-200';
            if (status === 'Proses') return 'bg-blue-50 text-blue-700 border border-blue-200';
            return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        }
    }
};

export default Landing;