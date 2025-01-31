<template>

  <div class="pb-[100px] box  ">
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div class="space-y-[30px]" v-else>
      <div class="space-y-[10px]">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center gap-[8px]">
            <img src="@/assets/img/svg/Hand-Grip.svg" alt="routine" />
            <Typography variant="h2">Add A Routine</Typography>
          </div>
          <Button @click="saveRoutine" icon="../../public/check.svg" label="Save Routine" primary size="large" />
        </div>
        <div class="w-full gap-[8px] flex items-center py-[10px] px-[15px] border-b border-b-[#E2E8F0]">
          <input class=" w-full border-none outline-none text-[#425466]" placeholder="Enter a name"
            v-model="routineName" />
        </div>
      </div>
      <div class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"></div>
      <div class="space-y-[20px]">
        <div class="space-y-[10px]">
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-[8px]">
              <img src="@/assets/img/svg/biceps.svg" alt="routine" />
              <Typography variant="h2">Select Exercises</Typography>
            </div>
          </div>
        </div>

        <div class="w-full gap-[8px] flex items-center py-[10px] px-[15px] rounded-[8px] border border-[#E2E8F0]">
          <img src="@/assets/img/svg/search.svg" alt="search" />
          <input v-model="searchQuery" class="w-full border-none outline-none text-[#425466]"
            placeholder="Search for an exercise" />
        </div>

        <div class="grid grid-cols-2 gap-[15px]">
          <div v-for="exercice in filteredExercises" :key="exercice.id"
            class="space-y-[15px] rounded-[16px] shadow p-[12px]">
            <img class="w-full aspect-video object-cover" alt="img exercise" :src="exercice.gifUrl" />
            <Typography variant="h3">{{ exercice.name }}</Typography>

            <Button @click="addExercice(exercice)" class="w-full"
              :class="{ 'bg-green-500': isSelected(exercice), '': !isSelected(exercice) }"
              :label="isSelected(exercice) ? 'Added' : 'Add Exercise'" :primary="false" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Typography from '@/stories/Typography.vue';
import Button from '@/stories/Button.vue';
import { onMounted, computed, ref } from 'vue';
import { useApiData } from '@/stores/getApiData';
import { usePostData } from '@/stores/SaveRoutineInDB';
import { useRouter } from 'vue-router';

const router = useRouter()

const { fetchData, isLoading, state } = useApiData();
const { saveData } = usePostData();

const searchQuery = ref('');
const routineName = ref('');
const selectedExercises = ref([]);

onMounted(() => {
  fetchData('exercises');
});

const saveRoutine = async () => {
  const routine = {
    name: routineName.value,
    exercises: selectedExercises.value,
  };

  if (routineName.value.length < 1) {
    alert('Please enter a name for the routine');
    return;
  } if (routine.exercises.length < 1) {
    alert('Please select at least one exercise');
  } else {
    await saveData(routine);
    router.push('/workout');
  }
};
const addExercice = (exercice) => {
  if (!selectedExercises.value.some((e) => e.id === exercice.id)) {
    selectedExercises.value.push(exercice);
  }
};

const isSelected = (exercice) => {
  return selectedExercises.value.some((e) => e.id === exercice.id);
};

const filteredExercises = computed(() => {
  const exercisesList = Array.isArray(state.data) ? state.data : [];
  const filtered = exercisesList.filter((exercice) => {
    return exercice.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
.bg-green-500 {
  background-color: #48bb78;
}
</style>