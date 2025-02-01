<script setup lang="ts">
import Typography from "@/stories/Typography.vue";

defineProps({
  id: Number,
  volume: Number,
  reps: Number,
  done: Boolean,
});

const emit = defineEmits(["update:volume", "update:reps", "update:done"]);

const updateVolume = (e: Event) => {
  const volumeInput = e.target as HTMLInputElement;
  const value = Number(volumeInput.value);
  emit("update:volume", value);
};

const updateReps = (e: Event) => {
  const repsInput = e.target as HTMLInputElement;
  const value = Number(repsInput.value);
  emit("update:reps", value);
};

const updateDone = (e: Event) => {
  const doneInput = e.target as HTMLInputElement;
  const value = doneInput.checked;
  emit("update:done", value);
};
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="space-y-[3px]">
      <Typography variant="h4">Set</Typography>
      <Typography theme="tercery" variant="h6"> {{ id }} </Typography>
    </div>
    <div class="space-y-[3px]">
      <Typography variant="h4">Volume</Typography>
      <Typography theme="tercery" variant="h6">
        <input
          @change="updateVolume"
          :value="volume?.toString()"
          class="outline-none max-w-[30px]"
          type="text"
          placeholder="0"
        />
      </Typography>
    </div>
    <div class="space-y-[3px]">
      <Typography variant="h4">Reps</Typography>
      <Typography theme="tercery" variant="h6">
        <input
          @change="updateReps"
          :value="reps?.toString()"
          class="outline-none max-w-[30px]"
          type="text"
          placeholder="0"
        />
      </Typography>
    </div>
    <div class="space-y-[3px]">
      <Typography variant="h4">Done</Typography>
      <input
        @change="updateDone"
        :checked="done"
        id="red-checkbox"
        type="checkbox"
        value=""
        class="accent-red-50 w-[17px] aspect-square bg-[#F12711]/30 border-[#F69186] border"
      />
    </div>
  </div>
</template>
