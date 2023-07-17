<script lang="ts" setup>
import { ref, watch } from "vue";
import cities from "../data/country-by-cities.json";
const search = ref<string>("");
const results = ref<string[]>([]);

watch(search, () => {
  searchCity();
});

const searchCity = () => {
  results.value = [];
  if (search.value?.length < 3) return;
  for (let key in cities) {
    const res = cities[key].filter((v) => v.match(search.value));
    res.forEach((item) => {
      results.value.push(item + ", " + key);
    });
  }
};
</script>

<template>
  <div class="flex justify-center">
    <div class="flex-col w-96 p-5 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Type a city here"
        class="input input-bordered input-md w-full max-w-md"
      />
      <div class="max-h-48 overflow-scroll">
        <ul
          v-if="results.length > 0"
          class="menu bg-base-200 max-w-md rounded-box"
        >
          <li v-for="res in results">{{ res }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
