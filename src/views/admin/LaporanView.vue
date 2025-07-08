<template>
  <div class="container">
    <h1>Laporan Penjualan</h1>
    
    <div class="filter-card">
      <h3>Filter Laporan</h3>
      <div class="filter-form">
        <div class="form-group">
          <label for="startDate" class="form-label">Tanggal Mulai</label>
          <input
            type="date"
            id="startDate"
            v-model="startDate"
            class="form-control"
            :max="endDate"
          />
        </div>
        
        <div class="form-group">
          <label for="endDate" class="form-label">Tanggal Akhir</label>
          <input
            type="date"
            id="endDate"
            v-model="endDate"
            class="form-control"
            :min="startDate"
            :max="today"
          />
        </div>
        
        <button @click="generateReport" class="btn btn-primary">
          Generate Laporan
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="loading">Generating laporan...</div>
    
    <div v-if="reportData && !loading" class="report-content">
      <div class="summary-cards">
        <div class="summary-card">
          <h4>Total Pesanan</h4>
          <p class="summary-value">{{ reportData.totalPesanan }}</p>
        </div>
        <div class="summary-card">
          <h4>Total Pendapatan</h4>
          <p class="summary-value">{{ formatRupiah(reportData.totalPendapatan) }}</p>
        </div>
        <div class="summary-card">
          <h4>Rata-rata per Pesanan</h4>
          <p class="summary-value">
            {{ formatRupiah(reportData.totalPesanan > 0 ? reportData.totalPendapatan / reportData.totalPesanan : 0) }}
          </p>
        </div>
      </div>
      
      <div class="detail-section">
        <h3>Detail Pesanan</h3>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pesanan in reportData.pesanan" :key="pesanan.id">
                <td>#{{ pesanan.id }}</td>
                <td>{{ formatTanggal(pesanan.tanggal) }}</td>
                <td>{{ getUserName(pesanan.userId) }}</td>
                <td>
                  <div v-for="item in pesanan.items" :key="item.produkId" class="item-detail">
                    {{ item.nama }} ({{ item.jumlah }}x)
                  </div>
                </td>
                <td>{{ formatRupiah(pesanan.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="export-section">
          <button @click="exportReport" class="btn btn-secondary">
            Export ke CSV
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePesananStore } from '../../stores/pesanan'
import { formatRupiah, formatTanggal } from '../../utils/helpers'
import api from '../../services/api'

export default {
  name: 'LaporanView',
  setup() {
    const pesananStore = usePesananStore()
    
    const today = new Date().toISOString().split('T')[0]
    const startDate = ref(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const endDate = ref(today)
    const loading = ref(false)
    const reportData = ref(null)
    const users = ref([])
    
    const getUserName = (userId) => {
      const user = users.value.find(u => u.id === userId)
      return user?.nama || 'Unknown'
    }
    
    const generateReport = async () => {
      loading.value = true
      const result = await pesananStore.getLaporanPenjualan(startDate.value, endDate.value)
      
      if (result.success) {
        reportData.value = result.data
      } else {
        alert('Gagal generate laporan: ' + result.error)
      }
      
      loading.value = false
    }
    
    const exportReport = () => {
      if (!reportData.value) return
      
      // Create CSV content
      const headers = ['ID', 'Tanggal', 'Pelanggan', 'Items', 'Total']
      const rows = reportData.value.pesanan.map(p => [
        p.id,
        formatTanggal(p.tanggal),
        getUserName(p.userId),
        p.items.map(i => `${i.nama} (${i.jumlah}x)`).join(', '),
        p.total
      ])
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')
      
      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `laporan-penjualan-${startDate.value}-${endDate.value}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
    
    onMounted(async () => {
      // Fetch users
      const response = await api.get('/users')
      users.value = response.data
      
      // Generate initial report
      generateReport()
    })
    
    return {
      today,
      startDate,
      endDate,
      loading,
      reportData,
      getUserName,
      generateReport,
      exportReport,
      formatRupiah,
      formatTanggal
    }
  }
}
</script>

<style scoped>
.filter-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.filter-form {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.summary-card h4 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.detail-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-container {
  overflow-x: auto;
  margin: 1rem 0;
}

.item-detail {
  font-size: 0.875rem;
  color: #666;
}

.export-section {
  margin-top: 1.5rem;
  text-align: right;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}
</style>