<script setup>
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'
import { computed } from 'vue'
import './assets/styles/main.css'

const authStore = useAuthStore()
const cartStore = useCartStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const cartCount = computed(() => cartStore.cartCount)
const username = computed(() => authStore.user?.username || '')

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <header class="main-header">
    <div class="container header-content">
      <div class="logo">
        <RouterLink to="/">VinylShop</RouterLink>
      </div>

      <nav class="main-nav">
        <RouterLink to="/">Accueil</RouterLink>

        <div class="auth-links" v-if="!isLoggedIn">
          <RouterLink to="/login">Connexion</RouterLink>
          <RouterLink to="/register">Inscription</RouterLink>
        </div>

        <div class="user-menu" v-else>
          <span class="welcome-text">Bonjour, {{ username }}</span>

          <RouterLink to="/cart" class="cart-link">
            Panier
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </RouterLink>

          <button @click="logout" class="logout-btn">Déconnexion</button>
        </div>
      </nav>
    </div>
  </header>

  <main class="main-content container">
    <RouterView />
  </main>

  <footer class="main-footer">
    <div class="container">
      <p>&copy; 2025 VinylShop - Tous droits réservés</p>
    </div>
  </footer>
</template>
