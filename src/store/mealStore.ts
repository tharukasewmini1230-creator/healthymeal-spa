import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Recipe } from '../types/recipe'

// default weekly structure
const defaultWeeklyPlan = {
  Monday: null,
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: null,
  Saturday: null,
  Sunday: null
}

export const useMealStore = defineStore('meal', () => {
  // -------------------------
  // SAFE LOCALSTORAGE LOAD
  // -------------------------
  const loadFromStorage = <T>(key: string, fallback: T): T => {
    const data = localStorage.getItem(key)
    if (!data) return fallback

    try {
      return JSON.parse(data)
    } catch (e) {
      console.warn(`Invalid localStorage data for ${key}`)
      return fallback
    }
  }

  // -------------------------
  // STATE
  // -------------------------
  const favorites = ref<Recipe[]>(
    loadFromStorage<Recipe[]>('favorites', [])
  )

  const weeklyPlan = reactive<Record<string, Recipe | null>>(
    loadFromStorage('weeklyPlan', defaultWeeklyPlan)
  )

  // -------------------------
  // SAVE FUNCTION
  // -------------------------
  const saveToLocal = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
    localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan))
  }

  // -------------------------
  // FAVORITES
  // -------------------------
  const addFavorite = (recipe: Recipe) => {
    const exists = favorites.value.find(r => r.id === recipe.id)

    if (!exists) {
      favorites.value.push(recipe)
      saveToLocal()
    }
  }

  const removeFavorite = (id: number) => {
    favorites.value = favorites.value.filter(r => r.id !== id)
    saveToLocal()
  }

  // -------------------------
  // WEEKLY PLAN
  // -------------------------
  const addToWeeklyPlan = (day: string, recipe: Recipe) => {
    if (day in weeklyPlan) {
      weeklyPlan[day] = recipe
      saveToLocal()
    }
  }

  const removeFromWeekly = (day: string) => {
    if (day in weeklyPlan) {
      weeklyPlan[day] = null
      saveToLocal()
    }
  }

  const clearWeeklyPlan = () => {
    Object.keys(weeklyPlan).forEach(day => {
      weeklyPlan[day] = null
    })
    saveToLocal()
  }

  // -------------------------
  // RETURN
  // -------------------------
  return {
    favorites,
    weeklyPlan,
    addFavorite,
    removeFavorite,
    addToWeeklyPlan,
    removeFromWeekly,
    clearWeeklyPlan
  }
})