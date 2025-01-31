<script setup lang="ts">
    import Typography from "@/stories/Typography.vue"
</script>

<template>
   <div class="w-full fixed top-0 bg-white border-b border-b-[#475569]/10 border-dashed  px-[20px] pt-[25px] pb-[15px] flex items-center justify-between">
        <div class="space-y-[12px]">
            <Typography variant="h1" >Hello Ralph Edwards</Typography>
            <Typography variant="h4" theme="tercery" >Have a nice Day !</Typography>
        </div>
        <div class="flex items-center gap-[25px]">
            <img class="p-[8px] bg-[#475569]/10  rounded-[5px]" alt="notification" src="@/assets/img/svg/notif.svg"  />
            <div class="w-[35px] aspect-square relative">
                <img class="absolute object-cover" alt="chevron" src="@/assets/img/png/pp.png"  />
            </div>
            <img alt="chevron" src="@/assets/img/svg/chevronup.svg"  />
        </div>
   </div>
</template>

<style scoped>

</style>
