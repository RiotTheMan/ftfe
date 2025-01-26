<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import ChecklistView from '@/views/ChecklistView.vue';

const auth = useAuthStore();

function logout() {
  auth.logout();
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100">
    <ChecklistView />
  </div>
</template>