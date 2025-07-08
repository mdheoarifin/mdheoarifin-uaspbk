import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || null
  },

  actions: {
    async login(username, password) {
      try {
        // Query users dengan username
        const response = await api.get('/users', {
          params: { username }
        })
        
        console.log('Login attempt:', username, password)
        console.log('Users found:', response.data)
        
        if (response.data.length > 0) {
          const user = response.data[0]
          
          // Check password
          if (user.password === password) {
            this.user = user
            this.token = btoa(`${username}:${password}`) // Simple token
            this.isAuthenticated = true
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', this.token)
            
            console.log('Login successful:', user)
            return { success: true, user }
          } else {
            throw new Error('Password salah')
          }
        } else {
          throw new Error('Username tidak ditemukan')
        }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: error.message || 'Login gagal' }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    checkAuth() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (user && token) {
        try {
          this.user = JSON.parse(user)
          this.token = token
          this.isAuthenticated = true
          console.log('Auth restored:', this.user)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          this.logout()
        }
      }
    }
  }
})