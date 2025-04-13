<template>
  <select name="search" v-model="model" class="form-class w-100">
    <option v-for="option in dropDownOptions" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const model = defineModel();
const dropDownOptions = computed(() => {
  return ["All", ...(props.options || [])];
});
</script>
