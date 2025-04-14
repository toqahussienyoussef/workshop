<template>
  <div class="no-data-section" role="status" aria-live="polite">{{ text }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: String,
});
</script>
