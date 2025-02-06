<template>
    <div v-if="isLoading">
        <p>Chargement...</p>
    </div>
    <div v-else-if="error">
        <p>Erreur : {{ error }}</p>
    </div>
    <div v-else class="space-y-[20px]">
        <div class="space-y-[10px]">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-[8px]">
                    <img src="@/assets/img/svg/inbox-arrow-down.svg" alt="routine" />
                    <Typography variant="h2">Saved Workout ({{ saveWorkout.length }})</Typography>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-[10px]">
            <div v-for="workout in saveWorkout" :key="workout.id" class="space-y-[15px] rounded-[16px] shadow p-[16px]">

                <Typography class="text-center" theme="primary" variant="h3">Completed {{ workout.rate }}% </Typography>


                <div class="space-y-[5px]">
                    <Typography variant="h6">{{ workout.sets }} set(s)</Typography>
                    <Typography variant="h6">{{ workout.volume }}kg</Typography>
                    <Typography variant="h6">{{ workout.reps }} rep(s)</Typography>

                </div>
                <Typography theme="tercery" variant="h6">{{ formatDate(workout.createdAt) }}</Typography>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import Typography from '@/stories/Typography.vue'
import { createDbDataStore } from '@/stores/GetDataFromDB'

const savedWorkout = createDbDataStore('savedWorkout')
const { fetchDBData, isLoading, error, state } = savedWorkout

onMounted(() => {
    fetchDBData('stats')
})

const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(date);
};


const saveWorkout = computed(() => {
    return Array.isArray(state.data.stats) ? state.data.stats : []
})

</script>