<script setup>
import { useCartStore } from '../stores/cart'
import { watchEffect, computed } from 'vue'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.cartTotal)

const updateQuantity = (productId, newQuantity) => {
  if (newQuantity > 0) {
    cartStore.updateQuantity(productId, parseInt(newQuantity))
  }
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

watchEffect(() => {
  console.log('Le panier a été mis à jour', cartStore.cartCount)
})
</script>

<template>
  <div class="cart-container">
    <h2 class="titre-panier">Votre panier</h2>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Votre panier est vide</p>
      <RouterLink to="/" class="btn">Continuer les achats</RouterLink>
    </div>

    <div v-else>
      <table>
        <thead>
        <tr>
          <th>Image</th>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>
            <img src="https://via.placeholder.com/100x100" :alt="item.title" width="80" />
          </td>
          <td>
            <h3>{{ item.title }}</h3>
            <p>{{ item.artist }}</p>
          </td>
          <td>{{ item.price.toFixed(2) }} €</td>
          <td>
            <div class="quantity-control">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >-</button>

              <input
                type="number"
                :value="item.quantity"
                min="1"
                @input="updateQuantity(item.id, $event.target.value)"
                style="width: 50px; text-align: center;"
              />

              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
              >+</button>
            </div>
          </td>
          <td>{{ (item.price * item.quantity).toFixed(2) }} €</td>
          <td>
            <button @click="removeItem(item.id)">
              Supprimer
            </button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="4" style="text-align: right;">Total:</td>
          <td colspan="2">{{ cartTotal.toFixed(2) }} €</td>
        </tr>
        </tfoot>
      </table>

      <div class="cart-actions" style="display: flex; justify-content: space-between; margin-top: 20px;">
        <RouterLink to="/" class="btn">Continuer les achats</RouterLink>
        <button class="btn" style="margin-left: auto;">Passer la commande</button>
      </div>
    </div>
  </div>
</template>
