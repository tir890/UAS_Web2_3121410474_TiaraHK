// 1. State Global
const appState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    apiUrl: 'http://localhost:8080' // Base URL Backend CI4
};

// 2. Impor Komponen
import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';

// 3. Rute Vue Router
const routes = [
    { path: '/', component: Landing },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// 4. Satpam Rute (Navigation Guard)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        alert('Akses Ditolak! Anda harus login.');
        next({ path: '/login' });
    } else {
        next();
    }
});

// 5. Axios Interceptors (Sisipkan Token)
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        alert('Sesi habis atau token tidak valid. Silakan login kembali.');
        localStorage.clear();
        appState.isLoggedIn = false;
        appState.token = null;
        appState.user = null;
        window.location.href = '#/login';
    }
    return Promise.reject(error);
});

// 6. Mount App
const app = Vue.createApp({
    data() { return appState; },
    methods: {
        globalLogout() {
            localStorage.clear();
            this.isLoggedIn = false;
            this.token = null;
            this.user = null;
            this.$router.push('/login');
        }
    }
});

app.use(router);
window.onload = () => app.mount('#app');