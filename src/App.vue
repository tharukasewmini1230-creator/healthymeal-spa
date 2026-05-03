<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

    <Navbar />

    <!-- 🔥 ADD THIS padding -->
    <main class="container mx-auto px-4 py-8 pt-24">
      <RouterView />
    </main>

  </div>
</template>

<style>
:root.dark {
  color-scheme: dark;
}

html.dark body {
  background-color: #030712;
}
</style>