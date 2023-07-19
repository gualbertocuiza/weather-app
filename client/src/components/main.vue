<script lang="ts" setup>
import WeatherCard from './weatherCard.vue'
import SearchInput from './searchInput.vue'
import { useWeather } from '../composables/useWeather'

const { loading, setCity, storageWeathers } = useWeather()
</script>
<template>
  <SearchInput @setCity="setCity" />
  <div class="flex justify-center">
    <span v-if="loading" class="loading loading-bars loading-lg"></span>
    <template v-else>
      <WeatherCard v-for="weather in storageWeathers.data" :weather="weather" />
    </template>
  </div>
</template>
