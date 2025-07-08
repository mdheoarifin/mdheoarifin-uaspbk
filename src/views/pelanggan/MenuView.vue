<template>
  <div class="container">
    <h1>Menu Makanan</h1>
    
    <div class="filter-section">
      <select v-model="selectedKategori" class="form-control filter-select">
        <option value="">Semua Kategori</option>
        <option value="Makanan">Makanan</option>
        <option value="Minuman">Minuman</option>
        <option value="Snack">Snack</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="menu-grid">
      <div 
        v-for="produk in filteredProduk" 
        :key="produk.id"
        class="menu-card"
      >
        <img :src="produk.gambar" :alt="produk.nama" class="menu-image">
        <div class="menu-content">
          <h3 class="menu-title">{{ produk.nama }}</h3>
          <p class="menu-description">{{ produk.deskripsi }}</p>
          <div class="menu-footer">
            <span class="menu-price">{{ formatRupiah(produk.harga) }}</span>
            <div class="menu-actions">
              <input
                type="number"
                v-model.number="quantities[produk.id]"
                min="1"
                max="produk.stok"
                class="quantity-input"
              />
              <button 
                @click="addToCart(produk)"
                class="btn btn-primary btn-sm"
                :disabled="produk.stok === 0"
              >
                {{ produk.stok === 0 ? 'Habis' : 'Tambah' }}
              </button>
            </div>
          </div>
          <div class="menu-stock">
            Stok: {{ produk.stok }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useProdukStore } from '../../stores/produk'
import { useKeranjangStore } from '../../stores/keranjang'
import { formatRupiah } from '../../utils/helpers'

export default {
  name: 'MenuView',
  setup() {
    const produkStore = useProdukStore()
    const keranjangStore = useKeranjangStore()
    
    const selectedKategori = ref('')
    const quantities = ref({})
    
    const loading = computed(() => produkStore.loading)
    
    const filteredProduk = computed(() => {
      if (!selectedKategori.value) {
        return produkStore.produkAktif
      }
      return produkStore.produkByKategori(selectedKategori.value)
    })
    
    const addToCart = (produk) => {
      const quantity = quantities.value[produk.id] || 1
      keranjangStore.addItem(produk, quantity)
      quantities.value[produk.id] = 1
      alert(`${produk.nama} berhasil ditambahkan ke keranjang!`)
    }
    
    onMounted(() => {
      produkStore.fetchProduk()
      
      // Initialize quantities
      produkStore.produkList.forEach(p => {
        quantities.value[p.id] = 1
      })
    })
    
    return {
      selectedKategori,
      quantities,
      loading,
      filteredProduk,
      addToCart,
      formatRupiah
    }
  }
}
</script>

<style scoped>
.filter-section {
  margin-bottom: 2rem;
}

.filter-select {
  max-width: 200px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.menu-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.menu-content {
  padding: 1.5rem;
}

.menu-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.menu-description {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.menu-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.menu-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #4CAF50;
}

.menu-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.quantity-input {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.menu-stock {
  font-size: 0.875rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}
</style>