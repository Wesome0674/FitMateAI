<script setup lang="ts">
import { useDbData } from "../stores/GetDataFromDB.ts";

const apiStore = useDbData();

apiStore.fetchData();
</script>

<template>
  <div class="mt-[84px] py-[20px]">
    <div v-if="apiStore.isLoading">Loading...</div>


    <div v-else-if="apiStore.error" class="text-red-500">{{ apiStore.error }}</div>

    <div class=" p-4" v-else>
      <ul class="space-y-4">
        <li v-for="user in apiStore.getData?.users" :key="user.id" class="p-4 bg-gray-100 rounded-lg shadow">
          <p class="font-bold">{{ user.name }}</p>
          <p>{{ user.email }}</p>
          <p>ID: {{ user.id }}</p>
        </li>
      </ul>
    </div>
  </div>


</template>
