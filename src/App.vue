<script setup lang="ts">
import NavBar from './components/navigation/NavBar.vue';
import TopNav from './components/navigation/TopNav.vue';
</script>

<template>
  <TopNav />
  <main>
    <RouterView />
  </main>
  <NavBar />
</template>

<style scoped></style>
