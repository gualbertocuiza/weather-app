<script lang="ts" setup>
import { computed } from 'vue'
import alertStore from '../store/alert'
const alertClass = computed(() => `alert alert-${alertStore.type}`)
</script>

<template>
  <div v-if="alertStore.show" class="toast toast-center">
    <div :class="alertClass">
      <span class="text-white">{{ alertStore.message }}</span>
    </div>
  </div>
</template>
