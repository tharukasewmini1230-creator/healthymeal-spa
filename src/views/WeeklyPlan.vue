<script setup lang="ts">
import { useMealStore } from "../store/mealStore"

const store = useMealStore()

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8 text-white">
    
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-black text-green-500">
        My Weekly Meal Schedule
      </h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <div
        v-for="day in days"
        :key="day"
        class="bg-gray-800 p-6 rounded-2xl border border-gray-700 animate-fade-in"
      >

        <h3 class="text-green-400 font-bold text-lg mb-4">
          {{ day }}
        </h3>

        <div v-if="store.weeklyPlan[day]" class="space-y-3">

          <img
            :src="store.weeklyPlan[day]?.image"
            :alt="store.weeklyPlan[day]?.name"
            class="w-full h-40 object-cover rounded-xl"
          />

          <p class="font-bold text-lg">
            {{ store.weeklyPlan[day]?.name }}
          </p>

          <button
            @click="store.removeFromWeekly(day)"
            class="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-xl font-semibold"
          >
            Remove
          </button>

        </div>

        <div
          v-else
          class="text-gray-400 text-sm italic"
        >
          No meal added
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>