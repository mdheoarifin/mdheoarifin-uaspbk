<template>
  <div class="login-container">
    <div class="login-wrapper">
      <!-- Left Side - Image/Banner -->
      <div class="login-banner">
        <div class="banner-content">
          <h1 class="brand-title">🍽️ DHEOFOOD</h1>
          <p class="brand-tagline">Pesan makanan favoritmu dengan mudah!</p>
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">✨</span>
              <span>Menu Berkualitas</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <span>Pengiriman Cepat</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💯</span>
              <span>Kepuasan Terjamin</span>
            </div>
          </div>
        </div>
        <div class="banner-decoration">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
        </div>
      </div>
      
      <!-- Right Side - Login Form -->
      <div class="login-form-container">
        <div class="login-card">
          <div class="login-header">
            <h2 class="login-title">Selamat Datang!</h2>
            <p class="login-subtitle">Silakan login untuk melanjutkan</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="username" class="form-label">
                <span class="label-icon">👤</span>
                Username
              </label>
              <input
                type="text"
                id="username"
                v-model="formData.username"
                class="form-control"
                placeholder="Masukkan username"
                required
                @focus="activeField = 'username'"
                @blur="activeField = ''"
                :class="{ 'active': activeField === 'username' }"
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">
                <span class="label-icon">🔐</span>
                Password
              </label>
              <div class="password-input-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="formData.password"
                  class="form-control"
                  placeholder="Masukkan password"
                  required
                  @focus="activeField = 'password'"
                  @blur="activeField = ''"
                  :class="{ 'active': activeField === 'password' }"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="password-toggle"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>
            
            <div v-if="error" class="alert alert-error animate-shake">
              <span class="alert-icon">⚠️</span>
              {{ error }}
            </div>
            
            <button type="submit" class="btn btn-primary btn-login" :disabled="loading">
              <span v-if="!loading">Login</span>
              <span v-else class="loading-spinner">
                <span class="spinner"></span>
                Loading...
              </span>
            </button>
          </form>
          
         <div class="login-demo">
  <p class="demo-title">Pilih Role untuk Demo:</p>
  <div class="demo-accounts">
    <button @click="fillDemo('admin')" class="demo-btn admin">
      <span class="role-icon">👨‍💼</span>
      <span class="role-title">Admin</span>
      <span class="role-desc">Kelola produk & laporan</span>
    </button>
    <button @click="fillDemo('staf')" class="demo-btn staf">
      <span class="role-icon">👷</span>
      <span class="role-title">Staf</span>
      <span class="role-desc">Proses pesanan</span>
    </button>
    <button @click="fillDemo('pelanggan')" class="demo-btn pelanggan">
      <span class="role-icon">🛍️</span>
      <span class="role-title">Pelanggan</span>
      <span class="role-desc">Pesan makanan</span>
    </button>
  </div>
  <p class="demo-note">
    Klik salah satu tombol di atas untuk login sebagai role tersebut
  </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const formData = ref({
      username: '',
      password: ''
    })
    const loading = ref(false)
    const error = ref('')
    const activeField = ref('')
    const showPassword = ref(false)
    
    const demoAccounts = {
      admin: { username: 'admin', password: 'admin123' },
      staf: { username: 'staf1', password: 'staf123' },
      pelanggan: { username: 'pelanggan1', password: 'pelanggan123' }
    }
    
    const fillDemo = (role) => {
      formData.value = { ...demoAccounts[role] }
      error.value = ''
      // Just fill the form, don't auto-submit
    }
    
    const handleLogin = async () => {
      loading.value = true
      error.value = ''
      
      try {
        console.log('Attempting login with:', formData.value)
        
        const result = await authStore.login(
          formData.value.username,
          formData.value.password
        )
        
        console.log('Login result:', result)
        
        if (result.success) {
          // Redirect based on role
          const role = result.user.role
          console.log('User role:', role)
          
          if (role === 'admin') {
            await router.push('/dashboard')
          } else if (role === 'staf') {
            await router.push('/dashboard')
          } else if (role === 'pelanggan') {
            await router.push('/menu')
          } else {
            await router.push('/dashboard')
          }
        } else {
          error.value = result.error || 'Login gagal'
        }
      } catch (err) {
        console.error('Login error:', err)
        error.value = 'Terjadi kesalahan saat login'
      } finally {
        loading.value = false
      }
    }
    
    return {
      formData,
      loading,
      error,
      activeField,
      showPassword,
      handleLogin,
      fillDemo
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-wrapper {
  display: flex;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
  min-height: 600px;
}

/* Banner Side */
.banner-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* ditambahkan agar tidak menutupi konten */
}

.banner-content {
  position: relative;
  z-index: 2;
  color: white;
}

.brand-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.brand-tagline {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
}

.feature-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Decorative Circles */
.banner-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: 0; /* perbaiki posisi kanan */
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -50px;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
}

/* Form Side */
.login-form-container {
  flex: 1;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #666;
  font-size: 1rem;
}

/* Form Styling */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.label-icon {
  font-size: 1.2rem;
}

.form-control {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
   transition: border-color 0.3s ease, background 0.3s ease;
  background: #f8f9fa;
}

.form-control:focus {
  outline: none;
  border-color: #4CAF50;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.form-control.active {
  border-color: #4CAF50;
}

/* Password Input */
.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.password-toggle:hover {
  opacity: 1;
}

/* Login Button */
.btn-login {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Demo Section */
.login-demo {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.demo-title {
  text-align: center;
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.demo-accounts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}
/* Update demo button styles */
.demo-btn {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.role-title {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
}

.role-desc {
  font-size: 0.75rem;
  color: #666;
}

.demo-note {
  text-align: center;
  font-size: 0.875rem;
  color: #666;
  margin-top: 1rem;
}

.demo-btn {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-btn.admin:hover {
  border-color: #2196F3;
  color: #2196F3;
}

.demo-btn.staf:hover {
  border-color: #FF9800;
  color: #FF9800;
}

.demo-btn.pelanggan:hover {
  border-color: #4CAF50;
  color: #4CAF50;
}


.role-icon {
  font-size: 1.5rem;
}

/* Error Alert */
.alert-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c00;
  font-size: 0.9rem;
}

.alert-icon {
  font-size: 1.2rem;
}
.animate-shake {
  animation: shake 0.5s ease-in-out;
  animation-iteration-count: 1;
}


@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Responsive */
@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
  }
  
  .login-banner {
    padding: 2rem;
    min-height: 200px;
  }
  
  .brand-title {
    font-size: 1.75rem;
  }
  
  .features {
    display: none;
  }
  
  .login-form-container {
    padding: 2rem;
  }
  
  .demo-accounts {
    grid-template-columns: 1fr;
  }
}
</style>