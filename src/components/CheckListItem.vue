<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  id: number;
  title: string;
}>();

const router = useRouter();
const auth = useAuthStore();
const token = auth.token;
const checks = ref<number>(0);

async function fetchCheckAmounts(todoId: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/check/getCheckAmounts?todoId=${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    checks.value = data;
  } catch (error) {
    console.error('Failed to fetch check amounts:', error);
  }
}

async function deleteCheckItem() {
  try {
    const response = await fetch(`http://localhost:8080/api/todo/delete?checkItemId=${props.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Optionally, you can add logic here to remove the item from the UI or refresh the list
    console.log('Check item deleted successfully');
  } catch (error) {
    console.error('Failed to delete check item:', error);
  }
}

function navigateToChecklist() {
  router.push({ 
    name: 'CheckItemView', 
    params: { id: String(props.id) }, 
    query: { title: props.title } 
  });
}

onMounted(() => {
  fetchCheckAmounts(props.id);
});
</script>

<template>
  <div 
    class="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
    @dblclick="navigateToChecklist"
  >
    <span class="text-gray-800">{{ title }}</span>
    <span class="text-gray-500">{{ checks }}</span>
    <button @click.stop="deleteCheckItem" class="text-red-500 hover:text-red-600 transition-colors">
      <i class="fas fa-trash"></i>
    </button>
  </div>
</template>