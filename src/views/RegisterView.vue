<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const handleRegister = () => {
  if (!username.value || !email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  try {
    authStore.register({
      username: username.value,
      email: email.value,
      password: password.value
    })
  } catch (err) {
    error.value = err.message
  }
}
</script>


<template>
  <div class="register-container">
    <h2>Inscription</h2>

    <form @submit.prevent="handleRegister" class="register-form">
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
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
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

      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="register-button">S'inscrire</button>
    </form>

    <div class="login-link">
      <p>Déjà inscrit ? <RouterLink to="/login">Se connecter</RouterLink></p>
    </div>
  </div>
</template>
