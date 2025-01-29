<script setup lang="ts">
import Typography from "@/stories/Typography.vue"
import { RouterLink } from "vue-router";

</script>

<template>
    <nav class=" border-t bg-white border-t-[#E2E8F0] flex items-center justify-between p-[15px] fixed bottom-0 w-full">
        <div class="flex items-center gap-[22px] w-full ">
            <RouterLink to="/workout">
                <div class="flex flex-col items-center w-[55px]">
                    <img alt="navIcon" src="@/assets/img/svg/dumbell.svg" />
                    <Typography variant="p">Workout</Typography>
                </div>
            </RouterLink>
            <RouterLink to="nutrition">
                <div class="flex flex-col items-center w-[55px]">
                    <img alt="navIcon" src="@/assets/img/svg/salad.svg" />
                    <Typography variant="p">Nutrition</Typography>
                </div>
            </RouterLink>
        </div>
        <RouterLink to="/">
            <div class="relative w-[44px] aspect-square p-[10px] rounded-[7px] bg-[#F4F4F5]  ">
                <img class="absolute object-cover " alt="navIcon" src="@/assets/img/svg/overview.svg" />
            </div>
        </RouterLink>



        <div class="flex items-center gap-[22px] w-full justify-end">
            <RouterLink to="recovery">
                <div class="flex flex-col items-center w-[55px]">
                    <img alt="navIcon" src="@/assets/img/svg/recovery.svg" />
                    <Typography variant="p">Recovery</Typography>
                </div>
            </RouterLink>
            <RouterLink to="/applehealth">
                <div class="flex flex-col items-center w-[55px]">
                    <img alt="navIcon" src="@/assets/img/svg/apple.svg" />
                    <Typography class="text-center" variant="p">Apple Health</Typography>
                </div>
            </RouterLink>

        </div>
    </nav>
</template>

<style scoped></style>