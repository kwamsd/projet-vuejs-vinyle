import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const cartCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))
  const cartTotal = computed(() => items.value.reduce((acc, item) => acc + item.price * item.quantity, 0))

  function addToCart(product) {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveCart()
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveCart()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        saveCart()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  const storedCart = localStorage.getItem('cart')
  if (storedCart) {
    items.value = JSON.parse(storedCart)
  }

  watch(items, () => {
    saveCart()
  }, { deep: true })

  return {
    items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
