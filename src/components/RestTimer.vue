<template>
    <div class="fixed bg-[#0A2540] w-full z-[500] bottom-0 slideIn rounded-t-[16px] px-[30px] py-[20px]">
        <img @click="$emit('toggle')" class="absolute top-[20px] left-[20px]" src="@/assets/img/svg/x-mark.svg"
            alt="rest timer" />
        <div class="flex flex-col h-full gap-[25px]">
            <div class="flex flex-col items-center gap-[5px]">
                <div class="flex items-center gap-[10px] ">
                    <img src="@/assets/img/svg/RestTimer.svg" alt="rest timer" />
                    <Typography variant="h2" theme="badge">Rest Timer</Typography>
                </div>
                <Typography variant="h5" theme="badge" weight="light">{{ exerciceName }}</Typography>
                <div class="border border-dashed border-[#f4f4f5]/85 h-[1px] w-full "></div>
            </div>
            <div class="flex flex-col items-center gap-[25px]">
                <div class="flex gap-[25px] items-end">
                    <Typography variant="h4" weight="light" theme="badge" @click="adjustTime(-15)">-15s</Typography>
                    <Typography variant="subtitle" theme="primary">{{ formattedTime }}</Typography>
                    <Typography variant="h4" weight="light" theme="badge" @click="adjustTime(15)">+15s</Typography>
                </div>
                <Button class="w-full" @click="startTimer" icon="../../public/arrow-right.svg"
                    :label="timerRunning ? 'Stop Timer' : 'Set Timer'" :primary="false" size="large" />

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import Typography from "@/stories/Typography.vue";
import Button from "@/stories/Button.vue";

defineProps({
    exerciceName: String
});

const time = ref(30);
const timerRunning = ref(false);
let timerInterval: number = 0;

const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const adjustTime = (amount: number) => {
    if (!timerRunning.value) {
        time.value = Math.max(0, time.value + amount);
    }
};

const startTimer = () => {
    if (timerRunning.value) {
        stopTimer(); 
    } else {
        if (time.value === 0) return;

        timerRunning.value = true;
        timerInterval = setInterval(() => {
            if (time.value > 0) {
                time.value--;
            } else {
                stopTimer();
            }
        }, 1000);
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    timerRunning.value = false;
};

</script>