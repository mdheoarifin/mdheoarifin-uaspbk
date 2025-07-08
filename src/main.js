import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import { useAuthStore } from './stores/auth'
import { useKeranjangStore } from './stores/keranjang'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize stores before mounting
const authStore = useAuthStore()
const keranjangStore = useKeranjangStore()

// Check authentication on app start
authStore.checkAuth()

// Load cart from localStorage
keranjangStore.loadFromLocalStorage()

// Use router after pinia
app.use(router)

app.mount('#app')