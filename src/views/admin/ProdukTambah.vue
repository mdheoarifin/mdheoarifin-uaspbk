<template>
  <div class="container">
    <h1>Tambah Produk</h1>
    
    <div class="form-container">
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
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProdukStore } from '../../stores/produk'

export default {
  name: 'ProdukTambah',
  setup() {
    const router = useRouter()
    const produkStore = useProdukStore()
    
    const formData = ref({
      nama: '',
      kategori: '',
      harga: 0,
      stok: 0,
      deskripsi: '',
      gambar: ''
    })
    
    const loading = ref(false)
    const error = ref('')
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = ''
      
      const result = await produkStore.createProduk(formData.value)
      
      if (result.success) {
        router.push('/produk')
      } else {
        error.value = result.error
      }
      
      loading.value = false
    }
    
    return {
      formData,
      loading,
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
</style>