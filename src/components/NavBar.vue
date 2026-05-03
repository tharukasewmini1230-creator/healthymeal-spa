<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
        HealthyEats
      </router-link>

      <div class="flex items-center gap-8">
        <div class="flex items-center gap-6">
          <router-link to="/" class="text-gray-700 dark:text-white hover:text-green-500 transition font-medium text-lg">Home</router-link>
          <router-link to="/favorites" class="text-gray-700 dark:text-white hover:text-green-500 transition font-medium text-lg">Favorites</router-link>
          <router-link to="/weekly" class="text-gray-700 dark:text-white hover:text-green-500 transition font-medium text-lg">Weekly Plan</router-link>
        </div>
        
        <button @click="toggleDark" class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xl border dark:border-gray-700">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </nav>
</template>