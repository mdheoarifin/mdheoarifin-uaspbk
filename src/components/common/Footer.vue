## 4. Update Footer untuk Landing Page

### src/components/common/Footer.vue (update bagian login link)
```vue
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Toko Makanan Online</h3>
          <p class="footer-description">
            Menyediakan makanan berkualitas dengan pelayanan terbaik untuk Anda.
          </p>
          <!-- Add login link for non-authenticated users -->
          <div v-if="!isAuthenticated" class="footer-login">
            <router-link to="/login" class="footer-login-btn">
              Login / Daftar
            </router-link>
          </div>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Menu Cepat</h4>
          <ul class="footer-links">
            <template v-if="isAuthenticated">
              <li><router-link to="/menu">Lihat Menu</router-link></li>
              <li><router-link to="/keranjang">Keranjang</router-link></li>
              <li><router-link to="/riwayat-pesanan">Riwayat Pesanan</router-link></li>
              <li><router-link to="/profil">Profil</router-link></li>
            </template>
            <template v-else>
              <li><a href="/#menu">Lihat Menu</a></li>
              <li><a href="/#about">Tentang Kami</a></li>
              <li><a href="/#features">Layanan</a></li>
              <li><router-link to="/login">Login</router-link></li>
            </template>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Kontak</h4>
          <ul class="footer-contact">
            <li>📍 Jl. Makanan No. 123, Jakarta</li>
            <li>📞 (021) 1234-5678</li>
            <li>📧 info@tokomakanan.com</li>
            <li>🕐 Buka: 08:00 - 22:00 WIB</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Ikuti Kami</h4>
          <div class="social-links">
            <a href="#" class="social-link" title="Facebook">📘</a>
            <a href="#" class="social-link" title="Instagram">📷</a>
            <a href="#" class="social-link" title="Twitter">🐦</a>
            <a href="#" class="social-link" title="WhatsApp">💬</a>
          </div>
          <div class="payment-methods">
            <p class="payment-title">Metode Pembayaran:</p>
            <div class="payment-icons">
              <span class="payment-icon">💳</span>
              <span class="payment-icon">🏦</span>
              <span class="payment-icon">💰</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Toko Makanan Online. All rights reserved.</p>
        <p class="footer-credits">
          Dibuat dengan ❤️ menggunakan Vue.js
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'Footer',
  setup() {
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    
    return {
      isAuthenticated
    }
  }
}
</script>

<style scoped>
/* Add new styles for login button */
.footer-login {
  margin-top: 1rem;
}

.footer-login-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s;
}

.footer-login-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* Keep all existing styles... */
.footer {
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 3rem 0 1rem 0;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  padding: 0 1rem;
}

.footer-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4CAF50;
}

.footer-description {
  color: #cccccc;
  line-height: 1.6;
  font-size: 0.9rem;
}

.footer-heading {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #cccccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #4CAF50;
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-contact li {
  margin-bottom: 0.5rem;
  color: #cccccc;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-link {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #3c3c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.3s;
}

.social-link:hover {
  background-color: #4CAF50;
  transform: translateY(-3px);
}

.payment-methods {
  margin-top: 1rem;
}

.payment-title {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 0.5rem;
}

.payment-icons {
  display: flex;
  gap: 0.5rem;
}

.payment-icon {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-color: #3c3c3c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.footer-bottom {
  border-top: 1px solid #444444;
  padding-top: 1.5rem;
  text-align: center;
}

.footer-bottom p {
  margin: 0.25rem 0;
  color: #999999;
  font-size: 0.875rem;
}

.footer-credits {
  font-size: 0.8rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .payment-icons {
    justify-content: center;
  }
}
</style>