<template>
  <p :class="classes" :style="style">
    <slot></slot>
  </p>
</template>

<script lang="ts" setup>
import { computed } from 'vue';


const props = withDefaults(defineProps<{
  variant?: 'title' | 'subtitle' | 'h1' | 'h2' | 'h3' | "h4" | "h5" | "h6" | 'p' | 'span';
  weight?: 'light' | 'medium' | 'semibold';
  font?: 'Helvetica' | 'Inter'
  color?: string;
}>(), {
  variant: 'h3',
  weight: 'medium',
  color: '#000',
  font: "Helvetica"
});

const classes = computed(() => ({
  [`typography-${props.variant}`]: true,
  [`typography-${props.weight}`]: true,
  [`typography-${props.font}`]: true
}));

const style = computed(() => ({
  color: props.color,
}));

</script>

<style scoped>
.typography-title {
  font-size: 48px;
  font-weight: normal;
}

.typography-subtitle {
  font-size: 36px;
  font-weight: normal;
}

.typography-h1 {
  font-size: 20px;
  font-weight: normal;
}

.typography-h2 {
  font-size: 18px;
  font-weight: normal;
}

.typography-h3 {
  font-size: 16px;
  font-weight: normal;
}

.typography-h4 {
  font-size: 15px;
  font-weight: normal;
}

.typography-h5 {
  font-size: 14px;
  font-weight: normal;
}

.typography-h6 {
  font-size: 13px;
  font-weight: normal;
}

.typography-p {
  font-size: 12px;
  font-weight: normal;
}

.typography-span {
  font-size: 11px;
  font-weight: normal;
}

.typography-light {
  font-weight: 300;
}

.typography-medium {
  font-weight: 500;
}

.typography-semibold {
  font-weight: 700;
}

.typography-Helvetica {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.typography-Inter {
  font-family: "Inter", serif;
}
</style>