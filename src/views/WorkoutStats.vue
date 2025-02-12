<script lang="ts" setup>
import Button from '@/stories/Button.vue';
import Typography from '@/stories/Typography.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostWorkoutData } from '@/stores/SaveWorkoutInDB';
import cloud from '@/assets/img/svg/cloud-arrow-down.svg';

const { saveData } = usePostWorkoutData();

const saveWorkout = async () => {
    const stats = {
        rate: Number(calculateCompletionRate(totalSets.value, totalReps.value, totalWeight.value)),
        sets: totalSets.value,
        volume: totalWeight.value,
        reps: totalReps.value,
        feeling: feeling.value 
    };
    console.log("Données envoyées :", stats)

    if (feeling.value !== "") {
        await saveData(stats);
        isSaved.value = true;
    } else {
        alert("Please select a feeling");
    }
}

const minSets = ref(12);
const minReps = ref(minSets.value * 12);
const minWeight = ref(150);

const calculateCompletionRate = (sets: number, reps: number, weight: number) => {
    const rate = ((sets * reps * weight) / (minSets.value * minReps.value * minWeight.value)) * 100;
    return rate.toFixed(2);
}

const handleSaveWorkout = () => {
    if (!isSaved.value) {
        saveWorkout();
    }
};

const route = useRoute();
const router = useRouter();

const totalSets = computed(() => Number(route.query.sets) || 0);
const totalWeight = computed(() => Number(route.query.weight) || 0);
const totalReps = computed(() => Number(route.query.reps) || 0);

const isSaved = ref(false);

const feeling = ref("");

</script>

<template>
    <div class="pb-[100px] box space-y-[45px]">
        <div class="space-y-[15px]">
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-[8px]">
                    <img src="@/assets/img/svg/trophy.svg" alt="routine" />
                    <Typography variant="h2">Your Stats !</Typography>
                </div>
                <Button :class="isSaved ? 'bg-green-500' : ''" @click="handleSaveWorkout" :icon="cloud" :label="isSaved ? 'Workout Saved' : 'Save Workout'"
                    primary size="large" />

            </div>
            <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
        </div>
        <div class="flex flex-col items-center w-full">
            <Typography variant="title" theme="primary">{{ calculateCompletionRate(totalSets, totalReps, totalWeight) }} %</Typography>
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
        <div class="space-y-[20px] flex flex-col items-center">
            <Typography class="text-center" variant="h2">What's Your Overall <br> Feeling ?</Typography>
            <div class="flex items-center gap-[20px]">
                <img class="opacity-50" @click="feeling = 'BAD'" :class="{ 'opacity-100': feeling === 'BAD' }"
                    src="@/assets/img/svg/face-frown.svg" alt="happy" />
                <img class="opacity-50" @click="feeling = 'AVERAGE'" :class="{ 'opacity-100': feeling === 'AVERAGE' }"
                    src="@/assets/img/svg/neutral.svg" alt="sad" />
                <img class="opacity-50" @click="feeling = 'GOOD'" :class="{ 'opacity-100': feeling === 'GOOD' }"
                    src="@/assets/img/svg/face-smile.svg" alt="neutral" />
            </div>
        </div>
        <Button @click="router.push('/workout')" label="Return To Home" :primary="false" class="w-full" size="large" />
    </div>
</template>

<style scoped>
.bg-green-500 {
  background-color: #48bb78;
}
</style>