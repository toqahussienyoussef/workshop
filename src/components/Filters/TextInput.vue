<template>
  <input
    type="text"
    placeholder="search"
    v-model="model"
    class="form-class seach-input w-100"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  searchString: {
    type: String,
    required: true,
    default: () => "",
  },
});

const model = defineModel();
</script>

<style lang="scss"></style>
