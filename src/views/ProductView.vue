<script setup>
import { useProductsStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const productId = parseInt(route.params.id)
const product = computed(() =>
  productsStore.products.find(p => p.id === productId)
)
const isLoggedIn = computed(() => authStore.isLoggedIn)

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    alert(`${product.value.title} a été ajouté au panier`)
  }
}
</script>

<template>
  <div v-if="product" class="product-detail">
    <div class="product-image">
      <img src="https://via.placeholder.com/500x500" :alt="product.title" />
    </div>

    <div class="product-info">
      <h2>{{ product.title }}</h2>
      <p class="product-artist">{{ product.artist }}</p>
      <p class="product-price">{{ product.price.toFixed(2) }} €</p>

      <div class="product-actions">
        <button
          v-if="isLoggedIn"
          @click="addToCart"
          class="add-to-cart-btn"
        >
          Ajouter au panier
        </button>
        <p v-else class="login-notice">
          <RouterLink to="/login">Connectez-vous</RouterLink> pour ajouter au panier
        </p>
      </div>
    </div>
  </div>

  <div v-else class="error-container">
    <p>Produit non trouvé</p>
    <RouterLink to="/" class="back-link">Retour à l'accueil</RouterLink>
  </div>
</template>
