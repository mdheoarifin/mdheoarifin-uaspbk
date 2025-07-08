<template>
  <div class="container">
    <h1>Dashboard Staf</h1>
    
    <div class="dashboard-grid">
      <div class="stat-card">
        <h3>Pesanan Baru</h3>
        <p class="stat-number">{{ pesananBaru }}</p>
      </div>
      
      <div class="stat-card">
        <h3>Pesanan Diproses</h3>
        <p class="stat-number">{{ pesananDiproses }}</p>
      </div>
      
      <div class="stat-card">
        <h3>Pesanan Dikirim</h3>
        <p class="stat-number">{{ pesananDikirim }}</p>
      </div>
      
      <div class="stat-card">
        <h3>Selesai Hari Ini</h3>
        <p class="stat-number">{{ pesananSelesaiHariIni }}</p>
      </div>
    </div>
    
    <div class="quick-actions">
      <h2>Aksi Cepat</h2>
      <div class="action-buttons">
        <router-link to="/pesanan" class="btn btn-primary">
          Kelola Pesanan
        </router-link>
      </div>
    </div>
    
    <div class="recent-orders">
      <h2>Pesanan Perlu Diproses</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pelanggan</th>
            <th>Total</th>
            <th>Status</th>
            <th>Waktu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pesanan in pesananMenunggu" :key="pesanan.id">
            <td>#{{ pesanan.id }}</td>
            <td>{{ getUserName(pesanan.userId) }}</td>
            <td>{{ formatRupiah(pesanan.total) }}</td>
            <td>
              <span class="status-badge" :style="{ backgroundColor: getStatusColor(pesanan.status) }">
                {{ pesanan.status }}
              </span>
            </td>
            <td>{{ getElapsedTime(pesanan.tanggal) }}</td>
            <td>
              <button 
                @click="updateStatus(pesanan.id, 'dikirim')"
                class="btn btn-secondary btn-sm"
              >
                Proses
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { usePesananStore } from '../../stores/pesanan'
import { formatRupiah, getStatusColor } from '../../utils/helpers'
import api from '../../services/api'

export default {
  name: 'DashboardStaf',
  setup() {
    const pesananStore = usePesananStore()
    const users = ref([])
    
    const pesananBaru = computed(() => 
      pesananStore.pesananByStatus('diproses').length
    )
    
    const pesananDiproses = computed(() => 
      pesananStore.pesananByStatus('diproses').length
    )
    
    const pesananDikirim = computed(() => 
      pesananStore.pesananByStatus('dikirim').length
    )
    
    const pesananSelesaiHariIni = computed(() => {
      const today = new Date().toDateString()
      return pesananStore.pesananByStatus('selesai')
        .filter(p => new Date(p.tanggal).toDateString() === today).length
    })
    
    const pesananMenunggu = computed(() => 
      pesananStore.pesananByStatus('diproses').slice(0, 5)
    )
    
    const getUserName = (userId) => {
      const user = users.value.find(u => u.id === userId)
      return user?.nama || 'Unknown'
    }
    
    const getElapsedTime = (dateString) => {
      const date = new Date(dateString)
      const now = new Date()
      const diff = Math.floor((now - date) / 1000 / 60) // minutes
      
      if (diff < 60) {
        return `${diff} menit lalu`
      } else if (diff < 1440) {
        return `${Math.floor(diff / 60)} jam lalu`
      } else {
        return `${Math.floor(diff / 1440)} hari lalu`
      }
    }
    
    const updateStatus = async (id, status) => {
      const result = await pesananStore.updateStatusPesanan(id, status)
      if (!result.success) {
        alert('Gagal mengupdate status: ' + result.error)
      }
    }
    
    onMounted(async () => {
      await pesananStore.fetchPesanan()
      
      // Fetch users
      const response = await api.get('/users')
      users.value = response.data
    })
    
    return {
      pesananBaru,
      pesananDiproses,
      pesananDikirim,
      pesananSelesaiHariIni,
      pesananMenunggu,
      getUserName,
      getElapsedTime,
      updateStatus,
      formatRupiah,
      getStatusColor
    }
  }
}
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.recent-orders {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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