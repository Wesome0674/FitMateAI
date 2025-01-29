<template>
  <component :is="tag" :class="classes">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'title' | 'subtitle' | 'h1' | 'h2' | 'h3' | "h4" | "h5" | "h6" | 'p' | 'span';
  theme?: "primary" | "secondary" | "tercery" | "title-color" | "success" | "error" | "badge" | "button"
  weight?: 'light' | 'medium' | 'semibold';
  font?: 'Helvetica' | 'Inter'
}>(), {
  variant: 'h3',
  weight: 'medium',
  theme: "secondary",
  font: "Helvetica"
});

const classes = computed(() => ({
  [`typography-${props.variant}`]: true,
  [`typography-${props.weight}`]: true,
  [`typography-${props.font}`]: true,
  [`typography-${props.theme}`]: true,
}));

const tag = computed(() => {
  switch (props.variant) {
    case 'h1': return 'h1';
    case 'h2': return 'h2';
    case 'h3': return 'h3';
    case 'h4': return 'h4';
    case 'h5': return 'h5';
    case 'h6': return 'h6';
    case 'title': return 'h1'; 
    case 'subtitle': return 'h2'; 
    case 'span': return 'span';
    default: return 'p'; 
  }
});
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

.typography-primary {
  color: var(--primary-color);
}

.typography-secondary {
  color: var(--secondary-color);
}

.typography-tercery {
  color: var(--tercery-color);
}

.typography-title-color {
  color: var(--title);
}

.typography-success {
  color: var(--success);
}

.typography-error {
  color: var(--error);
}

.typography-badge {
  color: var(--badge);
}

.typography-button {
  color: var(--button);
}
</style>
