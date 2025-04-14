<template>
  <article class="product-card" itemscope itemtype="http://schema.org/Product">
    <div class="card__image-container">
      <input
        type="checkbox"
        v-model="checkedItem"
        :id="`${item.id}`"
        :name="`${item.title}`"
        class="card__checkbox"
        :aria-label="`Select ${item.title}`"
      />
      <img
        :src="`${item.img}`"
        :alt="`${item.title}`"
        class="card__image"
        itemprop="image"
        loading="lazy"
      />
    </div>
    <div class="card__details">
      <div>
        <h3 class="card__title" itemprop="name">{{ item.title }}</h3>
        <p class="card__description" itemprop="description">
          {{
            item.desc.length > 120 && !expanded
              ? item.desc.substring(0, 120) + "..."
              : item.desc
          }}
          <a
            v-if="item.desc.length > 60"
            href="#"
            @click.prevent="expanded = !expanded"
            class="read-more-link"
            :aria-expanded="expanded ? 'true' : 'false'"
          >
            {{ expanded ? "Read Less" : "Read More" }}
          </a>
        </p>
        <span
          class="card__price"
          itemprop="offers"
          itemscope
          itemtype="http://schema.org/Offer"
        >
          <meta itemprop="priceCurrency" content="USD" />
          <span itemprop="price">{{ item.price }}</span> $
        </span>
      </div>

      <div class="card__quantity">
        <label :for="`quantity${item.id}`" class="card__quantity-label sr-only"
          >Quantity</label
        >
        <select
          name="quantity"
          :id="`quantity${item.id}`"
          v-model="quantity"
          class="form-class w-25"
          aria-label="Select product quantity"
        >
          <option v-for="count in 100" :key="count" :value="count">
            {{ count }}
          </option>
        </select>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  selections: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update-selection"]);

// Initialize checkedItem and quantity based on selections

const checkedItem = ref<boolean>(
  !!props.selections[props.item.id]?.selected || false
);
const quantity = ref<number>(props.selections[props.item.id]?.quantity || 1);

const updateSelection = () => {
  emit("update-selection", {
    itemId: props.item.id,
    selected: checkedItem.value,
    quantity: quantity.value,
    price: props.item.price,
    totalPrice: checkedItem.value ? props.item.price * quantity.value : 0,
  });
};
watch(
  () => props.selections[props.item.id],
  (newSelection) => {
    checkedItem.value = newSelection?.selected || false;
    quantity.value = newSelection?.quantity || 1;
  },
  { deep: true }
);

watch(
  [checkedItem, quantity],
  () => {
    updateSelection();
  },
  { immediate: false }
);
// Handle read more toggle

const expanded = ref<boolean>(false);
</script>

<style scoped></style>
