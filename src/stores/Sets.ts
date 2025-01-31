import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSetData = defineStore('addSets', () => {

    const state = reactive({
        sets: [
            {
                id: 1,
                weight: 0,
                reps: 0,
            }
        ]
    })

    const addSets = () => {
        state.sets.push({
            id: state.sets.length + 1,
            weight: 0,
            reps: 0,
        })
    }

    const calculateTotalWeight = computed(() => {
        return state.sets.reduce((acc, set) => acc + set.weight, 0)
    });

    const calculateTotalReps = computed(() => {
        return state.sets.reduce((acc, set) => acc + set.reps, 0)
    })

    return {
      state,
      addSets,
      calculateTotalWeight,
      calculateTotalReps
    };
});
