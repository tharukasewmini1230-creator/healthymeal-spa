<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Recipe, RecipeResponse } from '../types/recipe'
import RecipeCard from "../components/RecipeCard.vue"
import RecipeModal from "../components/RecipeModal.vue"

const recipes = ref<Recipe[]>([])
const selectedMeal = ref<Recipe | null>(null)
const search = ref("")
const isLoading = ref(true)
const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']
const selectedCategory = ref('All')

const fetchRecipes = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes')
    const data: RecipeResponse = await response.json()
    recipes.value = data.recipes
  } catch (error) {
    console.error("Fetch error:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRecipes)

const filteredRecipes = computed(() => {
  return recipes.value.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || r.mealType.includes(selectedCategory.value)
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-6 transition-colors">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <header class="text-center mb-8 sm:mb-10">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold 
        bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">
          Healthy Recipe Hub
        </h1>
        <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Premium Data-Driven Application
        </p>
      </header>

      <!-- Search -->
      <div class="max-w-xl mx-auto mb-6 sm:mb-8">
        <input
          v-model="search"
          type="text"
          placeholder="Search recipes..."
          class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-md 
          dark:bg-gray-800 dark:text-white outline-none 
          focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="selectedCategory === cat
            ? 'bg-green-500 text-white shadow-md'
            : 'bg-white dark:bg-gray-800 dark:text-gray-300'"
          class="px-3 sm:px-5 py-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all hover:scale-105"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-gray-200 dark:bg-gray-800 h-64 sm:h-72 rounded-2xl animate-pulse"
        ></div>
      </div>

      <!-- Recipes -->
      <div v-else-if="filteredRecipes.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          @open="selectedMeal = recipe"
        />
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-16">
        <p class="text-base sm:text-lg text-gray-400 font-medium">
          No recipes found for "{{ search }}"
        </p>
      </div>

      <!-- Modal -->
      <RecipeModal
        v-if="selectedMeal"
        :meal="selectedMeal"
        @close="selectedMeal = null"
      />
    </div>
  </div>
</template>