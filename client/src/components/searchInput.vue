<script lang="ts" setup>
import { ref, watch } from 'vue'
import cities from '../data/country-by-cities.json'

const search = ref<string>('')
const results = ref<string[]>([])
const emit = defineEmits(['setCity'])

const setCity = async (city: string) => {
  search.value = city
  results.value = []
  emit('setCity', search.value)
}

watch(search, () => {
  searchCity()
})

const searchCity = () => {
  if (search.value?.length < 3) return
  results.value = []
  for (let key in cities) {
    const res = cities[key as keyof typeof cities].filter((v: any) =>
      v.match(search.value)
    )
    res.forEach((item: any) => {
      results.value.push(item + ', ' + key)
    })
  }
}
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
          <li
            v-for="res in results"
            @click="setCity(res)"
            class="cursor-pointer hover:bg-gray-400"
          >
            {{ res }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
