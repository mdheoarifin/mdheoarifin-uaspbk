<template>
  <div class="container">
    <h1>Keranjang Belanja</h1>
    
    <div v-if="items.length === 0" class="empty-cart">
      <p>Keranjang Anda masih kosong</p>
      <router-link to="/menu" class="btn btn-primary">
        Lihat Menu
      </router-link>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div v-for="item in items" :key="item.produkId" class="cart-item">
          <img :src="item.gambar" :alt="item.nama" class="cart-item-image">
          <div class="cart-item-info">
            <h3>{{ item.nama }}</h3>
            <p class="item-price">{{ formatRupiah(item.harga) }}</p>
          </div>
          <div class="cart-item-controls">
            <button 
              @click="updateQuantity(item.produkId, item.jumlah - 1)"
              class="btn-quantity"
            >
              -
            </button>
            <span class="quantity">{{ item.jumlah }}</span>
            <button 
              @click="updateQuantity(item.produkId, item.jumlah + 1)"
              class="btn-quantity"
            >
              +
            </button>
          </div>
          <div class="cart-item-total">
            {{ formatRupiah(item.harga * item.jumlah) }}
          </div>
          <button 
            @click="removeItem(item.produkId)"
            class="btn btn-danger btn-sm"
          >
            Hapus
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Ringkasan Pesanan</h2>
        <div class="summary-row">
          <span>Total Item:</span>
          <span>{{ itemCount }}</span>
        </div>
        <div class="summary-row total">
          <span>Total Harga:</span>
          <span>{{ formatRupiah(totalHarga) }}</span>
        </div>
        
        <div class="checkout-section">
          <div class="form-group">
            <label for="alamat" class="form-label">Alamat Pengiriman</label>
            <textarea
              id="alamat"
              v-model="alamat"
              class="form-control"
              rows="3"
              placeholder="Masukkan alamat lengkap"
              required
            ></textarea>
          </div>
          
          <button 
            @click="handleCheckout"
            class="btn btn-primary btn-block"
            :disabled="!alamat || loading"
          >
            {{ loading ? 'Memproses...' : 'Checkout' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useKeranjangStore } from '../../stores/keranjang'
import { usePesananStore } from '../../stores/pesanan'
import { formatRupiah } from '../../utils/helpers'

export default {
  name: 'KeranjangView',
  setup() {
    const router = useRouter()
    const keranjangStore = useKeranjangStore()
    const pesananStore = usePesananStore()
    
    const alamat = ref('')
    const loading = ref(false)
    
    const items = computed(() => keranjangStore.items)
    const itemCount = computed(() => keranjangStore.itemCount)
    const totalHarga = computed(() => keranjangStore.totalHarga)
    
    const updateQuantity = (produkId, jumlah) => {
      if (jumlah > 0) {
        keranjangStore.updateQuantity(produkId, jumlah)
      }
    }
    
    const removeItem = (produkId) => {
      if (confirm('Hapus item ini dari keranjang?')) {
        keranjangStore.removeItem(produkId)
      }
    }
    
    const handleCheckout = async () => {
      if (!alamat.value) {
        alert('Silakan masukkan alamat pengiriman')
        return
      }
      
      loading.value = true
      const result = await pesananStore.createPesanan(alamat.value)
      
      if (result.success) {
        alert('Pesanan berhasil dibuat!')
        router.push('/riwayat-pesanan')
      } else {
        alert('Gagal membuat pesanan: ' + result.error)
      }
      
      loading.value = false
    }
    
    return {
      items,
      itemCount,
      totalHarga,
      alamat,
      loading,
      updateQuantity,
      removeItem,
      handleCheckout,
      formatRupiah
    }
  }
}
</script>

<style scoped>
.empty-cart {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
}

.empty-cart p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #666;
}

.cart-items {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-item-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.item-price {
  color: #666;
  margin: 0;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-quantity {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

.btn-quantity:hover {
  background: #f0f0f0;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.cart-item-total {
  font-weight: bold;
  font-size: 1.1rem;
  min-width: 120px;
  text-align: right;
}

.cart-summary {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 400px;
  margin-left: auto;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.summary-row.total {
  font-size: 1.25rem;
  font-weight: bold;
  border-top: 2px solid #eee;
  padding-top: 1rem;
  margin-bottom: 2rem;
}

.checkout-section {
  margin-top: 2rem;
}

.btn-block {
  width: 100%;
}
</style>