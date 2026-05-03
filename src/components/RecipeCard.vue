<script setup>
import { useMealStore } from "../store/mealStore"

const store = useMealStore()
const props = defineProps(['recipe'])

const toggleFavorite = () => {
  if (store.favorites.find(m => m.id === props.recipe.id)) {
    store.removeFavorite(props.recipe.id)
  } else {
    store.addFavorite(props.recipe)
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-transparent dark:border-gray-800 flex flex-col h-full">
    <img :src="recipe.image" class="w-full h-48 object-cover rounded-t-3xl" />
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-bold text-lg text-gray-900 dark:text-white leading-tight">{{ recipe.name }}</h3>
        <button @click="toggleFavorite" class="text-2xl transition">
          <span v-if="store.favorites.find(m => m.id === recipe.id)">❤️</span>
          <span v-else class="text-gray-300 dark:text-gray-600">🤍</span>
        </button>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ recipe.caloriesPerServing }} Calories</p>
      <button @click="$emit('open', recipe)" class="w-full mt-auto bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold transition-colors">
        Show Recipe
      </button>
    </div>
  </div>
</template>