<script setup lang="ts">
import Typography from '@/stories/Typography.vue';

</script>



<template>
    <div class="flex justify-between w-full">
        <div class="space-y-[3px]">
            <Typography variant="h4">Set</Typography>
            <Typography theme="tercery" variant="h6">
                1
            </Typography>
        </div>
        <div class="space-y-[3px]">
            <Typography variant="h4">Volume</Typography>
            <Typography theme="tercery" variant="h6">
                <input class="outline-none max-w-[30px]" type="text" placeholder="0">
            </Typography>
        </div>
        <div class="space-y-[3px]">
            <Typography variant="h4">Reps</Typography>
            <Typography theme="tercery" variant="h6">
                <input class="outline-none max-w-[30px]" type="text" placeholder="0">
            </Typography>
        </div>
        <div class="space-y-[3px]">
            <Typography variant="h4">Done</Typography>
            <input checked id="red-checkbox" type="checkbox" value=""
                class="accent-red-50 w-[17px] aspect-square bg-[#F12711]/30 border-[#F69186] border" />
        </div>
    </div>
</template>
