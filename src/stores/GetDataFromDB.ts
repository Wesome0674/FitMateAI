import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { DB_URL } from '@/config/DBurl';

export const createDbDataStore = (id: string) => {
  return defineStore(id, () => {
    const state = reactive({
      data: []
    })
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchDBData = async (urlKey: keyof typeof DB_URL) => {
      const url = `${BACKEND_URL}/${DB_URL[urlKey]}`;
      isLoading.value = true;
      error.value = null;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        state.data = await response.json();

      } catch (err: any) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    const getData = computed(() => state.data);
    const getLoadingStatus = computed(() => isLoading.value);
    const getError = computed(() => error.value);

    return {
      state,
      isLoading,
      error,
      fetchDBData,
      getData,
      getLoadingStatus,
      getError,
    };
  })();
};
