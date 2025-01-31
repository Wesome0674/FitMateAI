<template>
  <div v-if="isLoading">
    <p>Chargement...</p>
  </div>
  <div v-else-if="error">
    <p>Erreur : {{ error }}</p>
  </div>
  <div v-else class="space-y-[20px]">
    <div class="space-y-[10px]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-[8px]">
          <img src="@/assets/img/svg/Hand-Grip.svg" alt="routine" />
          <Typography variant="h2">My routines ({{ filteredRoutines.length }})</Typography>
        </div>
        <RouterLink to="/addWorkout">
          <Button icon="../../public/plus.svg" label="Add Routine" primary size="large" />
        </RouterLink>
      </div>

      <div class="w-full gap-[8px] flex items-center py-[10px] px-[15px] rounded-[8px] border border-[#E2E8F0]">
        <img src="@/assets/img/svg/search.svg" alt="search" />
        <input class="w-full border-none outline-none text-[#425466]" placeholder="Search a Routine"
          v-model="searchQuery" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-[10px]">
      <div v-for="routine in filteredRoutines" :key="routine.id" class="space-y-[15px] rounded-[16px] shadow p-[12px]">
        <div class="flex items-center justify-between">
          <Typography variant="h3">{{ routine.name }}</Typography>
          <img src="@/assets/img/svg/grip.svg" alt="more" />
        </div>
        <div class="space-y-[5px]">
          <Typography v-for="exercice in routine.exercises.slice(0, 2)" :key="exercice.id" variant="h6">{{ exercice.name
            }}</Typography>
             <Typography v-if="routine.exercises.length > 2" variant="h6">...</Typography>
        </div>
        <Button @click="goToSlugPage(routine.id)" class="w-full" label="Start now" :primary="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import Typography from '@/stories/Typography.vue'
import Button from '@/stories/Button.vue'
import { useDbData } from '@/stores/GetDataFromDB'
import { RouterLink, useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const { fetchDBData, isLoading, error, state } = useDbData()

onMounted(() => {
  fetchDBData('routines')
})

const filteredRoutines = computed(() => {
  const routineList = Array.isArray(state.data.routines) ? state.data.routines : []

  const filtered = routineList.filter((routine) => {
    return routine.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })

  return filtered.sort((a, b) => a.name.localeCompare(b.name))
})

const goToSlugPage = (id) => {
  router.push(`/routine/${id}`)
}

watch(() => state.data, (newData) => {
  console.log('Données mises à jour:', newData)
}, { immediate: true })
</script>
