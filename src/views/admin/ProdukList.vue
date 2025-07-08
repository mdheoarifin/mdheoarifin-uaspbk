<template>
  <div class="container">
    <div class="page-header">
      <h1>Daftar Produk</h1>
      <router-link to="/produk/tambah" class="btn btn-primary">
        Tambah Produk
      </router-link>
    </div>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="produk-table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produk in produkList" :key="produk.id">
            <td>{{ produk.id }}</td>
            <td>
              <img :src="produk.gambar" :alt="produk.nama" class="produk-thumb">
            </td>
            <td>{{ produk.nama }}</td>
            <td>{{ produk.kategori }}</td>
            <td>{{ formatRupiah(produk.harga) }}</td>
            <td>{{ produk.stok }}</td>
            <td>
              <div class="action-buttons">
                <router-link 
                  :to="`/produk/edit/${produk.id}`" 
                  class="btn btn-secondary btn-sm"
                >
                  Edit
                </router-link>
                <button 
                  @click="handleDelete(produk.id)" 
                  class="btn btn-danger btn-sm"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useProdukStore } from '../../stores/produk'
import { formatRupiah } from '../../utils/helpers'

export default {
  name: 'ProdukList',
  setup() {
    const produkStore = useProdukStore()
    
    const produkList = computed(() => produkStore.produkList)
    const loading = computed(() => produkStore.loading)
    
    const handleDelete = async (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        const result = await produkStore.deleteProduk(id)
        if (!result.success) {
          alert('Gagal menghapus produk: ' + result.error)
        }
      }
    }
    
    onMounted(() => {
      produkStore.fetchProduk()
    })
    
    return {
      produkList,
      loading,
      handleDelete,
      formatRupiah
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.produk-table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.produk-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>