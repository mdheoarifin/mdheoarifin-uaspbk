import { defineStore } from 'pinia'

export const useKeranjangStore = defineStore('keranjang', {
  state: () => ({
    items: [],
    total: 0
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.jumlah, 0),
    totalHarga: (state) => state.items.reduce((sum, item) => sum + (item.harga * item.jumlah), 0)
  },

  actions: {
    addItem(produk, jumlah = 1) {
      const existingItem = this.items.find(item => item.produkId === produk.id)
      
      if (existingItem) {
        existingItem.jumlah += jumlah
      } else {
        this.items.push({
          produkId: produk.id,
          nama: produk.nama,
          harga: produk.harga,
          jumlah: jumlah,
          gambar: produk.gambar
        })
      }
      
      this.saveToLocalStorage()
    },

    removeItem(produkId) {
      this.items = this.items.filter(item => item.produkId !== produkId)
      this.saveToLocalStorage()
    },

    updateQuantity(produkId, jumlah) {
      const item = this.items.find(item => item.produkId === produkId)
      if (item) {
        item.jumlah = jumlah
        if (item.jumlah <= 0) {
          this.removeItem(produkId)
        }
      }
      this.saveToLocalStorage()
    },

    clearKeranjang() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('keranjang', JSON.stringify(this.items))
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('keranjang')
      if (saved) {
        this.items = JSON.parse(saved)
      }
    }
  }
})