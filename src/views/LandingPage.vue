<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <nav class="landing-nav">
        <div class="container">
          <div class="nav-content">
            <div class="logo">
              <span class="logo-icon">🍽️</span>
              <span class="logo-text">DHEOFOOD
              </span>
            </div>
            <div class="nav-links">
              <a href="#menu" class="nav-link">Menu</a>
              <a href="#about" class="nav-link">Tentang</a>
              <a href="#features" class="nav-link">Layanan</a>
              <a href="#contact" class="nav-link">Kontak</a>
              <router-link to="/login" class="login-btn">Login</router-link>
            </div>
            <button @click="toggleMobileMenu" class="mobile-toggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      <div class="hero-content">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-text animate-fadeInLeft">
              <h1 class="hero-title">
                Nikmati Makanan <span class="text-gradient">Lezat</span> 
                di Rumah Anda
              </h1>
              <p class="hero-subtitle">
                Pesan makanan favorit Anda dengan mudah dan cepat. 
                Kami menghadirkan cita rasa terbaik langsung ke pintu Anda.
              </p>
              <div class="hero-buttons">
                <router-link to="/login" class="btn-primary">
                  Pesan Sekarang
                </router-link>
                <a href="#menu" class="btn-secondary">
                  Lihat Menu
                </a>
              </div>
              <div class="hero-stats">
                <div class="stat">
                  <span class="stat-number">1000+</span>
                  <span class="stat-label">Menu Tersedia</span>
                </div>
                <div class="stat">
                  <span class="stat-number">5000+</span>
                  <span class="stat-label">Pelanggan Puas</span>
                </div>
                <div class="stat">
                  <span class="stat-number">4.9⭐</span>
                  <span class="stat-label">Rating</span>
                </div>
              </div>
            </div>
            <div class="hero-image animate-fadeInRight">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" alt="Delicious Food">
              <div class="floating-card card-1">
                <span>🚚</span>
                <p>Gratis Ongkir</p>
              </div>
              <div class="floating-card card-2">
                <span>⏱️</span>
                <p>30 Menit</p>
              </div>
              <div class="floating-card card-3">
                <span>🌟</span>
                <p>Best Seller</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="features" id="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Mengapa Memilih Kami?</h2>
          <p class="section-subtitle">
            Kami memberikan pelayanan terbaik untuk kepuasan Anda
          </p>
        </div>
        <div class="features-grid">
          <div class="feature-card animate-fadeInUp">
            <div class="feature-icon">🍳</div>
            <h3>Chef Berpengalaman</h3>
            <p>Dimasak oleh chef profesional dengan pengalaman bertahun-tahun</p>
          </div>
          <div class="feature-card animate-fadeInUp" style="animation-delay: 0.2s">
            <div class="feature-icon">🚀</div>
            <h3>Pengiriman Cepat</h3>
            <p>Makanan sampai dalam kondisi hangat kurang dari 30 menit</p>
          </div>
          <div class="feature-card animate-fadeInUp" style="animation-delay: 0.4s">
            <div class="feature-icon">💯</div>
            <h3>Kualitas Terjamin</h3>
            <p>Bahan-bahan segar dan berkualitas tinggi setiap hari</p>
          </div>
          <div class="feature-card animate-fadeInUp" style="animation-delay: 0.6s">
            <div class="feature-icon">💰</div>
            <h3>Harga Terjangkau</h3>
            <p>Nikmati makanan lezat dengan harga yang ramah di kantong</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Menu Preview Section -->
    <section class="menu-preview" id="menu">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Menu Favorit</h2>
          <p class="section-subtitle">Pilihan terbaik dari pelanggan kami</p>
        </div>
        <div class="menu-grid">
          <div v-for="item in menuItems" :key="item.id" class="menu-item">
            <div class="menu-image-container">
              <img :src="item.image" :alt="item.name">
              <span class="menu-badge">{{ item.category }}</span>
            </div>
            <div class="menu-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="menu-footer">
                <span class="price">{{ formatRupiah(item.price) }}</span>
                <router-link to="/login" class="order-btn">
                  Pesan
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-cta">
          <router-link to="/login" class="btn-primary">
            Lihat Semua Menu →
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="about" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <h2 class="section-title">Tentang Kami</h2>
            <p class="about-text">
              Toko Makanan Online hadir untuk memenuhi kebutuhan kuliner Anda dengan 
              mudah dan praktis. Kami menyediakan berbagai pilihan makanan lezat yang 
              dimasak dengan penuh cinta oleh chef berpengalaman.
            </p>
            <p class="about-text">
              Dengan sistem pemesanan online yang mudah, Anda dapat menikmati makanan 
              favorit tanpa harus keluar rumah. Kami berkomitmen untuk memberikan 
              pengalaman terbaik dalam setiap pesanan.
            </p>
            <div class="about-features">
              <div class="about-feature">
                <span class="check-icon">✓</span>
                <span>100% Halal</span>
              </div>
              <div class="about-feature">
                <span class="check-icon">✓</span>
                <span>Bahan Segar Setiap Hari</span>
              </div>
              <div class="about-feature">
                <span class="check-icon">✓</span>
                <span>Tanpa MSG Berlebih</span>
              </div>
              <div class="about-feature">
                <span class="check-icon">✓</span>
                <span>Packaging Ramah Lingkungan</span>
              </div>
            </div>
          </div>
          <div class="about-images">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" alt="Our Kitchen" class="about-img-1">
            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" alt="Our Food" class="about-img-2">
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Apa Kata Pelanggan</h2>
          <p class="section-subtitle">Testimoni dari pelanggan setia kami</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">
              "Makanannya enak banget! Pengirimannya juga cepat dan masih hangat. 
              Recommended banget deh!"
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">A</div>
              <div class="author-info">
                <h4>Andi Pratama</h4>
                <p>Pelanggan Setia</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">
              "Porsinya pas, rasanya mantap, harganya juga terjangkau. 
              Sudah jadi langganan keluarga."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">S</div>
              <div class="author-info">
                <h4>Siti Nurhaliza</h4>
                <p>Ibu Rumah Tangga</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">
              "Aplikasinya user-friendly, proses pemesanan mudah dan cepat. 
              Makanannya juga selalu fresh!"
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">R</div>
              <div class="author-info">
                <h4>Rudi Hermawan</h4>
                <p>Karyawan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Siap untuk Memesan?</h2>
          <p>Daftar sekarang dan dapatkan diskon 20% untuk pemesanan pertama!</p>
          <div class="cta-buttons">
            <router-link to="/login" class="btn-white">
              Daftar Sekarang
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section class="contact" id="contact">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Hubungi Kami</h2>
          <p class="section-subtitle">Ada pertanyaan? Kami siap membantu</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div>
                <h4>Alamat</h4>
                <p>Jl. Makanan No. 123, Jakarta</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div>
                <h4>Telepon</h4>
                <p>(021) 1234-5678</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>info@tokomakanan.com</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🕐</span>
              <div>
                <h4>Jam Operasional</h4>
                <p>Setiap Hari: 08:00 - 22:00 WIB</p>
              </div>
            </div>
          </div>
          <div class="contact-form">
            <form @submit.prevent="handleContactSubmit">
              <div class="form-group">
                <input 
                  type="text" 
                  v-model="contactForm.name"
                  placeholder="Nama Anda" 
                  required
                >
              </div>
              <div class="form-group">
                <input 
                  type="email" 
                  v-model="contactForm.email"
                  placeholder="Email Anda" 
                  required
                >
              </div>
              <div class="form-group">
                <textarea 
                  v-model="contactForm.message"
                  placeholder="Pesan Anda" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn-primary">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="showMobileMenu" class="mobile-menu">
        <a href="#menu" @click="closeMobileMenu" class="mobile-link">Menu</a>
        <a href="#about" @click="closeMobileMenu" class="mobile-link">Tentang</a>
        <a href="#features" @click="closeMobileMenu" class="mobile-link">Layanan</a>
        <a href="#contact" @click="closeMobileMenu" class="mobile-link">Kontak</a>
        <router-link to="/login" class="mobile-link login">Login</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatRupiah } from '../utils/helpers'

