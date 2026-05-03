<script setup lang="ts">
import { useMealStore } from "../store/mealStore"

const store = useMealStore()

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-gray-900 dark:text-white">

    <!-- Header -->
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-black text-green-600">
        My Weekly Meal Schedule
      </h1>

      <p class="text-gray-500 dark:text-gray-400 mt-2">
        Plan your healthy meals for the week 🍽️
      </p>
    </header>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <div
        v-for="day in days"
        :key="day"
        class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md"
      >

        <!-- Day Title -->
        <h3 class="text-green-600 font-bold text-xl mb-4">
          {{ day }}
        </h3>

        <!-- Meal Exists -->
        <div v-if="store.weeklyPlan[day]">

          <img
            :src="store.weeklyPlan[day]!.image"
            :alt="store.weeklyPlan[day]!.name"
            class="w-full h-40 object-cover rounded-xl mb-4"
          />

          <h4 class="font-bold text-lg mb-2">
            {{ store.weeklyPlan[day]!.name }}
          </h4>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {{ store.weeklyPlan[day]!.cuisine }} •
            {{ store.weeklyPlan[day]!.difficulty }}
          </p>

          <button
            @click="store.removeFromWeekly(day)"
            class="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-xl font-semibold text-white"
          >
            Remove Meal
          </button>

        </div>

        <!-- Empty State -->
        <div
          v-else
          class="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 text-sm italic"
        >
          No meal added
        </div>

      </div>

    </div>

    <!-- Clear Button -->
    <div class="mt-10 flex justify-center">
      <button
        @click="store.clearWeeklyPlan()"
        class="bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-8 py-3 rounded-2xl font-bold transition"
      >
        Clear Weekly Plan
      </button>
    </div>

  </div>
</template>