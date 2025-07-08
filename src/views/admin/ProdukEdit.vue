<template>
  <div class="container">
    <h1>Edit Produk</h1>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="form-container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nama" class="form-label">Nama Produk</label>
          <input
            type="text"
            id="nama"
            v-model="formData.nama"
            class="form-control"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="kategori" class="form-label">Kategori</label>
          <select
            id="kategori"
            v-model="formData.kategori"
            class="form-control"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="harga" class="form-label">Harga</label>
          <input
            type="number"
            id="harga"
            v-model.number="formData.harga"
            class="form-control"
            min="0"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="stok" class="form-label">Stok</label>
          <input
            type="number"
            id="stok"
            v-model.number="formData.stok"
            class="form-control"
            min="0"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="deskripsi" class="form-label">Deskripsi</label>
          <textarea
            id="deskripsi"
            v-model="formData.deskripsi"
            class="form-control"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="gambar" class="form-label">URL Gambar</label>
          <input
            type="url"
            id="gambar"
            v-model="formData.gambar"
            class="form-control"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
          <router-link to="/produk" class="btn btn-secondary">
            Batal
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProdukStore } from '../../stores/produk'

export default {
  name: 'ProdukEdit',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const produkStore = useProdukStore()
    
    const formData = ref({
      nama: '',
      kategori: '',
      harga: 0,
      stok: 0,
      deskripsi: '',
      gambar: ''
    })
    
    const loading = ref(true)
    const submitting = ref(false)
    const error = ref('')
    
    const handleSubmit = async () => {
      submitting.value = true
      error.value = ''
      
      const result = await produkStore.updateProduk(
        parseInt(route.params.id),
        formData.value
      )
      
      if (result.success) {
        router.push('/produk')
      } else {
        error.value = result.error
      }
      
      submitting.value = false
    }
    
    onMounted(async () => {
      const produk = await produkStore.getProdukById(parseInt(route.params.id))
      if (produk) {
        formData.value = { ...produk }
      } else {
        router.push('/produk')
      }
      loading.value = false
    })
    
    return {
      formData,
      loading,
      submitting,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>