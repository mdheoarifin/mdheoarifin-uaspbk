import { defineStore } from 'pinia'
import api from '../services/api'
import { useAuthStore } from './auth'
import { useKeranjangStore } from './keranjang'

export const usePesananStore = defineStore('pesanan', {
  state: () => ({
    pesananList: [],
    selectedPesanan: null,
    loading: false,
    error: null
  }),

  getters: {
    pesananByStatus: (state) => (status) => {
      return state.pesananList.filter(p => p.status === status)
    },
    pesananByUser: (state) => (userId) => {
      return state.pesananList.filter(p => p.userId === userId)
    }
  },

  actions: {
    async fetchPesanan() {
      this.loading = true
      try {
        const authStore = useAuthStore()
        let response
        
        if (authStore.userRole === 'pelanggan') {
          response = await api.get('/pesanan', {
            params: { userId: authStore.user.id }
          })
        } else {
          response = await api.get('/pesanan')
        }
        
        this.pesananList = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createPesanan(alamat) {
      try {
        const authStore = useAuthStore()
        const keranjangStore = useKeranjangStore()
        
        const pesananData = {
          userId: authStore.user.id,
          items: keranjangStore.items,
          total: keranjangStore.totalHarga,
          status: 'diproses',
          tanggal: new Date().toISOString(),
          alamat: alamat
        }
        
        const response = await api.post('/pesanan', pesananData)
        this.pesananList.push(response.data)
        
        // Clear keranjang after successful order
        keranjangStore.clearKeranjang()
        
        return { success: true, data: response.data }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async updateStatusPesanan(id, status) {
      try {
        const pesanan = this.pesananList.find(p => p.id === id)
        if (!pesanan) throw new Error('Pesanan tidak ditemukan')
        
        const updatedPesanan = { ...pesanan, status }
        const response = await api.put(`/pesanan/${id}`, updatedPesanan)
        
        const index = this.pesananList.findIndex(p => p.id === id)
        if (index !== -1) {
          this.pesananList[index] = response.data
        }
        
        return { success: true, data: response.data }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async getLaporanPenjualan(startDate, endDate) {
      try {
        const response = await api.get('/pesanan')
        const allPesanan = response.data
        
        // Filter by date range and status selesai
        const filtered = allPesanan.filter(p => {
          const pesananDate = new Date(p.tanggal)
          const start = new Date(startDate)
          const end = new Date(endDate)
          end.setHours(23, 59, 59, 999)
          
          return p.status === 'selesai' && 
                 pesananDate >= start && 
                 pesananDate <= end
        })
        
        // Calculate summary
        const summary = {
          totalPesanan: filtered.length,
          totalPendapatan: filtered.reduce((sum, p) => sum + p.total, 0),
          pesanan: filtered
        }
        
        return { success: true, data: summary }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  }
})