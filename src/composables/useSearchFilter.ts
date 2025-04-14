import { ref, computed, watch } from "vue";

export function useSearchFilter<T extends Record<string, any>>(
  items: any,
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
      const propertyValue = String(item[searchProperty] || "");
      return propertyValue
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());
    });
  });

  // Create debounce function

  function debounce(fn: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  const debouncedSearch = debounce((value: string) => {
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
