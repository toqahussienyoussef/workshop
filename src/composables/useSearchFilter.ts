import { ref, computed, watch, type Ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

export function useSearchFilter<T extends Record<string, any>>(
  items: Ref<T[]>,
  searchProperty: keyof T = "title" as keyof T,
  debounceTime: number = 300
) {
  const searchString = ref<string>("");
  const searchTerm = ref<string>("");

  const filteredItems = computed(() => {
    if (!searchTerm.value) {
      return items.value;
    }

    return items.value.filter((item: T) => {
      const propertyValue = item[searchProperty];
      if (typeof propertyValue !== "string") {
        return false;
      }
      return propertyValue
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());
    });
  });

  const debouncedSearch = useDebounceFn((value: string) => {
    searchTerm.value = value;
  }, debounceTime);

  watch(searchString, (newValue) => {
    debouncedSearch(newValue);
  });

  return {
    searchString,
    searchTerm,
    filteredItems,
  };
}
