<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
      <img class="button-icon" v-if="icon" :src="icon" alt="icon" />
  </button>
</template>

<script lang="ts" setup>
import './button.css';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  label: string,
  primary?: boolean,
  size?: 'small' | 'medium' | 'large',
  backgroundColor?: string,
  icon?: string, 
}>(), { primary: false });

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  'storybook-button': true,
  'storybook-button--primary': props.primary,
  'storybook-button--secondary': !props.primary,
  [`storybook-button--${props.size || 'medium'}`]: true,
}));

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const onClick = () => {
  emit("click", 1);
};
</script>