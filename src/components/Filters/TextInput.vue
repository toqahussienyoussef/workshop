<template>
  <input
    type="text"
    placeholder="Search"
    v-model="model"
    class="form-class search-input w-100"
    aria-label="Search input"
    id="search-input"
  />
</template>

<script lang="ts" setup>
const model = defineModel();
</script>
