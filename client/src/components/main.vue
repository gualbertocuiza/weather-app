<script lang="ts" setup>
import WeatherCard from "./weatherCard.vue";
import SearchInput from "./searchInput.vue";
</script>
<template>
  <SearchInput />
  <div class="flex justify-center">
    <WeatherCard />
    <WeatherCard />
    <WeatherCard />
  </div>
</template>
