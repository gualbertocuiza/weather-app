<script lang="ts" setup>
import WeatherCard from './weatherCard.vue'
import SearchInput from './searchInput.vue'
import { useWeather } from '../composables/useWeather'

const { loading, currentWeather, setCity } = useWeather()
</script>
<template>
  <SearchInput @setCity="setCity" />
  <div class="flex justify-center">
    <span v-if="loading" class="loading loading-bars loading-lg"></span>

    <WeatherCard v-else-if="currentWeather" :weather="currentWeather" />
  </div>
</template>
