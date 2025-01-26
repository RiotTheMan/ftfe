<script lang="ts" setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import logo from '@/assets/logo.png';

const user = reactive({
  username: '',
  password: '',
});

function onSubmit() {
  console.log(user);
  if (user.username != '' && user.password != '') {
    useAuthStore().login(user.username, user.password);
  }
}
</script>

<template>
  <div class="flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-900">Login</h2>
      <form class="mt-6" @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input type="text" id="username" v-model="user.username" placeholder="Enter your username"
            class="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border rounded-lg focus:ring focus:ring-indigo-300">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input type="password" id="password" v-model="user.password" placeholder="Enter your password"
            class="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border rounded-lg focus:ring focus:ring-indigo-300">
        </div>
        <button class="w-full px-4 py-2 mt-6 text-white bg-black rounded-lg hover:opacity-80" type="submit">Sign In</button>
      </form>
      <p class="mt-4 text-center text-gray-600">Don't have an account? <a href="#" class="text-indigo-500 hover:underline">Sign up</a></p>
    </div>
  </div>
</template>