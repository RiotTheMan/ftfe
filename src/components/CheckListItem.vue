<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: number;
  title: string;
  checks: number;
  onUpdateTitle: (id: number, newTitle: string) => void;
}>();

const router = useRouter();
const isEditing = ref(false);
const newTitle = ref(props.title);

function navigateToDetails() {
  router.push({ name: 'CheckItem', params: { id: props.id } });
}

function handleBlur() {
  isEditing.value = false;
  if (newTitle.value !== props.title) {
    props.onUpdateTitle(props.id, newTitle.value);
  }
}
</script>

<template>
  <div @dblclick="navigateToDetails" class="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
    <span v-if="!isEditing" class="text-gray-800 cursor-pointer" @click="isEditing = true">{{ title }}</span>
    <input v-else v-model="newTitle" @blur="handleBlur" class="w-full px-2 py-1 border rounded" />
    <span class="text-gray-500">{{ checks }}</span>
  </div>
</template>