<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

function logout() {
  auth.logout();
}
</script>

<template>
  <div class="min-h-screen bg-gray-100" >
    <header class="p-8">
        <nav >
          <RouterLink to="/">Todo</RouterLink>
          <a href="#" class="ml-4 text-indigo-400" @click="logout">Logout</a>
        </nav>
    </header>
    <main class="p-8">
      <RouterView />
    </main>
  </div>

</template>

