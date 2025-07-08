<template>
  <div class="container">
    <h1>Dashboard Admin</h1>
    
    <div class="dashboard-grid">
      <div class="stat-card">
        <h3>Total Produk</h3>
        <p class="stat-number">{{ totalProduk }}</p>
      </div>
      
      <div class="stat-card">
        <h3>Pesanan Hari Ini</h3>
        <p class="stat-number">{{ pesananHariIni }}</p>
      </div>
      
      <div class="stat-card">
        <h3>Pendapatan Hari Ini</h3>
        <p class="stat-number">{{ formatRupiah(pendapatanHariIni) }}</p>
      </div>
      
      <div class="stat-card">
        <h3>Total Pelanggan</h3>
        <p class="stat-number">{{ totalPelanggan }}</p>
      </div>
    </div>
    
    <div class="recent-orders">
      <h2>Pesanan Terbaru</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pelanggan</th>
            <th>Total</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pesanan in recentPesanan" :key="pesanan.id">
            <td>#{{ pesanan.id }}</td>
            <td>{{ getUserName(pesanan.userId) }}</td>
            <td>{{ formatRupiah(pesanan.total) }}</td>
            <td>
              <span class="status-badge" :style="{ backgroundColor: getStatusColor(pesanan.status) }">
                {{ pesanan.status }}
              </span>
            </td>
            <td>{{ formatTanggal(pesanan.tanggal) }}</td>
            <td>
              <router-link :to="`/pesanan`" class="btn btn-secondary btn-sm">
                Detail
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useProdukStore } from '../../stores/produk'
import { usePesananStore } from '../../stores/pesanan'
import { formatRupiah, formatTanggal, getStatusColor } from '../../utils/helpers'
import api from '../../services/api'

export default {
  name: 'DashboardAdmin',
  setup() {
    const produkStore = useProdukStore()
    const pesananStore = usePesananStore()
    const users = ref([])
    
    const totalProduk = computed(() => produkStore.produkList.length)
    
    const pesananHariIni = computed(() => {
      const today = new Date().toDateString()
      return pesananStore.pesananList.filter(p => 
        new Date(p.tanggal).toDateString() === today
      ).length
    })
    
    const pendapatanHariIni = computed(() => {
      const today = new Date().toDateString()
      return pesananStore.pesananList
        .filter(p => new Date(p.tanggal).toDateString() === today)
        .reduce((sum, p) => sum + p.total, 0)
    })
    
    const totalPelanggan = computed(() => 
      users.value.filter(u => u.role === 'pelanggan').length
    )
    
    const recentPesanan = computed(() => 
      pesananStore.pesananList.slice(0, 5)
    )
    
    const getUserName = (userId) => {
      const user = users.value.find(u => u.id === userId)
      return user?.nama || 'Unknown'
    }
    
    onMounted(async () => {
      await produkStore.fetchProduk()
      await pesananStore.fetchPesanan()
      
      // Fetch users
      const response = await api.get('/users')
      users.value = response.data
    })
    
    return {
      totalProduk,
      pesananHariIni,
      pendapatanHariIni,
      totalPelanggan,
      recentPesanan,
      getUserName,
      formatRupiah,
      formatTanggal,
      getStatusColor
    }
  }
}
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.recent-orders {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
</style>