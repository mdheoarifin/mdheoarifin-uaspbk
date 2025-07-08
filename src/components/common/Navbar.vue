<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/dashboard" class="navbar-brand">
          Toko Makanan Online
        </router-link>
        
        <div class="navbar-menu">
          <!-- Admin Menu -->
          <template v-if="userRole === 'admin'">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/produk" class="nav-link">Produk</router-link>
            <router-link to="/pesanan" class="nav-link">Pesanan</router-link>
            <router-link to="/laporan" class="nav-link">Laporan</router-link>
          </template>
          
          <!-- Staf Menu -->
          <template v-else-if="userRole === 'staf'">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/pesanan" class="nav-link">Pesanan</router-link>
          </template>
          
          <!-- Pelanggan Menu -->
          <template v-else-if="userRole === 'pelanggan'">
            <router-link to="/menu" class="nav-link">Menu</router-link>
            <router-link to="/keranjang" class="nav-link">
              Keranjang ({{ itemCount }})
            </router-link>
            <router-link to="/riwayat-pesanan" class="nav-link">Riwayat</router-link>
          </template>
          
          <router-link to="/profil" class="nav-link">Profil</router-link>
          <button @click="handleLogout" class="nav-link logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useKeranjangStore } from '../../stores/keranjang'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const keranjangStore = useKeranjangStore()
    
    const userRole = computed(() => authStore.userRole)
    const itemCount = computed(() => keranjangStore.itemCount)
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/login')
    }
    
    return {
      userRole,
      itemCount,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
  padding: 1rem 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: none;
  border: 1px solid white;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>