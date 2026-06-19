const Login = {
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                
                <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100 mb-4">
                        <i class="fa-solid fa-shield-halved text-2xl"></i>
                    </div>
                    <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Portal Petugas</h2>
                    <p class="mt-2 text-sm text-gray-500">
                        Silakan masuk untuk mengelola pengaduan masyarakat
                    </p>
                </div>

                <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center space-x-2">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span>{{ errorMessage }}</span>
                </div>

                <form @submit.prevent="prosesLogin" class="mt-8 space-y-5">
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Username</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <i class="fa-solid fa-user"></i>
                            </span>
                            <input v-model="username" type="text" required class="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" placeholder="Masukkan username">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                <i class="fa-solid fa-lock"></i>
                            </span>
                            <input v-model="password" type="password" required class="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" placeholder="••••••••">
                        </div>
                    </div>

                    <div class="pt-2">
                        <button type="submit" :disabled="loading" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:opacity-95 transition flex justify-center items-center space-x-2 disabled:opacity-50">
                            <i class="fa-solid fa-spinner animate-spin" v-if="loading"></i>
                            <i class="fa-solid fa-right-to-bracket" v-else></i>
                            <span>Masuk ke Panel Admin</span>
                        </button>
                    </div>
                </form>

                <div class="text-center mt-4">
                    <router-link to="/" class="text-sm font-medium text-blue-600 hover:text-blue-500 transition flex items-center justify-center space-x-1">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Kembali ke Beranda</span>
                    </router-link>
                </div>

            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            errorMessage: null
        };
    },
    methods: {
        prosesLogin() {
            this.loading = true;
            this.errorMessage = null;

            // Mengirim data kredensial ke server backend CI4
            axios.post('http://localhost:8080/api/login', {
                username: this.username,
                password: this.password
            })
            .then(res => {
                // Simpan token keamanan dan sesi ke memori lokal browser [SPA_Security_Blueprint]
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // Sinkronkan state global di app.js secara reaktif [app.js]
                this.$root.isLoggedIn = true;
                this.$root.token = res.data.token;
                this.$root.user = res.data.user;

                // Alihkan halaman ke dashboard panel admin secara instan [app.js]
                this.$router.push('/dashboard');
            })
            .catch(err => {
                if (err.response && err.response.data.messages) {
                    this.errorMessage = err.response.data.messages.error || 'Username atau password salah!';
                } else {
                    this.errorMessage = 'Tidak dapat terhubung ke server backend!';
                }
            })
            .finally(() => {
                this.loading = false;
            });
        }
    }
};

export default Login;