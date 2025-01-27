<template>
  <div class="min-h-screen bg-gray-100"  >
    <main class="p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth';


const auth = useAuthStore();
const route = useRoute();


function logout() {
  auth.logout();
}
</script>