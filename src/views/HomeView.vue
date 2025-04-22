<script setup>
import { useProductsStore } from '../stores/product.js'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { computed } from 'vue'
import '../assets/styles/views/home.css'

const productsStore = useProductsStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const products = computed(() => productsStore.products)
const isLoggedIn = computed(() => authStore.isLoggedIn)

const addToCart = (product) => {
  cartStore.addToCart(product)
  alert(`${product.title} a été ajouté au panier`)
}
</script>

<template>
  <div class="home">
    <h2 class="titre-catalogue">Notre Collection de Vinyles</h2>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title" />
        <div class="product-details">
          <h3>{{ product.title }}</h3>
          <p class="artist">{{ product.artist }}</p>
          <p class="price">{{ product.price.toFixed(2) }} €</p>
        </div>
        <button
          v-if="isLoggedIn"
          @click="addToCart(product)"
          class="add-to-cart"
        >
          Ajouter au panier
        </button>
        <p v-else class="login-notice">Connectez-vous pour acheter</p>
      </div>
    </div>
  </div>
</template>
