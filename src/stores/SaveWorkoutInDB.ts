import { ref, computed } from "vue";
import { defineStore } from "pinia";

type Stats = {
  rate: number;
  sets: number;
  volume: number;
  reps: number;
  feeling: string;
};

export const usePostWorkoutData = defineStore("saveWorkoutInDB", () => {
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const saveData = async (stats: Stats) => {
    const url = `${BACKEND_URL}/stats`;
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stats),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
        
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const getLoadingStatus = computed(() => isLoading.value);
  const getError = computed(() => error.value);

  return {
    isLoading,
    error,
    saveData,
    getLoadingStatus,
    getError,
  };
});
