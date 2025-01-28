<script setup lang="ts">
import { useApiData } from '../stores/getApiData'

const apiStore = useApiData()

// Fetch data when the component is mounted
apiStore.fetchData('exercises/name/2')
</script>

<template>
  <!-- Show loading state while fetching -->
  <div v-if="apiStore.isLoading">Loading...</div>
  
  <!-- Show error message if an error occurs -->
  <div v-else-if="apiStore.error">{{ apiStore.error }}</div>
  
  <!-- Show data once fetched successfully -->
  <div class="mt-20 " v-else>
    <ul class="space-y-4">
      <li v-for="(item, index) in apiStore.getData" :key="index">
        <p>{{ item.name }}</p>
        <p>{{ item.bodyPart }}</p>
        <p>{{ item.equipment }}</p>
        
        <!-- Iterate over instructions array and display each instruction -->
        <div v-if="item.instructions && Array.isArray(item.instructions)">
          <p v-for="(instruction, i) in item.instructions" :key="i">{{ instruction }}</p>
        </div>
        
        <!-- Display image with gifUrl -->
        <img :src="item.gifUrl" alt="exercise gif" />
      </li>
    </ul>
  </div>
</template>
