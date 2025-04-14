<template>
  <select
    :id="name"
    :name="name"
    aria-label="Filter options"
    v-model="model"
    class="form-class w-100"
  >
    <option v-for="option in dropDownOptions" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps<{
  options: string[];
  name?: string;
}>();

const model = defineModel();
const dropDownOptions = computed(() => ["All", ...(props.options || [])]);
</script>
