<script setup lang="ts">
    import Typography from "@/stories/Typography.vue"

</script>

<template>
    <nav class=" border-t border-t-[#E2E8F0] flex items-center justify-between p-[15px] fixed bottom-0 w-full">
        <div class="flex items-center gap-[22px] w-full ">
            <div class="flex flex-col items-center w-[55px]">
                <img alt="navIcon" src="@/assets/img/svg/dumbell.svg"  />
                <Typography color="#333" variant="p">Workout</Typography>
            </div>
            <div class="flex flex-col items-center w-[55px]">
                <img alt="navIcon" src="@/assets/img/svg/salad.svg"  />
                <Typography color="#333" variant="p">Nutrition</Typography>
            </div>
        </div>
            <img class="p-[10px] rounded-[7px] bg-[#F4F4F5] w-fit" alt="navIcon" src="@/assets/img/svg/overview.svg"  />
        <div class="flex items-center gap-[22px] w-full justify-end">
            <div class="flex flex-col items-center w-[55px]">
                <img alt="navIcon" src="@/assets/img/svg/recovery.svg"  />
                <Typography color="#333" variant="p">Recovery</Typography>
            </div>
            <div class="flex flex-col items-center w-[55px]">
                <img alt="navIcon" src="@/assets/img/svg/apple.svg"  />
                <Typography class="text-center" color="#333" variant="p">Apple</Typography>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>