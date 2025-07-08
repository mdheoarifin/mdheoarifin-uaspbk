<template>
  <div class="container">
    <h1>Kelola Pesanan</h1>
    
    <div class="filter-section">
      <select v-model="filterStatus" class="form-control filter-select">
        <option value="">Semua Status</option>
        <option value="diproses">Diproses</option>
        <option value="dikirim">Dikirim</option>
        <option value="selesai">Selesai</option>
        <option value="dibatalkan">Dibatalkan</option>
      </select>
    </div>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="pesanan-table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pelanggan</th>
            <th>Items</th>
            <th>Total</th>
            <th>Alamat</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pesanan in filteredPesanan" :key="pesanan.id">
            <td>#{{ pesanan.id }}</td>
            <td>{{ getUserName(pesanan.userId) }}</td>
            <td>
              <div v-for="item in pesanan.items" :key="item.produkId" class="item-list">
                {{ item.nama }} ({{ item.jumlah }}x)
              </div>
            </td>
            <td>{{ formatRupiah(pesanan.total) }}</td>
            <td class="alamat-cell">{{ pesanan.alamat }}</td>
            <td>
              <span 
                class="status-badge" 
                :style="{ backgroundColor: getStatusColor(pesanan.status) }"
              >
                {{ pesanan.status }}
              </span>
            </td>
            <td>{{ formatTanggal(pesanan.tanggal) }}</td>
            <td>
              <select 
                :value="pesanan.status"
                @change="updateStatus(pesanan.id, $event.target.value)"
                class="form-control status-select"
              >
                <option value="diproses">Diproses</option>
                <option value="dikirim">Dikirim</option>
                <option value="selesai">Selesai</option>
                <option value="dibatalkan">Dibatalkan</option>
              </select>
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
import { formatRupiah, formatTanggal, getStatusColor } from '../../utils/helpers'
import api from '../../services/api'

export default {
  name: 'PesananList',
  setup() {
    const pesananStore = usePesananStore()
    const users = ref([])
    const filterStatus = ref('')
    
    const loading = computed(() => pesananStore.loading)
    
    const filteredPesanan = computed(() => {
      if (!filterStatus.value) {
        return pesananStore.pesananList
      }
      return pesananStore.pesananByStatus(filterStatus.value)
    })
    
    const getUserName = (userId) => {
      const user = users.value.find(u => u.id === userId)
      return user?.nama || 'Unknown'
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
      loading,
      filterStatus,
      filteredPesanan,
      getUserName,
      updateStatus,
      formatRupiah,
      formatTanggal,
      getStatusColor
    }
  }
}
</script>

<style scoped>
.filter-section {
  margin-bottom: 1.5rem;
}

.filter-select {
  max-width: 200px;
}

.pesanan-table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-list {
  font-size: 0.875rem;
  color: #666;
}

.alamat-cell {
  max-width: 200px;
  font-size: 0.875rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.status-select {
  min-width: 120px;
  padding: 0.25rem;
  font-size: 0.875rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}
</style>