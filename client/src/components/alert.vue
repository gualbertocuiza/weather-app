<script lang="ts" setup>
import alertStore from '../store/alert'
</script>

<template>
  <div v-if="alertStore.show" class="toast toast-center">
    <div :class="alertStore.getClasses()">
      <span class="text-white">{{ alertStore.message }}</span>
    </div>
  </div>
</template>
