<template>
  <div class="container">
    <h1>Riwayat Pesanan</h1>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else-if="pesananList.length === 0" class="empty-state">
      <p>Belum ada riwayat pesanan</p>
      <router-link to="/menu" class="btn btn-primary">
        Mulai Belanja
      </router-link>
    </div>
    
    <div v-else class="pesanan-list">
      <div v-for="pesanan in pesananList" :key="pesanan.id" class="pesanan-card">
        <div class="pesanan-header">
          <div>
            <h3>Pesanan #{{ pesanan.id }}</h3>
            <p class="pesanan-date">{{ formatTanggal(pesanan.tanggal) }}</p>
          </div>
          <span 
            class="status-badge" 
            :style="{ backgroundColor: getStatusColor(pesanan.status) }"
          >
            {{ pesanan.status }}
          </span>
        </div>
        
        <div class="pesanan-items">
          <div v-for="item in pesanan.items" :key="item.produkId" class="pesanan-item">
            <span>{{ item.nama }}</span>
            <span>{{ item.jumlah }} x {{ formatRupiah(item.harga) }}</span>
          </div>
        </div>
        
        <div class="pesanan-footer">
          <div class="alamat">
            <strong>Alamat:</strong> {{ pesanan.alamat }}
          </div>
          <div class="total">
            <strong>Total:</strong> {{ formatRupiah(pesanan.total) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { usePesananStore } from '../../stores/pesanan'
import { useAuthStore } from '../../stores/auth'
import { formatRupiah, formatTanggal, getStatusColor } from '../../utils/helpers'

export default {
  name: 'RiwayatPesanan',
  setup() {
    const pesananStore = usePesananStore()
    const authStore = useAuthStore()
    
    const loading = computed(() => pesananStore.loading)
    const pesananList = computed(() => {
      return pesananStore.pesananByUser(authStore.user.id)
        .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    })
    
    onMounted(() => {
      pesananStore.fetchPesanan()
    })
    
    return {
      loading,
      pesananList,
      formatRupiah,
      formatTanggal,
      getStatusColor
    }
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
}

.empty-state p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #666;
}

.pesanan-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pesanan-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pesanan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.pesanan-header h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.pesanan-date {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.pesanan-items {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.pesanan-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.pesanan-item:last-child {
  margin-bottom: 0;
}

.pesanan-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.alamat {
  flex: 1;
  margin-right: 2rem;
  font-size: 0.875rem;
}

.total {
  font-size: 1.1rem;
}
</style>