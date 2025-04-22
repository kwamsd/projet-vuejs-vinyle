<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import '../assets/styles/views/login.css'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (!username.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  try {
    authStore.login({
      username: username.value,
      password: password.value
    })
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Connexion</h2>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="login-button">Se connecter</button>
    </form>

    <div class="register-link">
      <p>Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink></p>
    </div>
  </div>
</template>

