<template>
  <div class="container">
    <h1>Profil Pengguna</h1>
    
    <div class="profil-card">
      <div class="profil-header">
        <div class="avatar">
          {{ user.nama?.charAt(0).toUpperCase() }}
        </div>
        <div class="profil-info">
          <h2>{{ user.nama }}</h2>
          <p class="role">{{ user.role }}</p>
        </div>
      </div>
      
      <div class="profil-content">
        <div class="info-group">
          <label>Username</label>
          <p>{{ user.username }}</p>
        </div>
        
        <div v-if="user.email" class="info-group">
          <label>Email</label>
          <p>{{ user.email }}</p>
        </div>
        
        <div v-if="user.telepon" class="info-group">
          <label>Telepon</label>
          <p>{{ user.telepon }}</p>
        </div>
        
        <div class="info-group">
          <label>Role</label>
          <p class="role-badge">{{ user.role }}</p>
        </div>
      </div>
      
      <div class="profil-actions">
        <button @click="handleLogout" class="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'ProfilView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const user = computed(() => authStore.user || {})
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/login')
    }
    
    return {
      user,
      handleLogout
    }
  }
}
</script>

<style scoped>
.profil-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
}

.profil-header {
  background: #f8f9fa;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.profil-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.profil-info .role {
  margin: 0;
  color: #666;
  text-transform: capitalize;
}

.profil-content {
  padding: 2rem;
}

.info-group {
  margin-bottom: 1.5rem;
}

.info-group:last-child {
  margin-bottom: 0;
}

.info-group label {
  display: block;
  font-weight: bold;
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.info-group p {
  margin: 0;
  color: #333;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  text-transform: capitalize;
  font-size: 0.875rem;
}

.profil-actions {
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}
</style>