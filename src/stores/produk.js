import { defineStore } from 'pinia'
import api from '../services/api'

export const useProdukStore = defineStore('produk', {
  state: () => ({
    produkList: [],
    selectedProduk: null,
    loading: false,
    error: null
  }),

  getters: {
    produkAktif: (state) => state.produkList.filter(p => p.stok > 0),
    produkByKategori: (state) => (kategori) => {
      return state.produkList.filter(p => p.kategori === kategori)
    }
  },

  actions: {
    async fetchProduk() {
      this.loading = true
      try {
        const response = await api.get('/produk')
        this.produkList = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async getProdukById(id) {
      try {
        const response = await api.get(`/produk/${id}`)
        this.selectedProduk = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        return null
      }
    },

    async createProduk(produkData) {
      try {
        const response = await api.post('/produk', produkData)
        this.produkList.push(response.data)
        return { success: true, data: response.data }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async updateProduk(id, produkData) {
      try {
        const response = await api.put(`/produk/${id}`, produkData)
        const index = this.produkList.findIndex(p => p.id === id)
        if (index !== -1) {
          this.produkList[index] = response.data
        }
        return { success: true, data: response.data }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async deleteProduk(id) {
      try {
        await api.delete(`/produk/${id}`)
        this.produkList = this.produkList.filter(p => p.id !== id)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  }
})