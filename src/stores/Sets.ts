import { reactive } from 'vue';
import { defineStore } from 'pinia';

interface SetItem {
    id: number;
    weight: number;
    reps: number;
    done: boolean;
}

interface State {
    [exerciseId: string]: SetItem[];
}

export const useSetData = defineStore('addSets', () => {
    const state = reactive<State>({});

    const addSets = (exerciseId: string): void => {
        if (!state[exerciseId]) {
            state[exerciseId] = [];
        }
        state[exerciseId].push({
            id: state[exerciseId].length + 1,
            weight: 0,
            reps: 0,
            done: false
        });
    };

    const calculateTotalWeight = (exerciseId: string): number => {
        if (!state[exerciseId]) return 0;
        return state[exerciseId].reduce((acc, set) => acc + set.weight, 0);
    };

    const calculateTotalReps = (exerciseId: string): number => {
        if (!state[exerciseId]) return 0;
        return state[exerciseId].reduce((acc, set) => acc + set.reps, 0);
    };

    const getSets = (exerciseId: string): SetItem[] => {
        return state[exerciseId] || [];
    };

    const updateSet = (exerciseId: string, setId: number, key: keyof SetItem, value: number | boolean): void => {
        const set = state[exerciseId]?.find((s) => s.id === setId);
        if (set) set[key] = value as never; // Type assertion pour assigner la valeur correcte
    };

    return {
        state,
        addSets,
        calculateTotalWeight,
        calculateTotalReps,
        getSets,
        updateSet
    };
});
