<template>
    <div class="w-full flex-col gap-4 min-h-screen flex items-center justify-center">
        <Typography class="text-center" theme="error" variant="h1">404 page not found</Typography>
        <Button @click="backHome" label="Return To Home" primary size="large" />
    </div>

</template>

<script lang="ts" setup>
import Typography from '@/stories/Typography.vue';
import Button from '@/stories/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const backHome = () => {
    router.push('/workout');
};


</script>