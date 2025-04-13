<!-- AccordionSection.vue -->
<template>
  <div class="accordion__section" v-if="shouldShowCategory">
    <div
      class="accordion__header"
      @click="toggleExpand"
      :class="{ accordion__active: isExpanded }"
      role="button"
      :aria-expanded="isExpanded"
      :aria-controls="`content-${category.toLowerCase().replace(/\s+/g, '-')}`"
    >
      <h2
        class="accordion__title"
        :id="`heading-${category.toLowerCase().replace(/\s+/g, '-')}`"
      >
        {{ category }}
      </h2>

      <div class="accordion__icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="{ rotate: isExpanded }"
          aria-label="Toggle category visibility"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <transition name="accordion">
      <div
        v-if="isExpanded"
        class="accordion__content cards-container"
        :id="`content-${category.toLowerCase().replace(/\s+/g, '-')}`"
        :aria-labelledby="`heading-${category
          .toLowerCase()
          .replace(/\s+/g, '-')}`"
      >
        <div
          v-for="item in categoryItems"
          :key="item.id"
          class="accordion__item card"
          :class="{ 'card--focused': isFocused }"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :tabindex="item.id"
          v-if="categoryItems"
        >
          <itemCard
            :item="item"
            @update-selection="$emit('update-selection', $event)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import itemCard from "../components/itemCard.vue";

import { PropType } from "vue";

interface MenuItem {
  id: number | string;
  title: string;
  desc: string;
  price: number;
  img: string;
  category: string;
}
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  defaultExpanded: {
    type: Boolean,
    default: false,
  },
  selectedCategory: {
    type: String,
    default: "All",
  },
  searchActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update-selection"]);
const isFocused = ref<boolean>(false);

const isExpanded = ref(props.defaultExpanded);

const categoryItems = computed(() => {
  return props.items.filter((item) => item.category === props.category);
});

const shouldShowCategory = computed(() => {
  if (props.selectedCategory === props.category) return true;

  if (props.selectedCategory === "All") return categoryItems.value.length > 0;

  return props.searchActive && categoryItems.value.length > 0;
});

watch(
  () => props.selectedCategory,
  (newCategory) => {
    isExpanded.value = newCategory === props.category || newCategory === "All";
  }
);

watch(
  [() => categoryItems.value.length, () => props.searchActive],
  ([count, isSearchActive]) => {
    if (isSearchActive && count === 0) {
      isExpanded.value = false;
    } else if (count > 0 && isSearchActive) {
      isExpanded.value = true;
    }
  },
  { immediate: true }
);

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

// Initialize the accordion state
onMounted(() => {
  if (props.defaultExpanded || props.selectedCategory === props.category) {
    isExpanded.value = true;
  }
});
</script>

<style scoped></style>
