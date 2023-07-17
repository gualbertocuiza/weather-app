<script lang="ts" setup>
import WeatherCard from './weatherCard.vue'
import SearchInput from './searchInput.vue'
import { Weather } from '../interfaces/Weather'
import { getCurrentWeather } from '../services/weatherService'
import { ref } from 'vue'

const loading = ref<boolean>(false)
const currentWeather = ref<Weather>()

const setCity = async (city: string) => {
  loading.value = true
  currentWeather.value = await getCurrentWeather(city)
  loading.value = false
}
</script>
<template>
  <SearchInput @setCity="setCity" />
  <div class="flex justify-center">
    <span v-if="loading" class="loading loading-bars loading-lg"></span>

    <WeatherCard v-else-if="currentWeather" :weather="currentWeather" />
  </div>
</template>
