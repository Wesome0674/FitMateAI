import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type Routine = {
    id: number
    name: string;
    exercises: Exercise[];
}

type Exercise = {
    id: number
    bodyPart: string;
    equipment: string
    gifUrl: string
    instructions: string[]
    secondaryMuscles: string[]
    target: string
}

export const usePostData = defineStore('saveRoutineInDB', () => {
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const saveData = async (routine: Routine) => {
        const url = `${BACKEND_URL}/routines`;
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routine)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
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