export default {
  name: 'LandingPage',
  setup() {
    const showMobileMenu = ref(false)
    const contactForm = ref({
      name: '',
      email: '',
      message: ''
    })
    
    const menuItems = ref([
      {
        id: 1,
        name: 'Nasi Goreng Special',
        description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
        price: 25000,
        category: 'Makanan',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'
      },
      {
        id: 2,
        name: 'Mie Ayam Bakso',
        description: 'Mie ayam dengan bakso homemade dan pangsit',
        price: 20000,
        category: 'Makanan',
        image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=400'
      },
      {
        id: 3,
        name: 'Es Teh Manis',
        description: 'Es teh manis segar dengan gula aren',
        price: 5000,
        category: 'Minuman',
        image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400'
      },
      {
        id: 4,
        name: 'Sate Ayam',
        description: 'Sate ayam dengan bumbu kacang spesial',
        price: 30000,
        category: 'Makanan',
        image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400'
      }
    ])
    
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }
    
    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }
    
    const handleContactSubmit = () => {
      alert('Terima kasih! Pesan Anda telah kami terima.')
      contactForm.value = {
        name: '',
        email: '',
        message: ''
      }
    }
    
    // Smooth scroll for anchor links
    const handleScroll = () => {
      const links = document.querySelectorAll('a[href^="#"]')
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const target = document.querySelector(link.getAttribute('href'))
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
    }
    
    onMounted(() => {
      handleScroll()
    })
    
    return {
      showMobileMenu,
      contactForm,
      menuItems,
      toggleMobileMenu,
      closeMobileMenu,
      handleContactSubmit,
      formatRupiah
    }
  }
}
</script>

