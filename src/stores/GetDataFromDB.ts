import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse = {
  users: User[];
};

export const useDbData = defineStore('getDbData', () => {
  // Définir les états avec les types appropriés
  const data = ref<ApiResponse | null>(null); // L'API renvoie un objet avec une clé `users`
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // URL de l'API
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fonction pour récupérer les données
  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(BACKEND_URL);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData: ApiResponse = await response.json(); // Typage explicite
      data.value = jsonData;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  // Getters pour accéder aux données
  const getData = computed(() => data.value); // Retourne l'objet complet
  const getUsers = computed(() => data.value?.users || []); // Retourne uniquement la liste des utilisateurs
  const getLoadingStatus = computed(() => isLoading.value);
  const getError = computed(() => error.value);

  return {
    data,
    isLoading,
    error,
    fetchData,
    getData,
    getUsers,
    getLoadingStatus,
    getError,
  };
});
