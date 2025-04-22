// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref(null)
  const users = ref([])
  const isLoggedIn = computed(() => !!user.value)

  const storedUsers = localStorage.getItem('users')
  if (storedUsers) {
    users.value = JSON.parse(storedUsers)
  }

  function login(credentials) {
    const foundUser = users.value.find(
      u => u.username === credentials.username && u.password === credentials.password
    )

    if (!foundUser) {
      throw new Error('Les identifiants ou le mot de passe ne sonnent pas bons')
    }

    user.value = {
      username: foundUser.username,
      email: foundUser.email
    }
    router.push('/')
  }

  function register(userData) {
    const userExists = users.value.some(u => u.username === userData.username)
    if (userExists) {
      throw new Error('Ce nom d\'utilisateur appartient déjà à un artiste')
    }

    users.value.push({
      username: userData.username,
      email: userData.email,
      password: userData.password
    })

    user.value = {
      username: userData.username,
      email: userData.email
    }

    localStorage.setItem('users', JSON.stringify(users.value))
    router.push('/')
  }

  function logout() {
    user.value = null
    router.push('/')
  }

  watch(users, () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }, { deep: true })

  return { user, isLoggedIn, login, register, logout }
})
