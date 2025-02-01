<template>
  <div v-if="routine" class="pb-[100px] box space-y-[30px]">
    <div class="space-y-[20px]">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/img/svg/calendar.svg" alt="routine" />
          <Typography variant="h2">{{ routine.name }}</Typography>
        </div>
        <div class="flex items-center gap-[16px]">
          <img src="@/assets/img/svg/alarm-clock.svg" alt="routine" />
          <Button @click="" icon="../../public/log-in.svg" label="End Workout" primary size="large" />
        </div>
      </div>
      <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
      <div class="space-y-[15px]">
        <Typography theme="primary" variant="h3">Total Stats</Typography>
        <div class="flex justify-between">
          <div class="space-y-[3px]">
            <Typography variant="h4">Sets</Typography>
            <Typography theme="tercery" variant="h6">{{ setData.sets.length }}</Typography>
          </div>
          <div class="space-y-[3px]">
            <Typography variant="h4">Volume</Typography>
            <Typography theme="tercery" variant="h6">{{ calculateTotalWeight }} kg</Typography>
          </div>
          <div class="space-y-[3px]">
            <Typography variant="h4">Reps</Typography>
            <Typography theme="tercery" variant="h6">{{ calculateTotalReps }}</Typography>
          </div>
        </div>
      </div>
      <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
    </div>
    <div>
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/img/svg/biceps.svg" alt="routine" />
          <Typography variant="h2">Exercices</Typography>
        </div>
        <Button @click="" icon="../../public/pen-line.svg" label="Edit Routine" primary size="large" />
      </div>
      <div v-for="(exercice, index) in routine.exercises" :key="index" class="pt-[30px] space-y-[40px]">
        <div class="space-y-[15px] rounded-[16px] p-[12px]">
          <img class="shadow-sm rounded-md w-full aspect-video object-cover" alt="img exercise" :src="exercice.image" />
          <div class="space-y-[20px]">
            <div class="flex justify-between">
              <Typography class="capitalize max-w-[70%]" variant="h3">{{ exercice.name }}</Typography>
              <img @click="toggleDescription(exercice.id)" class="w-[22px] aspect-square" :src="getImageSrc(exercice.id)" alt="routine" />
            </div>
            <ul v-if="isDescriptionVisible(exercice.id)" class="space-y-[10px]">
              <li class="capitalize list-inside list-decimal text-[12px]" v-for="(instruction, idx) in exercice.instructions" :key="idx">
                {{ instruction }}
              </li>
            </ul>
          </div>
        </div>
        <div class="space-y-[20px]">
          <div class="space-y-[10px]">
            <div v-for="set in setData.sets" :key="set.id">
              <SetsInput @update:volume="updateVolume(set.id, $event)" @update:reps="updateReps(set.id, $event)" @update:done="updateDone(set.id, $event)" :id="set.id" :volume="set.weight" :reps="set.reps" :done="set.done" />
            </div>
            <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
          </div>
          <Button @click="addSets" icon="../../public/pen-line.svg" label="Add a set" :primary="false" class="w-full" />
          <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Typography from "@/stories/Typography.vue";
import { useDbData } from "@/stores/GetDataFromDB";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/stories/Button.vue";
import SetsInput from "@/components/SetsInput.vue";
import { useSetData } from "@/stores/Sets";
import { storeToRefs } from "pinia";

const setDataStore = useSetData();
const { state: setData, addSets } = setDataStore;
const { calculateTotalWeight, calculateTotalReps } = storeToRefs(setDataStore); 

const { fetchDBData, state } = useDbData();

const route = useRoute();
const router = useRouter();
const slugRoute = route.params.id;

const updateVolume = (id, value) => {
  const set = setData.sets.find((s) => s.id === id);
  if (set) set.weight = value;
};

const updateReps = (id, value) => {
  const set = setData.sets.find((s) => s.id === id);
  if (set) set.reps = value;
};

const updateDone = (id, value) => {
  const set = setData.sets.find((s) => s.id === id);
  if (set) set.done = value;
};

const descriptionsVisibility = ref({});
const toggleDescription = (id) => {
  descriptionsVisibility.value[id] = !descriptionsVisibility.value[id];
};
const isDescriptionVisible = (id) => descriptionsVisibility.value[id] || false;

const getImageSrc = (id) => {
  return isDescriptionVisible(id)
    ? new URL("@/assets/img/svg/eye.svg", import.meta.url).href
    : new URL("@/assets/img/svg/eye-off.svg", import.meta.url).href;
};

const routine = computed(() => {
  const routineList = Array.isArray(state.data.routines) ? state.data.routines : [];
  const foundRoutine = routineList.find((routine) => routine.id === Number(slugRoute));

  if (!foundRoutine) {
    router.replace("/404");
  }

  return foundRoutine;
});

onMounted(() => {
  fetchDBData("routines");
});
</script>
