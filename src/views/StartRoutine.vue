<template>
  <div v-if="routine" class="pb-[100px] box space-y-[30px]">
    <div class="space-y-[20px]">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/img/svg/Calendar.svg" alt="routine" />
          <Typography variant="h2">{{ routine.name }}</Typography>
        </div>

        <Button
          @click="goToWorkoutStats"
          :icon="login"
          label="End Workout"
          primary
          size="large"
        />
      </div>
      <div
        class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"
      ></div>

      <div class="space-y-[15px]">
        <Typography theme="primary" variant="h3">Total Stats</Typography>
        <div class="flex justify-between">
          <div class="space-y-[3px]">
            <Typography variant="h4">Sets</Typography>
            <Typography theme="tercery" variant="h6">{{
              totalSets
            }}</Typography>
          </div>
          <div class="space-y-[3px]">
            <Typography variant="h4">Volume</Typography>
            <Typography theme="tercery" variant="h6"
              >{{ totalWeight }} kg</Typography
            >
          </div>
          <div class="space-y-[3px]">
            <Typography variant="h4">Reps</Typography>
            <Typography theme="tercery" variant="h6">{{
              totalReps
            }}</Typography>
          </div>
        </div>
      </div>
      <div
        class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"
      ></div>
    </div>

    <div>
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/img/svg/biceps.svg" alt="routine" />
          <Typography variant="h2">Exercises</Typography>
        </div>
      </div>

      <div
        v-for="(exercise, index) in routine.exercises"
        :key="index"
        class="pt-[30px] space-y-[40px]"
      >
        <div class="space-y-[15px] rounded-[16px] p-[12px]">
          <img
            class="shadow-sm rounded-md w-full aspect-video object-cover"
            alt="img exercise"
            :src="exercise.image"
          />
          <div class="space-y-[20px]">
            <div class="flex justify-between">
              <Typography class="capitalize max-w-[70%]" variant="h3">{{
                exercise.name
              }}</Typography>
              <img
                @click="toggleDescription(exercise.id)"
                class="w-[22px] aspect-square"
                :src="getImageSrc(exercise.id)"
                alt="routine"
              />
            </div>
            <ul v-if="isDescriptionVisible(exercise.id)" class="space-y-[10px]">
              <li
                class="capitalize list-inside list-decimal text-[12px]"
                v-for="(instruction, idx) in exercise.instructions"
                :key="idx"
              >
                {{ instruction }}
              </li>
            </ul>
          </div>
        </div>

        <div class="space-y-[20px]">
          <div class="space-y-[10px]">
            <div v-for="set in getSets(exercise.id)" :key="set.id">
              <SetsInput
                @update:volume="
                  updateVolume(String(exercise.id), set.id, $event)
                "
                @update:reps="updateReps(String(exercise.id), set.id, $event)"
                @update:done="updateDone(String(exercise.id), set.id, $event)"
                :id="set.id"
                :volume="set.weight"
                :reps="set.reps"
                :done="set.done"
              />
            </div>
            <div
              class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"
            ></div>
          </div>

          <Button
            @click="addSets(exercise.id)"
            label="Add a set"
            :primary="false"
            class="w-full"
          />
          <div
            class="w-full h-[1px] border-b border-b-[#475569]/10 border-dashed"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <RestTimer
    :exerciceName="currentExerciseName"
    @toggle="isTimerVisible = !isTimerVisible"
    v-if="isTimerVisible === true"
  />
</template>

<script lang="ts" setup>
import Typography from "@/stories/Typography.vue";
import { useRoutine } from "@/stores/GetRoutinesFromDB";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/stories/Button.vue";
import SetsInput from "@/components/SetsInput.vue";
import { useSetData } from "@/stores/Sets";
import RestTimer from "@/components/RestTimer.vue";
import login from "@/assets/img/svg/login.svg";
import penline from "@/assets/img/svg/penline.svg";

const setDataStore = useSetData();
const { addSets, getSets, calculateTotalWeight, calculateTotalReps } =
  setDataStore as any;

const { fetchDBData, state: dbState } = useRoutine();

const route = useRoute();
const router = useRouter();
const slugRoute = route.params.id;
const isTimerVisible = ref(false);

const routine = computed(() => {
  const routineList = Array.isArray(dbState.data.routines)
    ? dbState.data.routines
    : [];
  const foundRoutine = routineList.find(
    (routine) => routine.id === Number(slugRoute)
  );

  if (!foundRoutine) {
    router.replace("/404");
  }

  return foundRoutine;
});

const totalSets = computed(() => {
  if (!routine.value) return 0;
  return routine.value.exercises.reduce(
    (acc, exercise) => acc + getSets(exercise.id).length,
    0
  );
});

const currentExerciseName = ref("");

const openTimer = (exerciseName: string) => {
  currentExerciseName.value = exerciseName;
  isTimerVisible.value = true;
};

const totalWeight = computed(() => {
  if (!routine.value) return 0;
  return routine.value.exercises.reduce(
    (acc, exercise) => acc + calculateTotalWeight(exercise.id),
    0
  );
});

const totalReps = computed(() => {
  if (!routine.value) return 0;
  return routine.value.exercises.reduce(
    (acc, exercise) => acc + calculateTotalReps(exercise.id),
    0
  );
});

const goToWorkoutStats = () => {
  if (totalSets.value === 0) {
    router.push("/workout");
  } else {
    router.push({
      path: `/WorkoutStats/${slugRoute}`,
      query: {
        sets: totalSets.value,
        weight: totalWeight.value,
        reps: totalReps.value,
      },
    });
  }
};

const updateVolume = (exerciseId: string, setId: number, value: number) => {
  setDataStore.updateSet(exerciseId, setId, "weight", value);
};

const updateReps = (exerciseId: string, setId: number, value: number) => {
  setDataStore.updateSet(exerciseId, setId, "reps", value);
};

const updateDone = (exerciseId: string, setId: number, value: number) => {
  setDataStore.updateSet(exerciseId, setId, "done", value);
  if (value) {
    openTimer(
      routine.value?.exercises.find((ex) => ex.id === Number(exerciseId))
        ?.name || "Exercise"
    );
  }
};

const descriptionsVisibility = ref<Record<number, boolean>>({});
const toggleDescription = (id: number) => {
  descriptionsVisibility.value[id] = !descriptionsVisibility.value[id];
};
const isDescriptionVisible = (id: number) =>
  descriptionsVisibility.value[id] || false;

const getImageSrc = (id: number) => {
  return isDescriptionVisible(id)
    ? new URL("@/assets/img/svg/eye.svg", import.meta.url).href
    : new URL("@/assets/img/svg/eye-off.svg", import.meta.url).href;
};

onMounted(() => {
  fetchDBData("routines");
});
</script>
