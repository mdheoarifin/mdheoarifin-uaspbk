<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <main class="main-content" :class="{ 'no-navbar': !showNavbar }">
      <router-view />
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const route = useRoute()
    
    const showNavbar = computed(() => 
      !route.meta.hideNavbar && route.path !== '/'
    )
    
    const showFooter = computed(() => 
      route.path === '/' || (!route.meta.hideNavbar && route.path !== '/login')
    )
    
    return {
      showNavbar,
      showFooter
    }
  }
}
</script>

<style>
.main-content.no-navbar {
  min-height: 100vh;
}
</style>