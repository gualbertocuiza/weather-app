<script lang="ts" setup>
import WeatherCard from "./weatherCard.vue";
</script>
<template>
  <div class="text-center p-5 mb-6">
    <input
      type="text"
      placeholder="Type a city here"
      class="input input-bordered input-md w-full max-w-md"
    />
  </div>
  <div class="flex justify-center">
    <WeatherCard />
    <WeatherCard />
    <WeatherCard />
  </div>
</template>
