<template>
  <div v-if="isLoading">
    <p>Chargement...</p>
  </div>
  <div v-else-if="error">
    <p>Erreur : {{ error }}</p>
  </div>
  <div v-else>
    <h2>Liste des parties du corps :</h2>
    <ul>
      <li v-for="(bodyPart, index) in bodyParts" :key="index">
        {{ bodyPart }}
      </li>
    </ul>
  </div>
</template> 

<script setup>
import { onMounted, computed } from 'vue'
import { useApiData } from '@/stores/getApiData'

const { fetchData, isLoading, error, state } = useApiData()

onMounted(() => {
  fetchData('bodyPartList') 
})

const bodyParts = computed(() => {
  return Array.isArray(state.data) ? state.data : [] 
})


</script>
