import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Import Views
import LandingPage from '../views/LandingPage.vue'
import LoginView from '../views/auth/LoginView.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'
import DashboardStaf from '../views/staf/DashboardStaf.vue'
import ProdukList from '../views/admin/ProdukList.vue'
import ProdukTambah from '../views/admin/ProdukTambah.vue'
import ProdukEdit from '../views/admin/ProdukEdit.vue'
import MenuView from '../views/pelanggan/MenuView.vue'
import KeranjangView from '../views/pelanggan/KeranjangView.vue'
import PesananList from '../views/staf/PesananList.vue'
import RiwayatPesanan from '../views/pelanggan/RiwayatPesanan.vue'
import LaporanView from '../views/admin/LaporanView.vue'
import ProfilView from '../views/ProfilView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
    meta: { requiresAuth: false, hideNavbar: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false, hideNavbar: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => {
      const authStore = useAuthStore()
      const role = authStore.user?.role
      console.log('Dashboard route - User role:', role)
      
      if (role === 'admin') {
        return import('../views/admin/DashboardAdmin.vue')
      } else if (role === 'staf') {
        return import('../views/staf/DashboardStaf.vue')
      } else {
        // Default to menu for pelanggan
        return import('../views/pelanggan/MenuView.vue')
      }
    },
    meta: { requiresAuth: true }
  },
  // Admin Routes
  {
    path: '/produk',
    name: 'produk-list',
    component: ProdukList,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/produk/tambah',
    name: 'produk-tambah',
    component: ProdukTambah,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/produk/edit/:id',
    name: 'produk-edit',
    component: ProdukEdit,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/laporan',
    name: 'laporan',
    component: LaporanView,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  // Pelanggan Routes
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
    meta: { requiresAuth: true, roles: ['pelanggan', 'admin'] }
  },
  {
    path: '/keranjang',
    name: 'keranjang',
    component: KeranjangView,
    meta: { requiresAuth: true, roles: ['pelanggan'] }
  },
  {
    path: '/riwayat-pesanan',
    name: 'riwayat-pesanan',
    component: RiwayatPesanan,
    meta: { requiresAuth: true, roles: ['pelanggan'] }
  },
  // Staf Routes
  {
    path: '/pesanan',
    name: 'pesanan-list',
    component: PesananList,
    meta: { requiresAuth: true, roles: ['admin', 'staf'] }
  },
  // Shared Routes
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  console.log('Route Guard - To:', to.path)
  console.log('Route Guard - Authenticated:', authStore.isAuthenticated)
  console.log('Route Guard - User:', authStore.user)
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Route Guard - Redirecting to login')
    next('/login')
    return
  }
  
  // Check role-based access
  if (to.meta.roles && authStore.user) {
    const userRole = authStore.user.role
    if (!to.meta.roles.includes(userRole)) {
      console.log('Route Guard - Role not allowed:', userRole)
      // Redirect to appropriate dashboard
      if (userRole === 'admin') {
        next('/dashboard')
      } else if (userRole === 'staf') {
        next('/dashboard')
      } else if (userRole === 'pelanggan') {
        next('/menu')
      } else {
        next('/')
      }
      return
    }
  }
  
  next()
})

export default router