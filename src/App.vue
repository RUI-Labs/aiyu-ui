<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useFirebaseStore } from '@/stores/firebase.js'

const firebaseStore = useFirebaseStore();

import { useSocketStore } from "@/stores/socket.js";
const socketStore = useSocketStore();
socketStore.connectSocket();
</script>

<template>
  <RouterView />  
</template>

<style scoped>

</style>
