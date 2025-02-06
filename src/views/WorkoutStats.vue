<script setup lang="ts">
import Button from '@/stories/Button.vue';
import Typography from '@/stories/Typography.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostWorkoutData } from '@/stores/SaveWorkoutInDB';


const { saveData } = usePostWorkoutData();

const saveWorkout = async () => {
    const stats = {
        rate: 95,
        sets: totalSets.value,
        volume: totalWeight.value,
        reps: totalReps.value
    };

    await saveData(stats);

}


const route = useRoute();
const router = useRouter();

const totalSets = computed(() => Number(route.query.sets) || 0);
const totalWeight = computed(() => Number(route.query.weight) || 0);
const totalReps = computed(() => Number(route.query.reps) || 0);
</script>

<template>
    <div class="pb-[100px] box space-y-[45px]">
        <div class="space-y-[15px]">
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-[8px]">
                    <img src="@/assets/img/svg/trophy.svg" alt="routine" />
                    <Typography variant="h2">Your Stats !</Typography>
                </div>
                <Button @click="saveWorkout" icon="/cloud-arrow-down.svg" label="Save Workout" primary size="large" />
            </div>
            <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
        </div>
        <div class="flex flex-col items-center w-full">
            <Typography variant="title" theme="primary">95 %</Typography>
            <Typography theme="tercery" variant="h6">Completion Rate</Typography>
        </div>
        <div class="space-y-[15px]">
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-[8px]">
                    <img src="@/assets/img/svg/hand-thumb-up.svg" alt="routine" />
                    <Typography variant="h2">All Details</Typography>
                </div>
            </div>
            <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
            <div class="w-full space-y-[20px]">
                <div class="flex items-center justify-between gap-[15px]">
                    <Typography variant="h2">Total Sets Done ({{ totalSets }})</Typography>
                    <img src="@/assets/img/svg/check-badge.svg" alt="arrow-up" />
                </div>
                <div class="flex items-center justify-between gap-[15px]">
                    <Typography variant="h2">Volume Completed ({{ totalWeight }}kg)</Typography>
                    <img src="@/assets/img/svg/check-badge.svg" alt="arrow-up" />
                </div>
                <div class="flex items-center justify-between gap-[15px]">
                    <Typography variant="h2">Total reps ({{ totalReps }})</Typography>
                    <img src="@/assets/img/svg/check-badge.svg" alt="arrow-up" />
                </div>
            </div>
        </div>
        <Button @click="router.push('/workout')" label="Return To Home" :primary="false" class="w-full" size="large" />
    </div>
</template>

<style scoped></style>