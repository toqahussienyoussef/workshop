<template>
  <div role="region" aria-label="Menu and filtering section">
    <div class="head-with-filter">
      <h2 id="menu-heading">menu</h2>
      <div class="filter-section gap-1" aria-labelledby="menu-heading">
        <Dropdown
          :options="uniqueCategories"
          v-model="selectedCategory"
          aria-label="Filter by category"
        />
        <TextInput
          v-model="searchString"
          aria-label="Search menu items"
          placeholder="Search With Title"
        />
      </div>
    </div>

    <div
      class="accordion-container"
      role="tablist"
      aria-labelledby="menu-heading"
    >
      <div v-if="isLoading" class="loading">Loading...</div>
      <AccordionSection
        v-for="(category, index) in uniqueCategories"
        :key="category"
        :category="category"
        :items="displayedItems"
        :default-expanded="index === 0 && !isSearching"
        :selected-category="selectedCategory"
        :search-active="isSearching"
        :selections="selections"
        @update-selection="handleSelectionUpdate"
        v-if="filteredItems.length > 0"
      />
      <NoData v-else text="No Data Found" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { useToaster } from "../composables/toaster";
import Dropdown from "../components/Filters/Dropdown.vue";
import TextInput from "../components/Filters/TextInput.vue";
import AccordionSection from "../components/AccordionSection.vue";
import { useSearchFilter } from "@/composables/useSearchFilter";
import NoData from "../components/NoData.vue";

import { useHead } from "@vueuse/head";

const pageTitle = ref("Menu Page");
useHead({
  title: pageTitle.value,
  meta: [
    {
      name: "description",
      content:
        "Explore our delicious food menu with a variety of categories and search options.",
    },
  ],
});

// Handel Checked Items and The price calculation , Display toast.

interface Selection {
  itemId: number;
  selected: boolean;
  quantity: number;
  price: number;
  totalPrice: number;
}

const selections = ref<Record<number, Selection>>({});

const handleSelectionUpdate = (selection: Selection) => {
  if (selection.selected) {
    selections.value[selection.itemId] = selection;
  } else {
    delete selections.value[selection.itemId];
  }
};

const selectedItems = computed(() => {
  return Object.values(selections.value);
});

const quantities = computed(() => {
  return selectedItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const totalCartPrice = computed(() => {
  return selectedItems.value.reduce((sum, item) => sum + item.totalPrice, 0);
});

watch(
  [selectedItems, totalCartPrice, quantities],
  ([items, total, quantity]) => {
    if (items.length > 0) {
      const msg = `Selected Items: ${
        items.length
      } | Total Price: $${total.toFixed(2)} | Total Quantity : ${quantity}`;
      useToaster("info", msg);
    }
  },
  { deep: true }
);

// Get Items Data
interface MenuResponse {
  menuItems: MenuItem[];
}

interface MenuItem {
  id: number | string;
  title: string;
  desc: string;
  price: number;
  img: string;
  category: string;
}

const menuItems = ref<MenuItem[]>([]);
const error = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const uniqueCategories = ref<string[]>([]);

async function getMenuItems() {
  isLoading.value = true;
  try {
    const response = await axios.get<MenuResponse>("/data.json");
    if (!response.data) throw new Error("Failed to fetch menu data");
    menuItems.value = response.data.menuItems;
    let categories = menuItems.value.map((ele) => ele.category);
    uniqueCategories.value = Array.from(new Set(categories));
  } catch (err) {
    error.value = "Error loading menu: " + err.message;
    useToaster("error", error.value);
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

// Handle filter " Categories & Item title "

const selectedCategory = ref<string>("All");

const { searchString, filteredItems, searchTerm } = useSearchFilter(menuItems);

const isSearching = computed(() => {
  return searchTerm.value.length > 0;
});

watch(selectedCategory, () => {
  searchString.value = "";
});

// Make sure that the items shows that only has the selected category
const displayedItems = computed(() => {
  if (selectedCategory.value && selectedCategory.value !== "All") {
    return filteredItems.value.filter(
      (ele) => ele.category === selectedCategory.value
    );
  }
  return filteredItems.value;
});
onMounted(getMenuItems);
</script>
