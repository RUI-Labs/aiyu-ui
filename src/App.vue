<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useFirebaseStore } from '@/stores/firebase.js'

const firebaseStore = useFirebaseStore();
</script>

<template>
  <RouterView />  
</template>

<style scoped>

</style>
