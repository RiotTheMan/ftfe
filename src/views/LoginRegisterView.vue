<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

const isLogin = ref(true); // Reactive state to control which form is displayed

function toggleForm() {
  isLogin.value = !isLogin.value;
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
      <img src="@/assets/logo.png" alt="Logo" class="mx-auto mb-4 w-24 h-24">

      <div class="mt-6">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </div>
      <p class="mt-4 text-center text-gray-600">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button @click="toggleForm" class="text-indigo-500 hover:underline">
          {{ isLogin ? 'Sign up' : 'Sign in' }}
        </button>
      </p>
    </div>
  </div>
</template>