<style scoped>
/* Landing Page Styles */
.landing-page {
  background: #ffffff;
}

/* Landing Navigation */
.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.logo-icon {
  font-size: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4CAF50;
}

.login-btn {
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s;
}

.login-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* Hero Section */
.hero {
  padding-top: 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  padding: 4rem 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #333;
}

.text-gradient {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #333;
  border: 2px solid #333;
}

.btn-secondary:hover {
  background: #333;
  color: white;
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
}

/* Hero Image */
.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.floating-card {
  position: absolute;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  animation: float 3s ease-in-out infinite;
}

.floating-card span {
  font-size: 1.5rem;
}

.card-1 {
  top: 20%;
  left: -50px;
}

.card-2 {
  bottom: 30%;
  right: -30px;
  animation-delay: 1s;
}

.card-3 {
  bottom: 10%;
  left: 20px;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Features Section */
.features {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* misal ingin menambahkan efek shadow juga */
}

.feature-icon {
font-size: 3rem;
margin-bottom: 1rem;
display: block;
}
.feature-card h3 {
font-size: 1.25rem;
margin-bottom: 0.75rem;
color: #333;
}
.feature-card p {
color: #666;
line-height: 1.6;
}
/* Menu Preview Section */
.menu-preview {
padding: 5rem 0;
}
.menu-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 2rem;
margin-bottom: 3rem;
}
.menu-item {
background: white;
border-radius: 16px;
overflow: hidden;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
transition: all 0.3s;
}
.menu-item:hover {
transform: translateY(-5px);
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
.menu-image-container {
position: relative;
height: 200px;
overflow: hidden;
}
.menu-image-container img {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.3s;
}
.menu-item:hover .menu-image-container img {
transform: scale(1.1);
}
.menu-badge {
position: absolute;
top: 1rem;
right: 1rem;
background: rgba(255, 255, 255, 0.9);
padding: 0.25rem 0.75rem;
border-radius: 20px;
font-size: 0.75rem;
font-weight: 600;
}
.menu-info {
padding: 1.5rem;
}
.menu-info h3 {
font-size: 1.25rem;
margin-bottom: 0.5rem;
color: #333;
}
.menu-info p {
color: #666;
font-size: 0.875rem;
margin-bottom: 1rem;
}
.menu-footer {
display: flex;
justify-content: space-between;
align-items: center;
}
.price {
font-size: 1.5rem;
font-weight: bold;
color: #4CAF50;
}
.order-btn {
padding: 0.5rem 1.25rem;
background: #4CAF50;
color: white;
text-decoration: none;
border-radius: 25px;
font-weight: 600;
transition: all 0.3s;
}
.order-btn:hover {
background: #45a049;
transform: translateX(5px);
}
.menu-cta {
text-align: center;
}
/* About Section */
.about {
padding: 5rem 0;
background: #f8f9fa;
}
.about-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 4rem;
align-items: center;
}
.about-text {
font-size: 1.1rem;
color: #666;
line-height: 1.8;
margin-bottom: 1.5rem;
}
.about-features {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 1rem;
margin-top: 2rem;
}
.about-feature {
display: flex;
align-items: center;
gap: 0.75rem;
}
.check-icon {
width: 24px;
height: 24px;
background: #4CAF50;
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
}
.about-images {
position: relative;
height: 400px;
}
.about-img-1 {
position: absolute;
top: 0;
left: 0;
width: 60%;
height: 250px;
object-fit: cover;
border-radius: 16px;
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
.about-img-2 {
position: absolute;
bottom: 0;
right: 0;
width: 60%;
height: 250px;
object-fit: cover;
border-radius: 16px;
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
/* Testimonials Section */
.testimonials {
padding: 5rem 0;
}
.testimonials-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;
}
.testimonial-card {
background: white;
padding: 2rem;
border-radius: 16px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
transition: all 0.3s;
}
.testimonial-card:hover {
transform: translateY(-5px);
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
.stars {
font-size: 1.2rem;
margin-bottom: 1rem;
}
.testimonial-text {
font-size: 1.1rem;
color: #666;
line-height: 1.6;
margin-bottom: 1.5rem;
font-style: italic;
}
.testimonial-author {
display: flex;
align-items: center;
gap: 1rem;
}
.author-avatar {
width: 50px;
height: 50px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
font-size: 1.25rem;
}
.author-info h4 {
margin: 0;
color: #333;
}
.author-info p {
margin: 0;
color: #666;
font-size: 0.875rem;
}
/* CTA Section */
.cta {
padding: 5rem 0;
background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
color: white;
text-align: center;
}
.cta-content h2 {
font-size: 2.5rem;
margin-bottom: 1rem;
}
.cta-content p {
font-size: 1.25rem;
margin-bottom: 2rem;
opacity: 0.9;
}
.btn-white {
padding: 1rem 2rem;
background: white;
color: #4CAF50;
text-decoration: none;
border-radius: 30px;
font-weight: 600;
transition: all 0.3s;
display: inline-block;
}
.btn-white:hover {
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
/* Contact Section */
.contact {
padding: 5rem 0;
background: #f8f9fa;
}
.contact-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 4rem;
}
.contact-item {
display: flex;
gap: 1rem;
margin-bottom: 2rem;
}
.contact-icon {
font-size: 2rem;
width: 50px;
height: 50px;
background: #e8f5e9;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
}
.contact-item h4 {
margin: 0 0 0.5rem 0;
color: #333;
}
.contact-item p {
margin: 0;
color: #666;
}
.contact-form .form-group {
margin-bottom: 1.5rem;
}
.contact-form input,
.contact-form textarea {
width: 100%;
padding: 1rem;
border: 2px solid #e0e0e0;
border-radius: 8px;
font-size: 1rem;
transition: border-color 0.3s;
}
.contact-form input:focus,
.contact-form textarea:focus {
outline: none;
border-color: #4CAF50;
}
/* Mobile Menu */
.mobile-toggle {
display: none;
flex-direction: column;
gap: 4px;
background: none;
border: none;
cursor: pointer;
padding: 0.5rem;
}
.mobile-toggle span {
display: block;
width: 25px;
height: 3px;
background: #333;
border-radius: 2px;
transition: all 0.3s;
}
.mobile-menu {
position: fixed;
top: 70px;
left: 0;
right: 0;
background: white;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
padding: 1rem;
z-index: 999;
}
.mobile-link {
display: block;
padding: 1rem;
color: #333;
text-decoration: none;
font-weight: 500;
border-bottom: 1px solid #f0f0f0;
transition: background 0.3s;
}
.mobile-link:hover {
background: #f8f9fa;
}
.mobile-link.login {
background: #4CAF50;
color: white;
text-align: center;
border-radius: 8px;
margin-top: 1rem;
border: none;
}
/* Animations */
.animate-fadeInLeft {
animation: fadeInLeft 1s ease;
}
.animate-fadeInRight {
animation: fadeInRight 1s ease;
}
.animate-fadeInUp {
animation: fadeInUp 1s ease;
}
@keyframes fadeInLeft {
from {
opacity: 0;
transform: translateX(-50px);
}
to {
opacity: 1;
transform: translateX(0);
}
}
@keyframes fadeInRight {
from {
opacity: 0;
transform: translateX(50px);
}
to {
opacity: 1;
transform: translateX(0);
}
}
@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(30px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
/* Transitions */
.slide-enter-active,
.slide-leave-active {
transition: transform 0.3s ease;
}
.slide-enter-from {
transform: translateY(-100%);
}
.slide-leave-to {
transform: translateY(-100%);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-grid,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.hero-title {
font-size: 2.5rem;
}
.about-images {
height: 300px;
}

@media (max-width: 768px) {
.nav-links {
display : none;
}
}
.mobile-toggle {
display: flex;
}
.hero {
padding-top: 60px;
}
.hero-title {
font-size: 2rem;
}
.hero-subtitle {
font-size: 1rem;
}
.hero-buttons {
  display: flex;
  flex-direction: column;
}

.hero-stats {
justify-content: space-between;
}
.floating-card {
display: none;
}

.features-grid,
.menu-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.about-features {
grid-template-columns: 1fr;
}
.testimonials-grid {
grid-template-columns: 1fr;
}

</style>