<script setup lang="ts">
import Button from '@/stories/Button.vue';
</script>

<template>
    <div class="pb-[100px] box">
        <div class="space-y-[15px]">
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-[8px]">
                    <img src="@/assets/img/svg/trophy.svg" alt="routine" />
                    <Typography variant="h2">Your Stats !</Typography>
                </div>


                <Button @click="" icon="/cloud-arrow-down.svg" label="Save Workout" primary size="large" />

            </div>
            <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
        </div>

    </div>
</template>

<style scoped></style>